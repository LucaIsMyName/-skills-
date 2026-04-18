# GDPR basics

**Scope:** Applies to **everyday GDPR/UK-GDPR practice** for teams handling personal data—lawful bases, consent, data minimisation, rights requests, breaches, processors. Not legal advice, not full DPIA/representative/appointed-DPO territory. Pair with [`ai-training-and-scraping.md`](ai-training-and-scraping.md), [`image-and-quote-releases.md`](image-and-quote-releases.md), [`ai-disclosure-and-policy.md`](ai-disclosure-and-policy.md), and [`security-for-web-apps.md`](../coding/security-for-web-apps.md).

## Excerpt
- **GDPR applies whenever you process personal data**—identifiable people, any context.
- **Pick a lawful basis** before you collect; write it down; match it to the purpose.
- **Data minimisation**: collect the least, keep the least, delete routinely.
- **People have rights** (access, correction, deletion, portability, object, restrict)—have a path to honour them.
- **Breaches**: 72 hours to report to the regulator for serious cases.
- Practical checklist, examples, and what not to do below.

## Before collecting data

### Concrete

- **What personal data** do you need (name, email, phone, location, health, special category)?
- **Why**—stated in plain language.
- **Lawful basis**: consent, contract, legal obligation, vital interests, public task, legitimate interest.
- **Retention**: how long, and how will it be deleted?
- **Who sees it** inside and outside the org (processors, platforms, partners)?

### Meta

- GDPR is a **governance** job more than a legal one. Write policies your staff can actually follow.
- If you cannot describe why you have a piece of data, **delete it**.

---

## Purpose

Handle personal data **lawfully, minimally, and respectfully**—so people trust the organisation and regulators have nothing to ask twice.

---

## 1. What counts as personal data

Any information relating to an **identified or identifiable** living person.

- Obvious: name, email, phone, address, photo, national ID, health data, bank info.
- Less obvious: IP address, device ID, cookie ID, pseudonymous analytics, voice, behaviour, location, "User 1234" if you can re-identify them.
- **Special category** data (health, race, religion, sex life, union membership, biometric/genetic, political) requires **extra conditions** beyond a lawful basis.

## 2. Lawful bases

Pick one per purpose, in writing:

- **Consent** — freely given, specific, informed, unambiguous, revocable; ticked boxes only, no pre-ticks; kept as a record.
- **Contract** — necessary to perform a contract with the person (e.g. delivery address for an order).
- **Legal obligation** — the law requires it (e.g. tax records).
- **Vital interests** — to protect someone's life (rare, urgent).
- **Public task** — public authority functions (charities: be careful).
- **Legitimate interests** — yours or a third party's, balanced against the person's rights; needs a written assessment (LIA).

Different purposes can have different bases. Do not mix "marketing emails" under the same basis as "send my login code".

## 3. Transparency (privacy notice)

Tell people:

- **Who** you are (controller, contact, DPO if applicable).
- **What** data you collect.
- **Why** (purposes) and under **which lawful basis**.
- **How long** you keep it.
- **Who you share it with** (processors, third parties, international transfers).
- **Their rights** and how to exercise them.
- **Your complaints route** (ICO in UK, local DPA in EU).

Write it at the **audience's reading level**, not in legal jargon.

## 4. Data minimisation

- Collect the **least** data that achieves the purpose.
- Do not grab a birth date "to be safe" if you only need age bracket.
- **Anonymise** where you can (analytics, research).
- **Pseudonymise** where anonymisation is not possible (IDs instead of names).

### Bad: data minimisation

```
Sign-up form for a newsletter:
- Full name, address, phone, date of birth, gender, occupation, income bracket.
```

### Good: data minimisation

```
Sign-up form for a newsletter:
- First name (optional), email, preferred topics.
```

## 5. Retention and deletion

- Every dataset has a **retention period** tied to its purpose.
- When purpose ends, **delete** or **anonymise**.
- Automate where possible (scheduled jobs, expiring records).
- Backups include deletions—document the back-out window.

## 6. Rights requests

People can ask for:

- **Access** — copy of their data.
- **Rectification** — correction of errors.
- **Erasure / "right to be forgotten"** — delete, subject to legal retention.
- **Portability** — machine-readable export.
- **Restriction** — pause processing while disputes resolve.
- **Object** — to processing on legitimate interests or direct marketing.
- **Withdraw consent** — for any consent-based processing.

You have **one month** to respond (extendable once for complex requests). Have a runbook; train the people who open emails.

## 7. Processors and contracts

If someone else handles data on your behalf (email provider, CRM, analytics, cloud, AI vendor):

- They are a **processor**, you are the **controller**.
- Put a **data processing agreement** in place (often their DPA).
- Check: security, sub-processors, data location, deletion on termination.
- International transfers (outside UK/EU)? Use SCCs, IDTA, or an adequacy decision—not "we hope it's fine".

See [`ai-training-and-scraping.md`](ai-training-and-scraping.md) for AI-specific concerns.

## 8. Breaches

A **personal data breach** is any security incident that affects confidentiality, integrity, or availability of personal data.

- **Contain** and assess risk to individuals.
- **Notify the regulator** (ICO/DPA) within **72 hours** when there's a risk to people.
- **Notify individuals** directly when the risk is high.
- **Document** every breach, even ones you decide not to report.
- Have an **incident playbook**—who investigates, who communicates, who makes the call.

## 9. Records and DPIAs

- Keep a **Record of Processing Activities** (ROPA): what data, why, how long, who sees it.
- Run a **Data Protection Impact Assessment (DPIA)** for high-risk processing (new tech, large-scale special category data, systematic monitoring, automated decisions).
- Periodically **review**—data practices drift.

## 10. What not to do

- Use **pre-ticked consent** boxes, bundle consent into terms, or make consent a condition of unrelated services.
- **Ship** email marketing lists between charities "we thought you'd be interested".
- Treat **internal spreadsheets** of donor data as harmless.
- Keep **ex-employee access** active after they leave.
- Send personal data to **new AI vendors** without a DPA and a data review.

---

## Core idea

GDPR is not a compliance headache; it is the **governance of other people's information**. Collect less, keep it shorter, say why, honour the rights you promised, and have a plan for when things break. Everything else follows.

## Further reading

- [ICO — Guide to the UK GDPR](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-uk-general-data-protection-regulation-gdpr/) — practical UK guidance
- [European Data Protection Board — Guidelines](https://edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en) — EU-level interpretation
- [ICO — Breach reporting](https://ico.org.uk/for-organisations/report-a-breach/) — reporting portal and criteria
- [CNIL — GDPR templates](https://www.cnil.fr/en) — practical templates (French DPA, English available)

---

German version: [`dsgvo-grundlagen.md`](../../de/ethik-&-recht/dsgvo-grundlagen.md)
