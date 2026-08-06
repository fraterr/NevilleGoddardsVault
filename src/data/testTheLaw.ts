// Test the Law: a graduated series of low-stakes, verifiable experiments that
// build first-hand confidence in the practice before it is applied to
// anything that matters. Quotes are verbatim from the vault; hrefs are
// validated by scripts/validate-links.mjs.

export interface ExperimentQuote {
  text: string;
  source: string;
  href: string;
}

export interface Experiment {
  id: string;
  number: number;
  title: string;
  timing: string;
  trains: string;
  claim: string;
  protocol: string[];
  counts: string;
  quote: ExperimentQuote;
  note?: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'ladder',
    number: 1,
    title: 'The Ladder',
    timing: 'Nights 1–3',
    trains: 'First-person imagining — and the proof that imagination overrules will',
    claim:
      'An imaginal act, repeated in a drowsy state, will externalize as your own behavior — even against your stated intention.',
    protocol: [
      'Tonight in bed, relax fully and bring yourself to the edge of sleep. With eyes closed, put a ladder in front of you and CLIMB it — first person, not watching yourself. Feel the rungs in your hands, the push in your legs, the height. Loop the climb until it feels real, and fall asleep in it.',
      'Repeat for three nights. Same ladder, same climb.',
      'Meanwhile, during the days: write "I will not climb a ladder" on notes and put them where you will see them — mirror, desk, phone wallpaper. Mean it. Your conscious will is now officially against the ladder.',
      'Then drop the practice and live normally. Do not seek ladders. Watch what happens over the following days and weeks.',
    ],
    counts:
      'You find yourself on a ladder — invited, required, or somehow cornered into it — without having planned it. Log the date and the circumstances that maneuvered you there.',
    quote: {
      text: 'The difference will be appreciated if you will now visualize yourself climbing a ladder. Then with eyelids closed imagine that a ladder is right in front of you and feel you are actually climbing it.',
      source: 'Out of this World — Chapter 1',
      href: '/books/out-of-this-world/out-of-this-world-chapter-1',
    },
    note:
      'This is the famous experiment Neville assigned to his 1948 class. Its design is the point: because you consciously will AGAINST the outcome while imagining FOR it, a result cannot be dismissed as you simply making it happen. The stakes are zero; the evidence is maximal.',
  },
  {
    id: 'see-it-everywhere',
    number: 2,
    title: 'See It Everywhere',
    timing: 'Days 4–6',
    trains: 'The attention that notices the bridge of incidents',
    claim:
      'What you impress with feeling, you will encounter — and the trained eye will catch it where the untrained eye walks past.',
    protocol: [
      'Choose one specific, slightly unusual thing: a yellow butterfly, a white feather, a stranger in a red hat. Not something rare, not something everywhere — something you have not noticed lately.',
      'Tonight, imagine encountering it: the little jolt of delight, the smile, the inner "there it is!". Make the FEELING of the encounter — surprise and pleasure — the core of the scene.',
      'One night is enough if the feeling was real; repeat a second if you like.',
      'Go about your days. When it appears, mark the moment — and notice HOW it arrived.',
    ],
    counts:
      'The chosen thing shows up within the week, in any form (in the world, on a screen, in conversation). Log where and when.',
    quote: {
      text: 'All progress, all fulfillment of desire, depend upon the control and concentration of your attention.',
      source: 'The Power of Awareness — Chapter 12',
      href: '/books/the-power-of-awareness/the-power-of-awareness-chapter-12',
    },
    note:
      'Honest note: yes, this experiment also trains selective attention — and that is partly the point. Noticing the bridge of incidents IS a skill of the practice. The ladder came first precisely because it cannot be explained this way.',
  },
  {
    id: 'small-kindness',
    number: 3,
    title: 'The Small Kindness',
    timing: 'Week 2',
    trains: 'Receiving through other people without steering the channel',
    claim:
      'A felt state of being treated kindly externalizes as actual kindness — through channels you did not arrange.',
    protocol: [
      'Define the feeling, not the giver: someone does something small and warm for you — buys your coffee, gives you a genuine compliment, lets you in with a smile. No specific person, no specific place.',
      'In tonight\'s drowsy state, live one such moment: hear the words, feel the little warmth of being met kindly, and let "people are good to me" settle as a fact.',
      'Repeat for two or three nights.',
      'During the days, keep the state: move through the world as someone people are naturally kind to — and refuse the old inner commentary when service is slow or strangers are gruff.',
    ],
    counts:
      'An unprompted small kindness from someone who had no reason to — within the week. Log who, what, and how it felt to receive it.',
    quote: {
      text: 'To assume the feeling of satisfaction is to call conditions into being which will mirror satisfaction.',
      source: 'Feeling is the Secret — Chapter 2',
      href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-2',
    },
  },
  {
    id: 'unexpected-money',
    number: 4,
    title: 'Unexpected Money',
    timing: 'Week 2',
    trains: 'The feeling of money without the pressure of need',
    claim:
      'The consciousness of "money finds me" out-pictures as money arriving through unplanned channels — small first, because small is what you can feel without flinching.',
    protocol: [
      'Keep it modest: not the rent, not the debt — just "unexpected money finds me easily". A found note, a refund, a discount, a gift, a forgotten payment returning.',
      'In the drowsy state, feel the small specific joy of it: the "oh!" of finding money in a coat pocket, the pleasant surprise of the refund email. Loop the feeling, not the sum.',
      'Two or three nights, then release it.',
      'By day, guard the money diet: catch and drop the habitual "too expensive / can\'t afford / money never..." inner sentences whenever they start.',
    ],
    counts:
      'Any unplanned money or money-equivalent within two weeks: found, refunded, gifted, discounted, returned. Log source and amount — the amount does not matter; the channel does.',
    quote: {
      text: 'It is just as easy to possess the consciousness of these qualities as it is to possess their opposites for you have not your present consciousness because of your world. On the contrary, your world is what it is because of your present consciousness.',
      source: 'At Your Command',
      href: '/books/at-your-command',
    },
  },
  {
    id: 'the-voice-returns',
    number: 5,
    title: 'The Voice Returns',
    timing: 'Week 3',
    trains: 'Touching a specific person in imagination — without attachment',
    claim:
      'A person held warmly in imagination moves toward you: choose someone you would be pleased — but not desperate — to hear from.',
    protocol: [
      'Pick a specific person you have not heard from in months: an old friend, a former colleague. NOT someone you long for — the whole point is low stakes.',
      'In the drowsy state, receive their message: see the name light up the phone, hear the "hey, I was just thinking about you", feel the easy pleasure of the reconnection.',
      'Two or three nights. Warmly, briefly, and done.',
      'Do not reach out to them during the test — that is the control condition. Let the bridge build itself.',
    ],
    counts:
      'Contact from them — or unmistakable news of them through a third party — within two to three weeks. Log the date and channel.',
    quote: {
      text: 'I bring him before my mind’s eye and I congratulate him on his good fortune... I allow him to accept my congratulations, because I do not see a man unemployed, I see him employed.',
      source: 'The Pruning Shears of Revision',
      href: '/lectures/the-pruning-shears-of-revision',
    },
  },
  {
    id: 'revision-proof',
    number: 6,
    title: 'The Revision Proof',
    timing: 'Week 3',
    trains: 'Revision with an observable outcome',
    claim:
      'A scene revised tonight changes the other person\'s behavior tomorrow — Neville\'s boldest testable claim about other people.',
    protocol: [
      'Today or this week, pick ONE mildly sour interaction with someone you will see again soon: the curt colleague, the tense exchange at home. Mild — not a feud.',
      'Tonight, revise it: replay the scene as it SHOULD have gone — warm, easy, resolved. Relive the corrected version three or four times, until it feels like the actual memory.',
      'Fall asleep on the revised version, not the original.',
      'At the next encounter, greet the person you revised — not the person you remember — and observe their behavior with clean eyes.',
    ],
    counts:
      'A noticeable shift in their tone or behavior at the next encounter, unprompted by any outer apology or explanation. Log the before and the after.',
    quote: {
      text: 'I have found from experience that these revised days, if really lived, will change my tomorrows. When I meet people tomorrow that today disappointed me, they will not tomorrow, for in me I have changed the very nature of that being.',
      source: 'The Pruning Shears of Revision',
      href: '/lectures/the-pruning-shears-of-revision',
    },
  },
  {
    id: 'mood-day',
    number: 7,
    title: 'The Mood Day',
    timing: 'Week 4',
    trains: 'A sustained state — living in the end for one full day',
    claim:
      'A mood deliberately assumed and held is a cause, not a reaction: hold one for a day and the day bends around it.',
    protocol: [
      'The night before, choose tomorrow\'s mood in one phrase: "quietly confident", "everything flows easily", "the world is friendly today". Fall asleep feeling it as already true of tomorrow.',
      'On waking, re-enter the mood BEFORE touching your phone. One minute is enough.',
      'Hold it with catch-and-return all day: at three fixed checkpoints (mid-morning, lunch, late afternoon), stop for thirty seconds and re-enter the mood — especially if events argue against it.',
      'That evening, log the day honestly: what went differently, who responded differently, and how many times you had to return.',
    ],
    counts:
      'An honest evening log showing the day\'s texture matched the assumed mood more than your average day — encounters, timing, your own responses. You are the instrument here; the log keeps you honest.',
    quote: {
      text: 'Moods are not only the result of the conditions of our life; they are also the causes of those conditions.',
      source: 'The Law and the Promise — Chapter 7',
      href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-7',
    },
  },
];

export const TEST_THE_LAW_TOTAL = EXPERIMENTS.length;
