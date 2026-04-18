# Live events and streaming

**Scope:** **Live** events and **streams**—run-of-show, redundancy, accessibility, safety. Not broadcast engineering at TV scale. Pair with [`video-production-basics.md`](video-production-basics.md), [`subtitles-and-captions.md`](subtitles-and-captions.md), and [`crisis-and-sensitive-topics.md`](../language-&-communication/crisis-and-sensitive-topics.md).

## Excerpt

- **Run-of-show** with **owners**—**timecodes** and **handoffs**.
- **Redundancy**: backup **internet**, **audio**, **slides**.
- **Moderation** plan for chat/Q&A—**safeguarding** and **spam**.
- **Accessibility**: **captions** or **live transcript** where feasible; **sign** where budget allows.
- **Recording** rights—**speakers** consent to **distribution**.

## Before going live

### Concrete

- **Rehearsal** with same **gear** as live; **latency** test.
- **Escalation** path for **tech** failure and **safeguarding**.

### Meta

- Live amplifies **mistakes**—**process** reduces panic.

---

## Purpose

Deliver **stable**, **inclusive** live experiences—**predictable** for hosts and **safe** for audiences.

---

## 1. Run-of-show with owners and timecodes

### Rule

Document **who speaks when**, **slide** advances, and **handoffs**—including **contingency** if someone drops.

### Bad

```text
“We’ll figure it out live.”
```

### Good

```text
ROS: 00:00 host intro (Alex); 00:05 slides (Sam); 05:00 Q&A (moderator); backup host: Jordan if Alex offline.
```

## 2. Redundancy: internet, audio, slides

### Rule

**Wired** uplink or bonded cellular; **parallel** audio recorder; **offline** PDF of slides in moderator hands.

### Bad

```text
One Wi‑Fi hop with no backup.
```

### Good

```text
Ethernet to router; LTE failover; backup recorder on desk; slides exported PDF + presenter local copy.
```

## 3. Rehearse with production gear

### Rule

**Full dress** rehearsal—same mics, **OBS** or encoder settings, **latency** to platform measured.

### Bad

```text
Rehearsal on laptop mic; live day different interface—feedback and levels unknown.
```

### Good

```text
Dry run Tuesday with same rack; note round-trip delay; adjust monitor mix for host.
```

## 4. Moderation: chat, Q&A, safeguarding

### Rule

**Moderator** briefed on **what to read aloud**, **spam** handling, and **escalation** for harassment or safeguarding concerns.

### Bad

```text
Host reads every chat message live—including abusive or identifying content.
```

### Good

```text
Moderator filters; only vetted questions to speaker; safeguarding lead on call for yellow/red incidents.
```

## 5. Accessibility: captions and transcript

### Rule

Enable **platform captions** or **human/ASR** live transcript where quality allows; **share** transcript after if not live.

### Bad

```text
No caption path—Deaf audiences excluded from a public webinar.
```

### Good

```text
Live captions via provider or platform; post-event VTT uploaded; recording page links transcript.
```

## 6. Recording and speaker consent

### Rule

**Speakers** sign off on **recording**, **distribution**, and **clip** use—**especially** if repurposed for fundraising.

### Bad

```text
Recording published to YouTube without speakers knowing.
```

### Good

```text
Consent: live OK; VOD 90 days; no short-form ads without re-sign—logged in run-of-show pack.
```

---

## Common Footguns

- **Stream key** leaked—rotate keys after public tests.
- **No** mute discipline—hot mics pick up private conversations.
- **Slides** 4:3 on 16:9 stream—cropped text and logos.
- **Ignoring** platform **delay**—host talks over remote guest.

---

## Core idea

Live is **logistics + empathy**—**rehearse**, **backup**, **moderate**, **caption**.

## Further reading

- [OBS Project](https://obsproject.com/) — common streaming tool docs
- [W3C — Live captions](https://www.w3.org/WAI/media/av/captions/) — accessibility context
- [Internet Society — Best practices for live streaming](https://www.internetsociety.org/) — resilience concepts; adapt to your stack

---

German version: [`live-events-und-streaming.md`](../../de/medien-&-produktion/live-events-und-streaming.md)
