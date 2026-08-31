#!/usr/bin/env python3
"""
Build one Word proofreading document per language.

The audience is a bilingual clinician, not a translator: someone who knows
process-based therapy in their own language and is being asked whether these
words are the right ones. So the document leads with the clinical vocabulary —
the EEMM categories, the strength levels, helping/not-helping — and only then
works through the rest of the interface. Those are the strings where a fluent-
sounding wrong answer does real damage, and they are a page of work rather than
a day of it, so putting them first means a reviewer who only has twenty minutes
still gives us the twenty minutes that matter most.

Landscape, because four columns of prose do not fit portrait. Tracked changes
and comments in Google Docs or Word are the intended way to reply; the fourth
column is there for anyone who would rather type in the table.

    python3 scripts/make_review_docs.py [build/review-data.json] [out_dir]
"""
import json
import sys
from pathlib import Path

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(__file__).resolve().parent.parent
DATA = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "build/review-data.json"
OUT_DIR = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "build/translation-review"

# Sections a clinician must check, in the order they should check them. Anything
# not listed keeps catalogue order afterwards.
PRIORITY = ["category", "categoryGroup", "valence", "strength", "trial", "analysis", "summary"]

# Human-readable headings. The raw key group ("toolHint", "categoryGroup") is
# the wrong thing to put in front of a clinician who has never seen the code.
TITLES = {
    "category": "Process categories (EEMM)",
    "categoryGroup": "Category group headings",
    "valence": "Whether a link is helping",
    "strength": "How strong an influence is",
    "trial": "Recording what was tried",
    "analysis": "Analysis panel",
    "summary": "Written summary of the network",
    "app": "Application name",
    "tool": "Drawing tools",
    "toolHint": "Tool hints",
    "action": "Buttons",
    "tooltip": "Tooltips",
    "privacy": "Privacy badge",
    "panel": "Side panel headings",
    "nodeEditor": "Node editor dialog",
    "edgeEditor": "Connection editor dialog",
    "guided": "Guided build",
    "snapshots": "Timepoints panel",
    "structure": "List view",
    "templates": "Template names",
    "templateNodes": "Template contents",
    "templateNote": "Template footnote",
    "exportDialog": "Export dialog",
    "share": "Share link dialog",
    "clearDialog": "Clear map dialog",
    "kernel": "Treatment kernels dialog",
    "help": "Help dialog",
    "about": "About dialog",
    "error": "Error messages",
    "toast": "Brief on-screen messages",
    "language": "Language picker",
    "a11y": "Screen-reader labels",
}

INK = RGBColor(0x1A, 0x1D, 0x21)
MUTED = RGBColor(0x5B, 0x62, 0x6D)
ACCENT = RGBColor(0x0B, 0x4A, 0x8B)
RULE = "D5DAE0"
HEAD_FILL = "EDF1F6"
PRIORITY_FILL = "FFF6E5"


def shade(cell, hex_fill):
    el = OxmlElement("w:shd")
    el.set(qn("w:val"), "clear")
    el.set(qn("w:fill"), hex_fill)
    cell._tc.get_or_add_tcPr().append(el)


def borders(table):
    tbl_pr = table._tbl.tblPr
    borders_el = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement(f"w:{edge}")
        e.set(qn("w:val"), "single")
        e.set(qn("w:sz"), "4")
        e.set(qn("w:color"), RULE)
        borders_el.append(e)
    tbl_pr.append(borders_el)


def repeat_header(row):
    tr_pr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:tblHeader")
    el.set(qn("w:val"), "true")
    tr_pr.append(el)


def run(paragraph, text, *, size=9, bold=False, italic=False, colour=INK, font=None):
    r = paragraph.add_run(text)
    r.font.size = Pt(size)
    r.bold = bold
    r.italic = italic
    r.font.color.rgb = colour
    if font:
        r.font.name = font
        # python-docx does not set the East Asian face, and without it Word
        # falls back to a default that renders CJK text in the wrong font.
        r._element.rPr.rFonts.set(qn("w:eastAsia"), font)
    return r


def cell_text(cell, text, **kw):
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(1)
    run(p, text, **kw)
    return p


