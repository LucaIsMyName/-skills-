# Print-ready files

**Scope:** **Exporting** assets for print—CMYK/PMS basics, bleed, resolution, PDF settings—at NGO scale. Not prepress career training. Pair with [`brand-toolkit-and-asset-library.md`](brand-toolkit-and-asset-library.md), [`file-naming-and-organising.md`](file-naming-and-organising.md), and [`slides-and-presentations.md`](../design/slides-and-presentations.md).

## Excerpt
- **Bleed** (often 3 mm) and **safe zone**—no critical text on the edge.
- **Resolution**: ~300 dpi at **final print size** for raster images.
- **Fonts**: **outline** or **embed** per printer spec—**license** allows print.
- **Colour**: **CMYK** or **PMS** per brief—**screen RGB** lies.
- **Proof**: **PDF/X** or printer’s profile—**one** approved package.

## Before export

### Concrete

- **Trim size** and **fold** lines; **spot** vs **process** colours.
- **Printer** spec sheet.

### Meta

- **Reprints** cost less when **masters** are clean.

---

## Purpose

Avoid **expensive** surprises—**one** correct file package to the **vendor**.

---

## 1. Bleed and safe zone

### Rule

Extend **backgrounds** past trim (often **3 mm bleed**); keep **text and logos** inside **safe** margin—no critical detail on the cut line.

### Bad: bleed and safe zone

```text
Text 1 mm from edge—blade tolerance cuts off letters.
```

### Good: bleed and safe zone

```text
3 mm bleed on background; 5 mm safe inset for type; guides checked in PDF.
```

## 2. Resolution at final size

### Rule

Raster images **~300 dpi** at **printed dimensions**—upscaling a **1080px** wide photo to **A3** poster = mush.

### Bad: resolution at final size

```text
1080px wide JPG stretched to A3 poster.
```

### Good: resolution at final size

```text
Photo resampled at 300 dpi for final crop; vector logo where possible.
```

## 3. Colour: CMYK or PMS per brief

### Rule

Design and export in **CMYK** or **spot** per **printer profile**—**RGB** on screen will **shift** on press.

### Bad: colour: cmyk or pms per brief

```text
RGB export for offset without printer agreement.
```

### Good: colour: cmyk or pms per brief

```text
FOGRA or printer ICC; spot Pantone for brand red; soft-proof before send.
```

## 4. Fonts: embed, outline, or supply

### Rule

Follow **printer spec**: **embed** subsets or **outline** type; confirm **licence** covers **outlined** delivery.

### Bad: fonts: embed, outline, or supply

```text
Missing font—printer substitutes; layout breaks.
```

### Good: fonts: embed, outline, or supply

```text
PDF with embedded fonts per spec; licence file noted in handoff email.
```

## 5. One approved PDF package

### Rule

**Single** PDF/X (e.g. **PDF/X-1a** or printer’s variant); **named** layers off unless requested; **preflight** report clean.

### Bad: one approved pdf package

```text
Native InDesign file + random links—printer charges fix-up.
```

### Good: one approved pdf package

```text
PDF/X-1a; 3 mm bleed; marks outside live area; checksum filename; proof print reviewed.
```

---

## Common Footguns

- **Rich black** built wrong—**muddy** greys or registration issues.
- **RGB** black text—**four-colour** black on small type.
- **Low-res** logos **uprezzed**—jagged on poster.
- **Last-minute** copy change in **flattened** PDF—full re-export.

---

## Core idea

Print is **physics**—**millimetres**, **dots**, **ink**—**check** the spec sheet.

## Further reading

- [Adobe — Print design basics](https://helpx.adobe.com/) — tool-specific export docs
- [Ghent PDF Workgroup](https://www.gwg.org/) — PDF standards for print
- [ISO — PDF/X](https://www.iso.org/standard/38920.html) — when your printer asks for PDF/X

---

German version: [`print-dateien.md`](../../de/medien-&-produktion/print-dateien.md)
