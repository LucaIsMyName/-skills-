# Using AI for comms

## Scope:

Applies to **language models in communications work**—newsletters, donor emails, social posts, press releases, translations, internal memos. Not image generation (see [`images-and-photography.md`](../design/images-and-photography.md)), not legal/medical advice, not AI for safeguarding decisions. Pair with [`prompting-basics.md`](prompting-basics.md), [`tone-of-voice-and-brand-voice.md`](../language-&-communication/tone-of-voice-and-brand-voice.md), [`respectful-language.md`](../language-&-communication/respectful-language.md), [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md), and [`evaluating-model-output.md`](evaluating-model-output.md).

## Excerpt

- **AI drafts, humans decide**—every outward-facing sentence is a human responsibility.
- **Never** paste donor PII, safeguarding details, or unpublished quotes into uncleared tools.
- **Ground** the model in your **own** facts; do not let it invent statistics.
- **Preserve** brand voice with examples and counter-examples—not with "be creative".
- **Disclose** AI involvement per policy; do not present AI output as if a specific person wrote it.
- Full workflows, templates, and red flags below.

## Before using AI for comms

### Concrete

- Is the source material **approved** and **shareable** with the tool?
- What is the **target audience**—donors, beneficiaries, partners, press, staff?
- What is the **risk of error**—embarrassing typo vs defamatory claim?
- Who **signs off** before send?

### Meta

- AI is fastest at **shape**, slowest at **truth**. Let it structure; you verify.
- If the topic is **grief**, **safeguarding**, **illness**, or **crisis**, a draft straight from AI is almost always wrong in tone.

---

## Purpose

Use AI to move from **blank page to near-final** faster—while protecting voice, truth, dignity, and trust.

---

## 1. What AI is good for, in comms

- First drafts (emails, social posts, briefs) from structured input.
- **Variants** (3 subject lines, 2 CTAs) to compare.
- **Compression** (long memo → 5-bullet summary → social post).
- **Tone adjustment** within a pre-approved voice (warm → concise; formal → plain).
- Rough **translations** reviewed by a native speaker.
- **Outlines** for longer pieces, campaigns, or talks.
- Accessibility rewrites (long → short, jargon → plain).

## 2. What AI is _not_ good for, in comms

- Naming **people** who are not public figures.
- Writing **statistics** it cannot see in sources you provided.
- Capturing **in-community** language it wasn't shown.
- **Crisis** or **safeguarding** statements—the tone will almost always be off.
- Writing as a **named individual** (a CEO, a beneficiary)—even with their style guide, attribution is a separate act of consent.
- **Legal**, **medical**, or **financial** advice.

## 3. The comms workflow

```
brief → AI draft → human edit → fact-check → review → schedule → disclose (if required)
```

- **Brief**: who it's for, what to do, what must not be said, voice cues.
- **AI draft**: using the brief + approved facts.
- **Human edit**: voice, dignity, rhythm.
- **Fact-check**: names, numbers, dates, quotes, links.
- **Review**: second pair of eyes; legal review if relevant.
- **Schedule**: send/publish.
- **Disclose**: per policy.

## 4. A donor-email example

### Bad: a donor-email example

```text
Write a donor email about our amazing fundraising success.
```

### Good: a donor-email example

```text
Task: Draft a 120-word donor email (UK English).

Audience: Monthly givers, aged ~55+, who know the charity.

Approved facts (do not add or alter):
- Event date: 12 May 2025
- Attendance: 84
- Funds raised: £6,200
- Programme funded: three new evening youth sessions per week since Sept 2024

Voice rules:
- Warm, specific, calm.
- No superlatives ("amazing", "incredible", "unbelievable").
- No guilt or urgency tropes.
- Include a concrete "what the money did" sentence.

Do not include:
- Named individuals.
- Additional statistics.
- Emojis.

Format: subject line, 3 short paragraphs, CTA line.
```

## 5. Social posts and variants

- Ask for **3 options** with **different angles** (curiosity / benefit / stewardship).
- Constrain **length** to platform norms.
- Ban the trap words your team keeps catching ("incredible", "amazing", "urgent").

### Good: social posts and variants

```text
Task: 3 variants of a LinkedIn post about the May event.

Each variant:
- ≤ 60 words
- Different angle: {data, story, invitation}
- No hashtags beyond #<approved tag>
- Must preserve the approved facts above
```

## 6. Translations with AI

- Pair with [`respectful-language.md`](../language-&-communication/respectful-language.md) and a **native speaker review**.
- Keep a **glossary** (brand terms, policy terms, do-not-translate list).
- Ask the model to **flag** cultural issues, not silently reword.

### Good: translations with ai

```text
Translate the text below from EN to DE (formal "Sie"):
- Keep these terms in English: <glossary>
- Flag any idiom that does not translate cleanly with [IDIOM].
- Do not localise numbers or dates; keep them verbatim.
```

## 7. Press releases and statements

- High risk: wrong quote, wrong number, defamation, preemptive claims about an investigation.
- AI can **structure** a release (headline / lead / boilerplate) but the **words** must be approved by a human editor.
- Holding statements in a crisis **must** be written or approved by leadership; see [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md) for disclosure rules.

## 8. Brand voice: examples over adjectives

- "Warm" is vague; a **counter-example** is specific.
- Put a **voice block** in your system prompt: one positive example, one to avoid, 3–5 rules.

### Good (voice block)

```text
Voice rules:
- Plain language, UK English.
- Warm + specific, not performative.
- Do: "We ran three more evening sessions this term thanks to your gift."
- Don't: "Words can't describe how grateful we are for your incredible support!"
```

## 9. Disclosure and attribution

- Follow [`ai-disclosure-and-policy.md`](../ethics-&-legal/ai-disclosure-and-policy.md).
- Do not publish AI-generated text under a **specific named author** without that person's review and consent.
- Make it clear in internal docs **when** AI was used materially, so future editors know.

## 10. What not to do

- Feed unredacted **case files** or **donor lists** into uncleared tools.
- Use AI-generated **beneficiary voices** to sound authentic without consent.
- Let AI write **apologies** or **condolences** without human sign-off.
- Scale send without a **volume sanity check**—AI-drafted templates can produce thousands of emails that all quietly share the same error.

---

## Core idea

AI shortens the path from **brief to draft**. Voice, truth, and dignity still belong to you. Protect them with approved facts, voice examples, human review, and clear disclosure—and the speed is genuine gain.

## Further reading

- [BBC — Generative AI in journalism use notes](https://www.bbc.co.uk/editorialguidelines/) — useful framing for editorial caution
- [The Ethical Journalism Network — AI and ethics](https://ethicaljournalismnetwork.org/) — industry guidelines
- [ICO — AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/) — UK privacy regulator guidance
- [Plain English Campaign](https://www.plainenglish.co.uk/) — language clarity

---

German version: [`ki-in-der-kommunikation.md`](../../de/ki-&-prompting/ki-in-der-kommunikation.md)
