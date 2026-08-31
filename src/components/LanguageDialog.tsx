import { Modal } from './Modal';
import { LOCALES, strings, useStrings, type LocaleCode } from '../i18n';

interface Props {
  current: LocaleCode;
  onChoose: (code: LocaleCode) => void;
  onClose: () => void;
}

/**
 * The language picker.
 *
 * Each option is labelled in its own language first, because someone looking
 * for Japanese is looking for 日本語, not for the word "Japanese" written in an
 * interface they cannot currently read. The English name sits underneath for
 * anyone who does not read the script.
 *
 * Unreviewed languages say so. A machine-plausible translation of "Affect" or
 * "Overt behaviour" can be confidently wrong in a way that matters clinically,
 * and a clinician should know whether the vocabulary they are reading has been
 * through a native-speaking specialist or not.
 */
export function LanguageDialog({ current, onChoose, onClose }: Props) {
  const s = useStrings();

  return (
    <Modal title={s.language.title} onClose={onClose} wide>
      <p className="muted small">{s.language.note}</p>

      <ul className="lang-list">
        {LOCALES.map((l) => {
          // Show each language's own word for "draft", so the warning is
          // legible to the person it is warning.
          const own = strings(l.code);
          return (
            <li key={l.code}>
              <button
                className={`lang-item${l.code === current ? ' active' : ''}`}
                onClick={() => onChoose(l.code)}
                aria-current={l.code === current}
                lang={l.code}
                dir={l.dir}
              >
                <span className="lang-native">{l.nativeName}</span>
                <span className="muted small" lang="en" dir="ltr">
                  {l.englishName}
                </span>
                {!l.reviewed && <span className="chip warn">{own.language.draft}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="muted small">
        {s.language.contribute} <a href="mailto:xiangtks@gmail.com">xiangtks@gmail.com</a>.
      </p>
    </Modal>
  );
}
