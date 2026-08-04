// The 21-day Start Here path: a curated reading order through the vault,
// pairing each day's reading with a concrete practice.
// All hrefs are validated against the vault tree by scripts/validate-links.mjs.

export interface StartHereDay {
  day: number;
  title: string;
  reading: { title: string; href: string };
  practice: string;
}

export interface StartHereWeek {
  title: string;
  subtitle: string;
  days: StartHereDay[];
}

export const START_HERE_WEEKS: StartHereWeek[] = [
  {
    title: 'Week 1 — The Foundation',
    subtitle: 'Who is doing the creating: I AM, feeling, and the state akin to sleep.',
    days: [
      {
        day: 1,
        title: 'The foundation: I AM',
        reading: { title: 'At Your Command', href: '/books/at-your-command' },
        practice:
          'All day, catch every sentence you speak or think that begins with "I am" (or "I\'m just", "I\'ve always been"). Tonight, write down the five most frequent. No changing anything yet — just hear your current self-conception.',
      },
      {
        day: 2,
        title: 'Practicing the bare awareness',
        reading: { title: 'Guide: I AM — The Foundation', href: '/techniques/i-am' },
        practice:
          'Sit quietly for five minutes. Drop every label and silently repeat "I AM" with feeling, until you rest in just being. Then, from that stillness, feel one chosen conception: "I am at peace." Notice the difference between saying it and feeling it.',
      },
      {
        day: 3,
        title: 'Feeling is the operative power',
        reading: { title: 'Feeling is the Secret — Chapter 1', href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-1' },
        practice:
          'Today, track feeling instead of words: three times (set reminders), stop and name the feeling you are radiating. Ask: is this the feeling of my wish fulfilled, or of its absence?',
      },
      {
        day: 4,
        title: 'The doorway of sleep',
        reading: { title: 'Feeling is the Secret — Chapter 2', href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-2' },
        practice:
          'Tonight, refuse to fall asleep discouraged. Whatever the day was, drift off feeling one thing accomplished — "isn\'t it wonderful". First deliberate impression on the subconscious.',
      },
      {
        day: 5,
        title: 'Finding the borderline state',
        reading: { title: 'Out of this World — Chapter 1', href: '/books/out-of-this-world/out-of-this-world-chapter-1' },
        practice:
          'In bed, practice only the state: relax the body completely and hover on the drowsy edge without falling asleep, attention soft but awake. No scene yet — just learn to hold the borderline for a few minutes.',
      },
      {
        day: 6,
        title: 'Your first full SATS',
        reading: { title: 'Guide: SATS — The State Akin to Sleep', href: '/techniques/sats' },
        practice:
          'Choose your desire and construct one short scene that implies it fulfilled. Tonight: immobilize the body, reach drowsiness, enter the scene first person, and loop it with feeling until sleep takes you.',
      },
      {
        day: 7,
        title: 'Review and stillness',
        reading: { title: 'Radio Lecture: Meditation', href: '/lectures/radio-lectures/meditation' },
        practice:
          'Repeat last night\'s SATS. Before it, take ten minutes to journal the week: which "I am" statements changed? When was feeling easiest? What scene are you committing to for week two?',
      },
    ],
  },
  {
    title: 'Week 2 — The Law in Motion',
    subtitle: 'Assumption, thinking from the end, and the nightly disciplines.',
    days: [
      {
        day: 8,
        title: 'The Law of Assumption, stated plainly',
        reading: { title: 'Radio Lecture: The Law of Assumption', href: '/lectures/radio-lectures/the-law-of-assumption' },
        practice:
          'Formulate your assumption in one sentence, present tense, as fact ("I am..."). Today, make three small decisions the fulfilled you would make — and notice how the assumption feels when acted from.',
      },
      {
        day: 9,
        title: 'Persistence hardens assumption into fact',
        reading: { title: 'Awakened Imagination — Chapter 1', href: '/books/awakened-imagination/awakened-imagination-chapter-1' },
        practice:
          'Nightly SATS continues with the same scene — no novelty. Morning addition: before reaching for your phone, spend one minute re-entering the feeling of the wish fulfilled.',
      },
      {
        day: 10,
        title: 'Thinking from the end',
        reading: { title: 'Awakened Imagination — Chapter 2', href: '/books/awakened-imagination/awakened-imagination-chapter-2' },
        practice:
          'All day, run the sentinel question: "Is this thought from the end, or of it?" Keep a tally of catches. Every catch, return to the state — no self-scolding, just return.',
      },
      {
        day: 11,
        title: 'Living in the end, all day',
        reading: { title: 'Guide: Living in the End', href: '/techniques/living-in-the-end' },
        practice:
          'Pick three recurring moments (commute, lunch, doorway of home) as state checkpoints. At each, re-enter the end for thirty seconds. The state you return to is the state you live from.',
      },
      {
        day: 12,
        title: 'The pruning shears',
        reading: { title: 'The Pruning Shears of Revision', href: '/lectures/the-pruning-shears-of-revision' },
        practice:
          'Tonight, your first full revision: review the day without judging, rewrite two scenes as they should have been, and relive each until it feels like the memory. Then SATS as usual.',
      },
      {
        day: 13,
        title: 'Making revision a discipline',
        reading: { title: 'Guide: Revision — Rewriting Your Day', href: '/techniques/revision' },
        practice:
          'Revise tonight again — and add one old memory that still stings. Rebuild it lovingly and relive it three times. Notice tomorrow whether its charge has changed.',
      },
      {
        day: 14,
        title: 'Prayer as assumption',
        reading: { title: 'Feeling is the Secret — Chapter 4', href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-4' },
        practice:
          'End week two with thanksgiving: tonight\'s SATS closes not with wanting but with "thank you" — the feeling that it is already done. Journal: what outer reactions changed this week?',
      },
    ],
  },
  {
    title: 'Week 3 — The World as Mirror',
    subtitle: 'Inner speech, other people, and making the practice a way of life.',
    days: [
      {
        day: 15,
        title: 'Inner speech builds the world',
        reading: { title: 'Awakened Imagination — Chapter 6', href: '/books/awakened-imagination/awakened-imagination-chapter-6' },
        practice:
          'A listening day: observe your inner conversations without changing them. Note the three loops that run most — about yourself, about others, about the future.',
      },
      {
        day: 16,
        title: 'The mental diet',
        reading: { title: 'Guide: The Mental Diet', href: '/techniques/mental-diet' },
        practice:
          'Full diet day: every time an old loop starts, finish the conversation as the fulfilled you would. Guard the trigger hours — first minutes awake, transit, last minutes before sleep.',
      },
      {
        day: 17,
        title: 'Fidelity when the world lags',
        reading: { title: 'Awakened Imagination — Chapter 7', href: '/books/awakened-imagination/awakened-imagination-chapter-7' },
        practice:
          'Find one place where the world still reflects the old diet — and instead of condemning it, hold the new inner conversation in its presence. That is fidelity.',
      },
      {
        day: 18,
        title: 'Everyone is you pushed out',
        reading: { title: 'Enter The Dream', href: '/lectures/enter-the-dream' },
        practice:
          'Observation only: pick two people you\'ll meet today and, beforehand, notice exactly what you expect from them. Watch how faithfully the encounter confirms the expectation.',
      },
      {
        day: 19,
        title: 'Changing the inner other',
        reading: { title: 'Guide: Everyone Is You Pushed Out', href: '/techniques/everyone-is-you-pushed-out' },
        practice:
          'Choose one relationship. Construct a brief scene of it fulfilled — warm, resolved — and run it in tonight\'s SATS. During the day, refuse the old complaints about them.',
      },
      {
        day: 20,
        title: 'Believing is the way',
        reading: { title: 'Prayer, The Art of Believing — Chapter 1', href: '/books/prayer-the-art-of-believing/prayer-the-art-of-believing-chapter-1' },
        practice:
          'Tonight, before SATS, revise the day; after SATS, fall asleep in thanksgiving. The full evening protocol — revision, scene, gratitude — is now yours.',
      },
      {
        day: 21,
        title: 'The answer, lived now',
        reading: { title: 'Live The Answer Now', href: '/lectures/live-the-answer-now' },
        practice:
          'The complete day: morning I AM (2 min), daytime mental diet and living in the end, evening revision, nightly SATS in thanksgiving. This is not day 21 of a program — it is day 1 of the practice. Journal what has changed in three weeks, and keep going.',
      },
    ],
  },
];

export const START_HERE_TOTAL_DAYS = START_HERE_WEEKS.reduce((n, w) => n + w.days.length, 0);