def build(locale, entries, sections, out_path):
    doc = Document()

    section = doc.sections[0]
    section.orientation = WD_ORIENT.LANDSCAPE
    section.page_width, section.page_height = Cm(29.7), Cm(21.0)
    for attr in ("left_margin", "right_margin"):
        setattr(section, attr, Cm(1.6))
    section.top_margin = section.bottom_margin = Cm(1.4)

    normal = doc.styles["Normal"].font
    normal.name = "Calibri"
    normal.size = Pt(9)

    # ---- cover ----
    title = doc.add_paragraph()
    run(title, f"PBT Mapping Tool — {locale['englishName']} translation review", size=20, bold=True, colour=ACCENT)
    sub = doc.add_paragraph()
    run(sub, locale["nativeName"], size=13, colour=MUTED)

    intro = doc.add_paragraph()
    run(
        intro,
        "pbtmap.org is a free tool for mapping process-based networks — the processes that maintain "
        "psychological suffering, and the feedback loops between them. Its interface has been drafted in "
        f"{locale['englishName']} and needs a native-speaking clinician to check it before it goes live.",
        size=10,
    )

    ask = doc.add_paragraph()
    run(ask, "What we are asking you to do", size=12, bold=True, colour=ACCENT)
    for line in [
        "Read the third column against the second. Where the wording is wrong, unnatural, or simply not what "
        "a clinician in your language would say, put the better wording in the fourth column — or use tracked "
        "changes or comments, whichever you prefer.",
        "The first section is the clinical vocabulary. It matters most and it is short. If you only have "
        "twenty minutes, spend them there and ignore the rest.",
        "You do not need to review anything you are unsure about. Leaving a row blank is a perfectly good answer.",
    ]:
        p = doc.add_paragraph(style="List Bullet")
        run(p, line, size=10)

    warn = doc.add_paragraph()
    run(warn, "Three things that will break the tool if changed", size=12, bold=True, colour=ACCENT)
    for line in [
        "Text in curly braces — {count}, {label}, {source} — is replaced by a real value when the tool runs. "
        "Keep every one of them, spelled exactly as it appears. You can move them anywhere in the sentence, "
        "and often should.",
        "Text between double asterisks — **like this** — is shown in bold. Keep the asterisks; move them to "
        "whichever words carry the emphasis in your language.",
        "Single letters shown as keyboard shortcuts (S, E, A, C, D, F, O, M, G, Ctrl/Cmd+Z) are physical keys "
        "on the keyboard, not words. Leave them in Latin script.",
    ]:
        p = doc.add_paragraph(style="List Bullet")
        run(p, line, size=10)

    if locale.get("note"):
        note = doc.add_paragraph()
        run(note, "Notes from the drafter", size=12, bold=True, colour=ACCENT)
        p = doc.add_paragraph()
        run(p, locale["note"], size=10, italic=True, colour=MUTED)

    meta = doc.add_paragraph()
    run(
        meta,
        f"{locale['translated']} of {locale['total']} strings drafted · generated {DATA_STAMP} · "
        "return to xiangtks@gmail.com",
        size=8,
        colour=MUTED,
    )

    doc.add_page_break()

    # ---- one table per section, priority sections first ----
    by_group = {}
    for e in entries:
        by_group.setdefault(e["group"], []).append(e)

    ordered = [g for g in PRIORITY if g in by_group] + [g for g in by_group if g not in PRIORITY]
    # Metadata is machine-facing; a reviewer should never be asked about it.
    ordered = [g for g in ordered if g != "meta"]

    for group in ordered:
        rows = by_group[group]
        is_priority = group in PRIORITY

        head = doc.add_paragraph()
        run(head, TITLES.get(group, group), size=13, bold=True, colour=ACCENT)
        if is_priority:
            flag = doc.add_paragraph()
            run(flag, "PRIORITY — clinical terminology", size=9, bold=True, colour=RGBColor(0x8A, 0x5A, 0x00))
        desc = doc.add_paragraph()
        run(desc, sections.get(group, ""), size=9, italic=True, colour=MUTED)

        table = doc.add_table(rows=1, cols=4)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        borders(table)
        widths = [Cm(4.6), Cm(8.6), Cm(8.6), Cm(4.8)]

        headers = ["Key", "English", locale["nativeName"], "Your correction / comment"]
        for i, (cell, text) in enumerate(zip(table.rows[0].cells, headers)):
            cell_text(cell, text, size=9, bold=True)
            shade(cell, HEAD_FILL)
            cell.width = widths[i]
        repeat_header(table.rows[0])

        for e in rows:
            english = str(e["english"])
            translated = locale["strings"].get(e["key"], "")
            # An English string that is deliberately empty (the uncategorised
            # node has no printed prefix) must not read as an omission, or the
            # reviewer spends their attention on a non-problem.
            blank_by_design = english == ""
            missing = not translated and not blank_by_design

            r = table.add_row()
            cells = r.cells
            cell_text(cells[0], e["key"], size=7.5, colour=MUTED, font="Consolas")
            cell_text(
                cells[1],
                "(intentionally blank)" if blank_by_design else english,
                size=9,
                italic=blank_by_design,
                colour=MUTED if blank_by_design else INK,
            )
            cell_text(
                cells[2],
                "— not yet translated —" if missing else ("(intentionally blank)" if blank_by_design else translated),
                size=9,
                colour=RGBColor(0xB3, 0x26, 0x1E) if missing else (MUTED if blank_by_design else INK),
                italic=missing or blank_by_design,
            )
            cell_text(cells[3], "", size=9)
            for i, cell in enumerate(cells):
                cell.width = widths[i]
            if is_priority:
                shade(cells[1], PRIORITY_FILL)
                shade(cells[2], PRIORITY_FILL)

        doc.add_paragraph()

    footer = doc.add_paragraph()
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run(footer, "Thank you. Corrections to xiangtks@gmail.com", size=9, colour=MUTED)

    doc.save(out_path)


data = json.loads(DATA.read_text())
DATA_STAMP = data["generatedAt"]
OUT_DIR.mkdir(parents=True, exist_ok=True)

built = []
for code, locale in data["locales"].items():
    out = OUT_DIR / f"pbtmap-translation-review-{code}.docx"
    build(locale, data["entries"], data["sections"], out)
    built.append((code, locale["translated"], locale["total"], out))

for code, done, total, path in built:
    print(f"{code:<6} {done:>3}/{total}  {path.name}")
print(f"\n{len(built)} documents in {OUT_DIR}")
