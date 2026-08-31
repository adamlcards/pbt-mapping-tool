#!/usr/bin/env python3
"""
Read corrections back out of a returned proofreading document.

The reviewer can reply in either of the two ways the document invites: typing
into the fourth column, or editing the third column directly with tracked
changes. Both are handled — a filled fourth column wins, and otherwise the third
column is compared against what we sent.

Output is a JSON patch and a printed summary, deliberately NOT a direct edit of
the locale file. A returned document is other people's work arriving from
outside the repo, and it should be read and applied deliberately rather than
written straight into source by a script nobody watched.

    python3 scripts/merge_review_docs.py <returned.docx> [--code xx] [--apply]

`--apply` rewrites the locale's values in place, and is only safe once you have
read the patch.
"""
import argparse
import json
import re
import sys
from pathlib import Path

from docx import Document

ROOT = Path(__file__).resolve().parent.parent
PLACEHOLDER = re.compile(r"\{(\w+)\}")


def placeholders(text):
    return sorted(PLACEHOLDER.findall(text or ""))


def read_corrections(path):
    """Pull (key, sent, current, correction) from every table in the document."""
    doc = Document(path)
    rows = []
    for table in doc.tables:
        header = [c.text.strip().lower() for c in table.rows[0].cells]
        if not header or header[0] != "key":
            continue
        for row in table.rows[1:]:
            cells = [c.text.strip() for c in row.cells]
            if len(cells) < 4 or not cells[0]:
                continue
            rows.append({"key": cells[0], "english": cells[1], "current": cells[2], "correction": cells[3]})
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("docx", type=Path)
    ap.add_argument("--code", help="Locale code. Inferred from the filename when omitted.")
    ap.add_argument("--apply", action="store_true", help="Write the accepted changes into the locale file.")
    args = ap.parse_args()

    code = args.code
    if not code:
        m = re.search(r"review-([A-Za-z-]+)\.docx$", args.docx.name)
        if not m:
            sys.exit("Could not infer the locale code from the filename. Pass --code.")
        code = m.group(1)

    data = json.loads((ROOT / "build/review-data.json").read_text())
    if code not in data["locales"]:
        sys.exit(f"Unknown locale {code!r}. Known: {', '.join(data['locales'])}")
    sent = data["locales"][code]["strings"]

    accepted, rejected, unchanged = [], [], 0
    for row in read_corrections(args.docx):
        key = row["key"]
        was = sent.get(key, "")
        # A typed fourth column is an explicit instruction; an edited third
        # column is one too, but only when it actually differs from what we sent.
        new = row["correction"] or (row["current"] if row["current"] != was else "")
        if not new or new == was:
            unchanged += 1
            continue
        want = placeholders(data_english(data, key))
        if placeholders(new) != want:
            rejected.append({"key": key, "was": was, "proposed": new, "reason": f"placeholders must be {{{'} {'.join(want)}}}" if want else "unexpected placeholder"})
            continue
        accepted.append({"key": key, "was": was, "now": new})

    out = ROOT / f"build/corrections-{code}.json"
    out.write_text(json.dumps({"locale": code, "accepted": accepted, "rejected": rejected}, ensure_ascii=False, indent=2))

    print(f"{code}: {len(accepted)} corrections, {len(rejected)} rejected, {unchanged} unchanged")
    for r in rejected:
        print(f"  REJECTED {r['key']}: {r['reason']}")
    print(f"\nPatch written to {out}")
    if accepted and not args.apply:
        print("Read it, then re-run with --apply to write the changes into the locale file.")

    if args.apply and accepted:
        apply_to_locale(code, accepted)
        print(f"Applied {len(accepted)} corrections to src/i18n/locales/{code}.ts")
        print("Now run: npm run i18n:check && npm run typecheck")


def data_english(data, key):
    for e in data["entries"]:
        if e["key"] == key:
            return str(e["english"])
    return ""


def apply_to_locale(code, accepted):
    """
    Replace values by matching the old string literal.

    Deliberately not a parser: matching the exact quoted value we know is there
    is safer than rewriting TypeScript we only half-understand, and anything
    that does not match is reported rather than guessed at.
    """
    path = ROOT / f"src/i18n/locales/{code}.ts"
    source = path.read_text()
    misses = []
    for item in accepted:
        old, new = item["was"], item["now"]
        for quote in ("'", '"'):
            literal = quote + old.replace("\\", "\\\\").replace(quote, "\\" + quote) + quote
            if literal in source:
                replacement = quote + new.replace("\\", "\\\\").replace(quote, "\\" + quote) + quote
                source = source.replace(literal, replacement, 1)
                break
        else:
            misses.append(item["key"])
    path.write_text(source)
    for key in misses:
        print(f"  could not locate in source, apply by hand: {key}")


if __name__ == "__main__":
    main()
