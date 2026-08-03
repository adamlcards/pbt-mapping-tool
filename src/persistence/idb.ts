import type { PbtNetwork, Snapshot } from '../model/types';

/**
 * Local-first storage.
 *
 * Everything lives in the browser's IndexedDB and nothing is transmitted, which
 * is what makes it defensible for a clinician to open this with a real client in
 * the room. That claim is only worth making if it is true, so there is no
 * network call anywhere in this file.
 */

const DB_NAME = 'process-map';
const DB_VERSION = 1;
const STORE_NETWORKS = 'networks';
const STORE_SNAPSHOTS = 'snapshots';
const STORE_META = 'meta';

interface StoredNetwork {
  id: string;
  title: string;
  updatedAt: string;
  network: PbtNetwork;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function open(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NETWORKS)) {
        db.createObjectStore(STORE_NETWORKS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_SNAPSHOTS)) {
        const store = db.createObjectStore(STORE_SNAPSHOTS, { keyPath: 'id' });
        store.createIndex('networkId', 'networkId', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  dbPromise.catch(() => {
    dbPromise = null;
  });
  return dbPromise;
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export type StorageStatus = 'ok' | 'unavailable' | 'unknown';

let status: StorageStatus = 'unknown';
const listeners = new Set<(s: StorageStatus) => void>();

export function storageStatus(): StorageStatus {
  return status;
}

export function onStorageStatus(fn: (s: StorageStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function setStatus(next: StorageStatus): void {
  if (status === next) return;
  status = next;
  listeners.forEach((fn) => fn(next));
}

/**
 * Actually try to use the database rather than checking whether the global
 * exists.
 *
 * `typeof indexedDB !== 'undefined'` is true in situations where opening a
 * database still fails: a page opened from a file:// URL has an opaque origin,
 * Firefox private windows reject it outright, and some managed browser profiles
 * disable it. Getting this wrong is not cosmetic. The interface promises the
 * person that closing the tab is safe, and if autosave is quietly failing that
 * promise costs them their clinical work.
 */
export async function probeStorage(): Promise<StorageStatus> {
  try {
    if (typeof indexedDB === 'undefined') {
      setStatus('unavailable');
      return status;
    }
    await tx(STORE_META, 'readwrite', (s) => s.put({ key: '__probe', value: Date.now() }));
    setStatus('ok');
  } catch {
    setStatus('unavailable');
  }
  return status;
}

export function isAvailable(): boolean {
  return status !== 'unavailable';
}

export async function saveNetwork(network: PbtNetwork): Promise<boolean> {
  if (!isAvailable()) return false;
  const record: StoredNetwork = {
    id: network.id,
    title: network.meta.title,
    updatedAt: network.meta.updatedAt,
    network,
  };
  try {
    await tx(STORE_NETWORKS, 'readwrite', (s) => s.put(record));
    await tx(STORE_META, 'readwrite', (s) => s.put({ key: 'lastOpened', value: network.id }));
    setStatus('ok');
    return true;
  } catch {
    setStatus('unavailable');
    return false;
  }
}

export async function loadNetwork(id: string): Promise<PbtNetwork | null> {
  if (!isAvailable()) return null;
  try {
    const rec = await tx<StoredNetwork | undefined>(STORE_NETWORKS, 'readonly', (s) => s.get(id));
    return rec?.network ?? null;
  } catch {
    setStatus('unavailable');
    return null;
  }
}

export async function lastOpenedId(): Promise<string | null> {
  if (!isAvailable()) return null;
  try {
    const rec = await tx<{ key: string; value: string } | undefined>(STORE_META, 'readonly', (s) =>
      s.get('lastOpened'),
    );
    return rec?.value ?? null;
  } catch {
    return null;
  }
}

export async function saveSnapshots(networkId: string, snapshots: Snapshot[]): Promise<void> {
  if (!isAvailable()) return;
  try {
  const existing = await listSnapshots(networkId);
  const keep = new Set(snapshots.map((s) => s.id));
  await Promise.all(
    existing.filter((s) => !keep.has(s.id)).map((s) => tx(STORE_SNAPSHOTS, 'readwrite', (st) => st.delete(s.id))),
  );
  await Promise.all(snapshots.map((s) => tx(STORE_SNAPSHOTS, 'readwrite', (st) => st.put(s))));
  } catch {
    setStatus('unavailable');
  }
}

export async function listSnapshots(networkId: string): Promise<Snapshot[]> {
  if (!isAvailable()) return [];
  try {
    const db = await open();
    return await new Promise<Snapshot[]>((resolve, reject) => {
      const t = db.transaction(STORE_SNAPSHOTS, 'readonly');
      const idx = t.objectStore(STORE_SNAPSHOTS).index('networkId');
      const req = idx.getAll(networkId);
      req.onsuccess = () =>
        resolve((req.result as Snapshot[]).sort((a, b) => a.takenAt.localeCompare(b.takenAt)));
      req.onerror = () => reject(req.error);
    });
  } catch {
    setStatus('unavailable');
    return [];
  }
}
