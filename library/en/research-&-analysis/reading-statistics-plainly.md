# Reading statistics plainly

## Scope:

Applies to **reading, interpreting, and quoting statistical claims** in comms, press, and story work—without mis-stating the numbers. Not inferential statistics or study design. Pair with [`source-evaluation-and-fact-checking.md`](source-evaluation-and-fact-checking.md), [`data-visualization-basics.md`](../design/data-visualization-basics.md), [`desk-research.md`](desk-research.md).

## Excerpt

- **Every number has four parts**: **what, who, when, from where**. If you cannot name them, you cannot cite the number.
- **Percent** vs. **percentage points** is the most-made mistake in comms—learn it once.
- **Average** is a family: mean, median, mode. Ask which.
- **Base rate** changes everything—"doubled" from 1 in 100,000 is very different from "doubled" from 1 in 10.
- **Correlation ≠ causation.** Two things moving together is not one causing the other.
- Full vocabulary, traps, and phrasing below.

## Before quoting a number

Before putting a statistic in a piece, clarify **source, definition, scope, uncertainty**.

### Concrete

- **Who collected** it, with what method?
- **When** (year, period)?
- **Who is included** (population, sample)?
- **What exactly** is counted (definition of the unit)?
- **Margin of error** or confidence interval?
- **What would it look like** if the opposite were true?

### Meta

- Numbers feel objective; their framing often is not.
- If a statistic needs a dramatic verb ("skyrocket", "plunge"), the number usually cannot do the work alone—rewrite.

---

## Purpose

Use statistics to make a story **more true**, not more impressive. Get the definitions right, the comparisons clean, and the uncertainty visible.

---

## 1. Core vocabulary

- **Percent (%)**: share of a whole. "30% of households".
- **Percentage points (pp)**: difference between two percentages. "Up from 30% to 34% is +4 pp, not +4%."
- **Per capita**: per person in the population—enables fair comparison across regions.
- **Rate**: events per unit (e.g. deaths per 100,000 per year).
- **Ratio**: comparison of two quantities (e.g. 3:1).
- **Median**: middle value; half are above, half below. Robust to outliers.
- **Mean** (arithmetic average): sum divided by count. Moved by outliers.
- **Mode**: most common value. Useful for categories.

## 2. Percent vs. percentage points

- Support rising from **20%** to **30%** is:
  - **+10 percentage points** (difference in levels).
  - **+50%** (relative change: 10/20).
- Say which. "50% more supporters" means something very different from "50% of people now support".

## 3. Averages, medians, and distributions

- When someone quotes an "average", ask **which** and **what shape the distribution is**.
- **Income**, **house prices**, and **wait times** are usually better reported with the **median** (long right tail).
- **Mean** is fine for symmetric quantities (blood pressure, exam scores of similar cohorts).
- Report **range or spread** where relevant: "median wait 20 min, 90% served within 45".

## 4. Base rates and relative risk

- "Risk doubled" needs a base:
  - From **1 in 1,000,000** → **2 in 1,000,000**: small change in absolute terms.
  - From **1 in 10** → **2 in 10**: big change in absolute terms.
- Prefer **absolute** framing in comms ("2 extra cases per 10,000") alongside relative.

## 5. Correlation, causation, confounders

- **Ice cream sales and drownings correlate**—both rise with summer. Hot weather is the confounder.
- For a causal claim, at minimum you want: **temporal order, dose-response, plausible mechanism, absence of obvious confounders, replication**.
- News phrasing to watch: "linked to", "associated with", "X% more likely"—these are **correlation** words; check whether the source claims causation.

## 6. Samples, populations, and non-response

- A **sample** generalises to a **population** only with a known method and size.
- **Self-selected samples** (online polls, voluntary surveys) are rarely representative.
- **Non-response bias**: people who don't answer often differ systematically.
- Check **sample size** and **how participants were chosen** before using the number.

## 7. Margins of error and confidence

- A poll at "34%, margin of error ±3 pp" actually says somewhere between 31% and 37%, most likely.
- Two polls within each other's margin are **statistically indistinguishable**, even if one looks higher.
- **Small samples + dramatic swing + narrow margin** = probably noise.

## 8. Counts vs. rates vs. shares

- **Counts**: absolute numbers. Useful for scale, mislead when populations differ.
- **Rates**: per capita / per time. Enables fair comparison.
- **Shares**: percent of a whole. Clear when the whole is defined.
- Use the right one. "Germany has more X than Luxembourg" is meaningless without a rate.

## 9. Time series traps

- **Cherry-picked start date**: "down since 2019" might be "up since 2015".
- **Revisions**: official stats get revised; last year's story may look different now.
- **Seasonality**: compare like periods (year-over-year), not random adjacent months.
- **Axis tricks** in charts: truncated y-axis exaggerates change—see [`data-visualization-basics.md`](../design/data-visualization-basics.md).

## 10. Surveys, polls, and opinion data

- **Question wording** drives answers—read the questionnaire.
- **Order effects**: what came before a question changes answers.
- **Don't knows**: often hidden in summaries; ask what share.
- **Margin** applies to the **full sample**, not every subgroup. "Among women under 30, 45% said…" may have a much bigger margin than headline.

## 11. Writing numbers plainly

- Round where it helps ("around 1 in 4" over "24.8%")—but note rounding if it is close.
- One number at a time in a sentence; stack three and readers drop out.
- Always carry the **unit** and **denominator** ("per 100,000", "of 1,200 surveyed").
- Prefer **people**-shaped framings ("about one in five households").

## 12. Red flags

- "A recent study…" with no citation.
- A percentage with no base.
- A chart with no axis labels.
- "Up 400%" with no absolute numbers.
- A statistic used to decorate a headline, never referenced in the body.
- AI-generated citations: verify every paper, author, and year.

---

## Core idea

Numbers are **shorthand for evidence**—and they only help a piece if the shorthand matches the thing. Know what, who, when, from where; say the uncertainty out loud; and prefer the clean, boring version to the headline-friendly one.

## Further reading

- [Statistics Explained (Eurostat)](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Main_Page) — EU concepts, definitions, and methods in plain language
- [Our World in Data](https://ourworldindata.org/) — global indicators with transparent sources and caveats
- [Gapminder — common misconceptions about global development](https://www.gapminder.org/answers/) — training intuition against flashy but wrong headlines

---

German version: [`statistik-einfach-lesen.md`](../../de/recherche-&-analyse/statistik-einfach-lesen.md)
