// The Techniques section: practical guides where every claim is anchored to a
// passage in the vault. Quotes are verbatim from the source texts (link
// markup stripped); hrefs must point to existing vault routes — they are
// validated by scripts/validate-links.mjs at build time.

export interface TechniqueQuote {
  text: string;
  source: string;
  href: string;
}

export interface TechniqueStep {
  title: string;
  detail: string;
}

export interface TechniqueItem {
  title: string;
  detail: string;
}

export interface TechniqueFaq {
  q: string;
  a: string;
}

export interface RelatedLink {
  title: string;
  href: string;
}

export interface Technique {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  intro: string[];
  steps: TechniqueStep[];
  stepsIntro?: string;
  quotes: TechniqueQuote[];
  mistakes: TechniqueItem[];
  faq: TechniqueFaq[];
  related: RelatedLink[];
}

export const TECHNIQUES: Technique[] = [
  {
    slug: 'sats',
    title: 'SATS — The State Akin to Sleep',
    shortTitle: 'SATS',
    tagline: 'Impress your desire on the subconscious in the drowsy state between waking and sleeping.',
    description:
      "How to practice Neville Goddard's SATS technique: enter the state akin to sleep and live the end of your desire in imagination, step by step, with sources.",
    intro: [
      'SATS — the *state akin to sleep* — is the core technique of Neville Goddard\'s teaching. It is the drowsy, relaxed borderline between waking and sleeping, in which the critical resistance of the conscious mind is lowered and imagination can impress the subconscious directly.',
      'In that state you do not think *about* your desire — you construct a short scene which implies your desire is **already fulfilled**, and you live it in imagination, with feeling, until it takes on the tones of reality. Neville considered the hour before sleep the most valuable of the day for this reason.',
    ],
    stepsIntro: 'This is the procedure exactly as Neville describes it in *Out of this World* and *Feeling is the Secret*:',
    steps: [
      {
        title: 'Define the end',
        detail:
          'Decide what you want, then find a short scene that would be natural **after** the desire is fulfilled: a handshake of congratulations, a friend telling you "I\'m so happy for you", the view from your new home. One simple scene, a few seconds long, which implies the wish fulfilled.',
      },
      {
        title: 'Immobilize the body',
        detail:
          'Lie down or sit comfortably, close your eyes, and let the body become still and relaxed — ideally at night in bed, when drowsiness comes naturally. You want a body too relaxed to move and a mind still awake enough to direct attention.',
      },
      {
        title: 'Induce drowsiness — but not sleep',
        detail:
          'Let yourself drift toward sleep, then hold the borderline. Neville is precise about this: drowsiness favors "attention without effort", but if you cross into sleep you lose control of the scene. If you are too alert, count slowly or focus on breathing until the pleasant heaviness comes.',
      },
      {
        title: 'Enter the scene — do not watch it',
        detail:
          'Now feel yourself **into** the action, first person, here and now. You are not watching a movie of yourself on a screen; you are looking out of your own eyes, touching, hearing, being congratulated. If you see yourself in the scene as an observer, step into the body of the actor.',
      },
      {
        title: 'Loop it with feeling until it feels real',
        detail:
          'Repeat the short scene over and over, calmly, letting the feeling of accomplishment saturate you — relief, gratitude, naturalness. Do not strain. If you fall asleep in the scene, so much the better: Neville recommended falling asleep in the assumption of the wish fulfilled.',
      },
      {
        title: 'Drop it during the day',
        detail:
          'On waking, do not dig up the seed to check if it has sprouted. Go about your day from the quiet knowledge that it is done, and return to the scene each night until it loses the feeling of wish and takes on the feeling of fact.',
      },
    ],
    quotes: [
      {
        text: 'Immobilize the physical body and induce a state of consciousness akin to sleep; then, mentally feel yourself right into the proposed action – imagining all the while that you are actually performing the action here and now so that you experience in imagination what you would experience in the flesh were you now to realize your goal.',
        source: 'Out of this World — Chapter 2',
        href: '/books/out-of-this-world/out-of-this-world-chapter-2',
      },
      {
        text: 'Drowsiness facilitates change because it favors attention without effort, but it must not be pushed to the stage of sleep, in which we shall no longer be able to control the movements of our attention, but rather a moderate degree of drowsiness in which we are still able to direct our thoughts.',
        source: 'Out of this World — Chapter 1',
        href: '/books/out-of-this-world/out-of-this-world-chapter-1',
      },
      {
        text: 'It is in sleep and in Prayer, a state akin to sleep, that man enters the subconscious to make his impressions and receive his instructions. In these states the conscious and subconscious are creatively joined.',
        source: 'Feeling is the Secret — Chapter 2',
        href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-2',
      },
      {
        text: 'Night after night, you should assume the feeling of being, having and witnessing that which you seek to be, possess and see manifested. Never go to sleep feeling discouraged or dissatisfied. Never sleep in the consciousness of failure.',
        source: 'Feeling is the Secret — Chapter 2',
        href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-2',
      },
      {
        text: 'Desire and imagination are the enchanter’s wand of fable and they draw to themselves their own affinities. They break forth best when the mind is in a state akin to sleep.',
        source: 'Out of this World — Chapter 3',
        href: '/books/out-of-this-world/out-of-this-world-chapter-3',
      },
    ],
    mistakes: [
      {
        title: 'Watching instead of being',
        detail:
          'The most common error: seeing yourself in the scene like an actor on a screen. The scene must be experienced first person — from behind your own eyes — or the impression is of "me watching someone like me", not "me, fulfilled".',
      },
      {
        title: 'Scenes that are too long or keep changing',
        detail:
          'A five-act film cannot be looped with feeling. Choose one short scene and keep it stable night after night. Changing the scene every night is starting over every night.',
      },
      {
        title: 'Straining for vividness',
        detail:
          'The goal is feeling, not 4K imagery. Faint images with real feeling impress more than sharp images observed coldly. If you can\'t visualize well, lean on touch, sound, and the emotion of the wish fulfilled.',
      },
      {
        title: 'Checking for results every morning',
        detail:
          'Waking up and scanning the world for evidence is living in lack. The practice ends with falling asleep in the assumption; the day is for living *from* it, not auditing it.',
      },
    ],
    faq: [
      {
        q: 'When is the best time to practice SATS?',
        a: 'At night in bed, as you fall asleep — drowsiness arrives on its own and whatever state you sleep in sinks into the subconscious. An afternoon session in a deep-relaxed state works too; Neville himself often used a "controlled reverie" during the day.',
      },
      {
        q: 'What if I fall asleep during the scene?',
        a: 'That is success, not failure — provided you fall asleep *inside* the feeling of the scene rather than in stray thoughts. Neville repeatedly urged falling asleep in the assumption of the wish fulfilled.',
      },
      {
        q: 'How many nights should I repeat it?',
        a: 'Until the assumption feels natural — until thinking of your desire feels like remembering a fact rather than wanting a thing. For some desires that is one vivid session; for deep-rooted self-concepts it can take weeks of quiet repetition.',
      },
      {
        q: 'I can\'t visualize at all. Is SATS closed to me?',
        a: 'No. The operative ingredient is the *feeling of the wish fulfilled*, not the picture. Use inner conversation (hear a friend congratulating you), touch (feel the steering wheel, the ring, the diploma), or simply the emotional certainty of "it is done".',
      },
    ],
    related: [
      { title: 'Out of this World — Chapter 1', href: '/books/out-of-this-world/out-of-this-world-chapter-1' },
      { title: 'Out of this World — Chapter 2', href: '/books/out-of-this-world/out-of-this-world-chapter-2' },
      { title: 'Feeling is the Secret — Chapter 2', href: '/books/feeling-is-the-secret/feeling-is-the-secret-chapter-2' },
      { title: 'Radio Lecture: Meditation', href: '/lectures/radio-lectures/meditation' },
      { title: 'Glossary: State akin to sleep', href: '/glossary#state-akin-to-sleep-sats' },
    ],
  },
  {
    slug: 'revision',
    title: 'Revision — Rewriting Your Day',
    shortTitle: 'Revision',
    tagline: 'Each night, rewrite the day\'s events as you wish they had unfolded — and change your tomorrows.',
    description:
      "How to practice Neville Goddard's Revision technique: review your day each evening and relive it revised in imagination. Full procedure with sources.",
    intro: [
      'Revision is the technique Neville called "the pruning shears" of the garden of the mind. Each evening you review the day without judging it, take every scene that disappointed you, and **rewrite it in imagination as you wish it had happened** — then relive the revised version until it feels like the actual memory.',
      'Neville made a strong claim for it: revised days, if really lived in imagination, *change your tomorrows* — and the daily practice dissolves resentment, because you stop carrying failed scenes forward. Of all the techniques, this is the one he recommended practicing every single day.',
    ],
    stepsIntro: 'The procedure, in Neville\'s own order from *The Pruning Shears of Revision*:',
    steps: [
      {
        title: 'Review the day without judging it',
        detail:
          'At the end of the day, close your eyes and replay it: the episodes, conversations, and meetings, in order. Don\'t condemn yourself or others — you are a gardener inspecting branches, not a judge.',
      },
      {
        title: 'Select the scenes worth pruning',
        detail:
          'Pick the moments that fell short: the tense conversation, the bad news, the missed opportunity, the unkind word (yours or theirs). Small scenes count — revision is a daily discipline, not an emergency tool.',
      },
      {
        title: 'Rewrite each scene as it should have been',
        detail:
          'Reconstruct the scene the way you wish it had unfolded: the conversation is warm, the news is good, the answer is yes. Make it plausible and specific — the same room, the same people, different outcome.',
      },
      {
        title: 'Relive the revised day in imagination',
        detail:
          'Now play the corrected scenes first person, with feeling, over and over, until the revised version "begins to take on the tones of reality" — until it feels like what actually happened. This is the step that does the work; a merely intellectual rewrite changes nothing.',
      },
      {
        title: 'Fall asleep on the revised day',
        detail:
          'Ideally revision is your last mental act before sleep, so the corrected day — not the raw one — is what sinks in. It pairs naturally with SATS: revise the past first, then assume the future.',
      },
    ],
    quotes: [
      {
        text: 'At the end of my day, I review the day; I don’t judge it, I simply review it. I look over the entire day, all the episodes, all the events, all the conversations, all the meetings, and then as I see it clearly in my mind’s eye, I rewrite it. I rewrite it and make it conform to the ideal day I wish I had experienced.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
      {
        text: 'Having revised my day, then in my imagination I relive that day, the revised day, and I do it over and over in my imagination until this seeming imagined state begins to take on to me the tones of reality.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
      {
        text: 'I have found from experience that these revised days, if really lived, will change my tomorrows. When I meet people tomorrow that today disappointed me, they will not tomorrow, for in me I have changed the very nature of that being.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
      {
        text: 'You simply revise, and as you revise the day you repeal the day, for the day is not slipping into the past, it does not recede as people think, it is always advancing into the future to confront you, either pruned or in some strange weed-like state.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
      {
        text: 'It awakens in you, who use it, the spirit of Jesus, and you find yourself then not justifying but forgiving, and you will realize that freedom and forgiveness are indissolubly linked.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
    ],
    mistakes: [
      {
        title: 'Reviewing without reliving',
        detail:
          'Mentally noting "that meeting should have gone better" is analysis, not revision. The technique requires re-experiencing the corrected scene with feeling until it displaces the original.',
      },
      {
        title: 'Using revision only for disasters',
        detail:
          'Neville prescribed it daily, for ordinary days. The small unrevised frictions are exactly what accumulates into a hardened self-concept and hardened relationships.',
      },
      {
        title: 'Revising the person instead of the scene',
        detail:
          'You do not rehearse "he is wrong and finally admits it". You rebuild the scene as loving and fulfilled — congratulating the unemployed friend on his new job, hearing the doctor deliver good news. Revision is exercised *for* people, never against them.',
      },
      {
        title: 'Falling asleep on the unrevised day',
        detail:
          'Replaying the day\'s failures in bed is revision in reverse: you are impressing the subconscious with exactly what you don\'t want repeated.',
      },
    ],
    faq: [
      {
        q: 'Does revision deny what really happened?',
        a: 'You are not lying to yourself about facts; you are refusing to carry the failed version forward as your operative memory. In Neville\'s frame, the day you accept — not the day that happened — is the seed of tomorrow.',
      },
      {
        q: 'Can I revise things that happened years ago?',
        a: 'Yes. Neville revised old scenes as well as the current day. Long-held memories take more repetition to displace, but the procedure is identical: rebuild the scene as it should have been and relive it until it feels like the memory.',
      },
      {
        q: 'How long should the evening session take?',
        a: 'Ten to fifteen unhurried minutes is plenty for an ordinary day: a quick review, two or three scenes pruned, each relived a handful of times with feeling.',
      },
      {
        q: 'What if the same unpleasant situation keeps recurring?',
        a: 'That is the signal to be more faithful, not less. In Neville\'s account, recurring situations are unrevised scenes advancing into the future to confront you again — prune them nightly until they return transformed.',
      },
    ],
    related: [
      { title: 'The Pruning Shears of Revision', href: '/lectures/the-pruning-shears-of-revision' },
      { title: 'Awakened Imagination — Chapter 8', href: '/books/awakened-imagination/awakened-imagination-chapter-8' },
      { title: 'The Law and the Promise — Chapter 14', href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-14' },
      { title: 'Glossary: Revision', href: '/glossary#revision' },
    ],
  },
  {
    slug: 'living-in-the-end',
    title: 'Living in the End',
    shortTitle: 'Living in the End',
    tagline: 'Stop thinking of your desire and start thinking from its fulfillment.',
    description:
      "Neville Goddard's Living in the End explained: how to think from the wish fulfilled instead of about it, with the exact passages from Awakened Imagination.",
    intro: [
      'Living in the End is less a technique than the *state* every technique aims at. The distinction that carries all of Neville\'s teaching is a single preposition: thinking **of** the end keeps it a possibility outside you; thinking **from** the end makes it your present reality, and the outer world reorganizes itself around it.',
      'Where SATS is a nightly appointment and Revision an evening discipline, living in the end is an all-day orientation: making decisions, speaking, and reacting as the person whose desire is already fulfilled would decide, speak, and react.',
    ],
    stepsIntro: 'How to move from thinking of the end to thinking from it:',
    steps: [
      {
        title: 'Settle what the end actually is',
        detail:
          'Not the means — the end. Not "the interview goes well" but "I am doing the work I love". Neville insisted the means are not your business: the end, assumed, creates its own bridge of incidents.',
      },
      {
        title: 'Establish the state once, vividly',
        detail:
          'Use a SATS session to enter the wish fulfilled fully at least once, so you know its taste: how the fulfilled you feels, carries themselves, sees other people. This is your reference state.',
      },
      {
        title: 'Ask the sentinel question all day',
        detail:
          '"Would the fulfilled me think this thought / say this sentence / make this choice?" You will catch dozens of moments a day when you are thinking from lack. Each catch is the practice.',
      },
      {
        title: 'Return, don’t repair',
        detail:
          'When you notice you\'ve fallen out of the state — worry, envy, rehearsing failure — don\'t scold yourself and don\'t argue with the feeling. Simply return to the state, the way you return to a posture. The return, repeated, is what makes the state habitual.',
      },
      {
        title: 'Let persistence do the hardening',
        detail:
          'Neville\'s formula is explicit: an assumption, though false, if **persisted in**, will harden into fact. Persistence does not mean strain; it means the state you keep returning to is the state you end up living from — and out-picturing.',
      },
    ],
    quotes: [
      {
        text: 'We must use imagination masterfully, not as an onlooker thinking of the end, but as a partaker thinking from the end.',
        source: 'Awakened Imagination — Chapter 2',
        href: '/books/awakened-imagination/awakened-imagination-chapter-2',
      },
      {
        text: 'Every state is already there as “mere possibility” as long as you think of it, but is overpoweringly real when you think from it.',
        source: 'Awakened Imagination — Chapter 2',
        href: '/books/awakened-imagination/awakened-imagination-chapter-2',
      },
      {
        text: 'Determined imagination, thinking from the end, is the beginning of all miracles.',
        source: 'Awakened Imagination — Chapter 2',
        href: '/books/awakened-imagination/awakened-imagination-chapter-2',
      },
      {
        text: 'Experience has convinced me that an Assumption, though false, if persisted in, will harden into fact, that continuous imagination is sufficient for all things.',
        source: 'Awakened Imagination — Chapter 1',
        href: '/books/awakened-imagination/awakened-imagination-chapter-1',
      },
      {
        text: 'There is no stopping the man who can think from the end. Nothing can stop him. He creates the means and grows his way out of limitation into ever greater and greater mansions of the Lord.',
        source: 'Awakened Imagination — Chapter 2',
        href: '/books/awakened-imagination/awakened-imagination-chapter-2',
      },
    ],
    mistakes: [
      {
        title: 'Plotting the means',
        detail:
          'Working out *how* it could possibly happen is thinking of the end from lack. In Neville\'s account the fulfilled state creates means you could not have planned — your task is fidelity to the end, not logistics.',
      },
      {
        title: 'Acting it outwardly instead of inwardly',
        detail:
          'Living in the end is a state of consciousness, not a spending spree or a performance for others. The change is in your inner conversations and reactions; the outer behavior that matters follows naturally.',
      },
      {
        title: 'Treating lapses as ruin',
        detail:
          'Falling out of the state a hundred times a day is normal; the practice *is* the return. Despairing over lapses is itself thinking from the old state — just come back.',
      },
      {
        title: 'Keeping one eye on the evidence',
        detail:
          'Constantly checking whether the world has moved yet is the posture of the onlooker, not the partaker. Neville\'s test of fidelity: if you saw no change, would you still feel it done?',
      },
    ],
    faq: [
      {
        q: 'How is this different from "positive thinking"?',
        a: 'Positive thinking hopes about the future from the present state. Living in the end abandons the present state: you assume the fulfilled state as *now*, and think from it. The preposition — of vs. from — is the entire difference.',
      },
      {
        q: 'Do I have to hold the feeling every minute?',
        a: 'No one does. The state becomes habitual the way a mood or a home does: by being the place you keep returning to. Catch-and-return, many times a day, is the realistic practice.',
      },
      {
        q: 'What about taking practical action?',
        a: 'Neville never taught passivity — he taught that action flows from state. Living in the end, you still answer the phone and go to the interview; you simply do it as the person for whom the outcome is settled.',
      },
      {
        q: 'Can I live in the end for more than one desire?',
        a: 'States compound naturally if they belong to the same self-concept — the fulfilled you is one person. If two desires feel contradictory, work on the self-concept from which both would be natural.',
      },
    ],
    related: [
      { title: 'Awakened Imagination — Chapter 2', href: '/books/awakened-imagination/awakened-imagination-chapter-2' },
      { title: 'Radio Lecture: The Law of Assumption', href: '/lectures/radio-lectures/the-law-of-assumption' },
      { title: 'Live The Answer Now', href: '/lectures/live-the-answer-now' },
      { title: 'The Power of Awareness (lecture)', href: '/lectures/the-power-of-awareness' },
      { title: 'Glossary: Assumption', href: '/glossary#assumption' },
    ],
  },
  {
    slug: 'mental-diet',
    title: 'The Mental Diet',
    shortTitle: 'Mental Diet',
    tagline: 'Your world is built from your inner conversations. Curate them like your food.',
    description:
      "Neville Goddard's Mental Diet: how to observe and change your inner conversations so your inner speech matches your fulfilled desire. Steps and sources.",
    intro: [
      'You are always talking to yourself: rehearsing arguments, replaying slights, predicting outcomes. Neville taught that these **inner conversations** are not commentary on your life — they are its construction site. Just as the body is built from what you eat, your circumstances are built from the ideas you feed on all day.',
      'The Mental Diet is the discipline of noticing those conversations and rewriting them so that your inner speech *matches the speech of your wish fulfilled*. It is the daytime companion to SATS: the nightly scene sets the assumption, the mental diet keeps you from arguing against it all day.',
    ],
    stepsIntro: 'A practical mental diet, built from Awakened Imagination chapters 6–7:',
    steps: [
      {
        title: 'Spend one day just listening',
        detail:
          'Before changing anything, observe. Catch your inner voice in the shower, in traffic, before sleep. Note the recurring conversations — most people discover the same three or four loops, usually of complaint, defense, or dread.',
      },
      {
        title: 'Identify the speech of the wish fulfilled',
        detail:
          'Ask: what would my inner conversations sound like if my desire were already a fact? What would I have stopped saying? Write down two or three sentences the fulfilled you would naturally say inwardly — these are your new staple foods.',
      },
      {
        title: 'Catch and replace, without self-blame',
        detail:
          'Each time you catch an old loop, stop it mid-sentence and finish the conversation the way the fulfilled you would. Not by arguing — by simply switching the script, the way you\'d change a radio station.',
      },
      {
        title: 'Guard the trigger hours',
        detail:
          'First minutes after waking, idle transit time, and the last minutes before sleep are when inner speech runs loudest and sinks deepest. Give those slots a deliberate script rather than leaving them to the old loops.',
      },
      {
        title: 'Be faithful when the world lags',
        detail:
          'The world will go on reflecting the old diet for a while. Neville\'s warning is precise: if you find the world unchanged, that is a sign of infidelity to the new diet — the temptation is to condemn the environment; the practice is to stay at the table.',
      },
    ],
    quotes: [
      {
        text: 'Nothing is more important to you than the ideas on which you feed. And you feed on the ideas from which you think. If you find the world unchanged, it is a sure sign that you are wanting in fidelity to the new Mental diet, which you neglect in order to condemn your environment.',
        source: 'Awakened Imagination — Chapter 7',
        href: '/books/awakened-imagination/awakened-imagination-chapter-7',
      },
      {
        text: 'But unless there is a change of Mental diet, your personal history remains the same.',
        source: 'Awakened Imagination — Chapter 7',
        href: '/books/awakened-imagination/awakened-imagination-chapter-7',
      },
      {
        text: 'The way to change the outer world is to make the inner speech and action match the outer speech and action of fulfilled desire.',
        source: 'Awakened Imagination — Chapter 6',
        href: '/books/awakened-imagination/awakened-imagination-chapter-6',
      },
      {
        text: 'Inner speech and action are the channels of God’s action. He cannot respond to our Prayer unless these paths are offered.',
        source: 'Awakened Imagination — Chapter 6',
        href: '/books/awakened-imagination/awakened-imagination-chapter-6',
      },
    ],
    mistakes: [
      {
        title: 'Suppressing instead of replacing',
        detail:
          'Trying to *not think* a thought feeds it attention. The diet works by substitution: the old conversation is not fought, it is talked over by the new one.',
      },
      {
        title: 'Changing outer speech only',
        detail:
          'Saying pleasant things aloud while inwardly rehearsing grievances is the diet in name only. Neville\'s test is the inner conversation — the one nobody hears.',
      },
      {
        title: 'Dieting only about the big desire',
        detail:
          'Inner speech about the driver who cut you off, the coworker, the weather — it all feeds the same consciousness. A mental diet that only covers one topic while the rest runs on resentment is a leaky diet.',
      },
      {
        title: 'Condemning the environment when it lags',
        detail:
          'The world unchanged is feedback, not refutation — and blaming circumstances is precisely the old diet reasserting itself. Neville names this exact trap in Chapter 7.',
      },
    ],
    faq: [
      {
        q: 'How long before the outer world reflects the new diet?',
        a: 'Neville gives no timetable, only the mechanism: inner speech held with fidelity out-pictures. Practitioners typically notice their own reactions change within days — and the outer feedback follows the changed reactions.',
      },
      {
        q: 'Is this the same as affirmations?',
        a: 'Close, but the emphasis differs: affirmations are usually scheduled recitations; the mental diet targets the *spontaneous* inner conversations. A hundred scheduled affirmations won\'t outweigh a day of unwatched inner arguing.',
      },
      {
        q: 'What about consuming news and social media?',
        a: 'Neville spoke of ideas, not apps — but the principle extends naturally: whatever reliably starts the old inner conversations is part of the diet. Curate inputs the way you curate the inner speech they trigger.',
      },
      {
        q: 'What do I do with genuinely negative events?',
        a: 'Handle the event practically, then handle the *conversation about it* with Revision that evening. The diet governs what you keep saying inwardly about it afterward — that is what gets planted.',
      },
    ],
    related: [
      { title: 'Awakened Imagination — Chapter 6', href: '/books/awakened-imagination/awakened-imagination-chapter-6' },
      { title: 'Awakened Imagination — Chapter 7', href: '/books/awakened-imagination/awakened-imagination-chapter-7' },
      { title: 'There Is No Fiction', href: '/lectures/there-is-no-fiction' },
      { title: 'Glossary: Mental Diet', href: '/glossary#mental-diet' },
    ],
  },
  {
    slug: 'i-am',
    title: 'I AM — The Foundation',
    shortTitle: 'I AM',
    tagline: 'Whatever you attach to "I am" with feeling, you become. Choose deliberately.',
    description:
      "Neville Goddard's I AM teaching from At Your Command: why awareness of being is the creative power and how to practice conscious self-conception.",
    intro: [
      'Before any technique comes the foundation on which they all rest: **I AM** — your bare awareness of being. In Neville\'s reading of Scripture, this is the meaning of "I AM hath sent me": consciousness itself is the creative power, and every condition in your world is a name you have unknowingly attached to it. "I am tired, I am behind, I am unlucky, I am not the kind of person who..." — each is a seed, faithfully out-pictured.',
      'The practice is twofold: become aware of what you are *already* attaching to I AM all day, and learn to consciously assume the conception of yourself you actually want — what Neville, in his first book *At Your Command*, presents as the whole of the law.',
    ],
    stepsIntro: 'The core practice, drawn from At Your Command:',
    steps: [
      {
        title: 'Hear your daily I AMs',
        detail:
          'For a day or two, catch every sentence you speak or think that begins with "I am" (or its disguises: "I\'m just", "I\'ve always been", "I\'m not someone who"). You are hearing your self-conception — and, in Neville\'s frame, tomorrow\'s facts, spoken today.',
      },
      {
        title: 'Withdraw to unconditioned awareness',
        detail:
          'Sit quietly, close your eyes, and drop every label: not "I am [name], [job], [problem]" — just the naked feeling of being. Repeat "I AM" silently, with feeling, until you rest in formless awareness. Neville describes losing yourself in "the feeling of just being — faceless and formless".',
      },
      {
        title: 'Clothe I AM in the new conception',
        detail:
          'From that unconditioned deep, give form to the new self: feel "I am healthy", "I am secure", "I am wanted" — not as words recited but as a state assumed, the way you would put on a garment. FEEL yourself to be that which you desire to be.',
      },
      {
        title: 'Answer the old name with the new',
        detail:
          'Through the day, the world will call you by the old conception — the bank balance, the mirror, other people\'s expectations. Each time, silently reaffirm the new: the conviction you defend when challenged is the one that hardens into fact.',
      },
      {
        title: 'Let the agreement give birth',
        detail:
          'When I AM and the desired state have genuinely agreed — when "I am healthy" feels like a report, not a hope — the work is done. Persist until the new conception is your default answer to "who am I?".',
      },
    ],
    quotes: [
      {
        text: 'The urge of itself has no reality, For, “I AM” or the awareness of being is the only reality. Things live only as long as I AM aware of being them.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'You say silently but feeling to yourself, “I AM.” Do not condition this ‘awareness’ as yet. Just declare yourself to be, and continue to do so, until you are lost in the feeling of just being – faceless and formless. When this expansion of consciousness is attained, then, within this formless deep of yourself give form to the new conception by FEELING yourself to be THAT which you desire to be.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'I am nameless but will take upon myself every name (nature) that you call me. Remember it is you, yourself, that I speak of as ‘me.’ So every conception that you have of yourself – that is every deep conviction – you have of yourself is that which you shall appear as being.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'It is just as easy to possess the consciousness of these qualities as it is to possess their opposites for you have not your present consciousness because of your world. On the contrary, your world is what it is because of your present consciousness.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'You can no more change your environment, or world, by destroying things than you can your reflection by destroying the mirror. Your environment, and all within it, reflects that which you are in consciousness.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
    ],
    mistakes: [
      {
        title: 'Reciting without feeling',
        detail:
          'Mechanically repeating "I am wealthy" while feeling poor plants *the feeling*. Neville\'s agreement is between awareness and the *felt* state — the words are only the handle.',
      },
      {
        title: 'Skipping the unconditioned step',
        detail:
          'Trying to bolt a new conception directly onto the old self usually fails — the old convictions argue back. The formless "just I AM" step quiets the old identity first; Neville presents it as the doorway, not an ornament.',
      },
      {
        title: 'Keeping the old wine',
        detail:
          '"You cannot put new wine in old bottles": claiming the new conception while rehearsing old grievances, fears and limitations is carrying the old man into the new consciousness. The diet of inner speech must match the new I AM.',
      },
      {
        title: 'Waiting for evidence before identifying',
        detail:
          '"I\'ll feel successful when I see success" reverses the law as Neville states it: consciousness first, out-picturing second. The mirror cannot smile first.',
      },
    ],
    faq: [
      {
        q: 'Is this religious? Do I have to accept Neville\'s reading of the Bible?',
        a: 'Neville frames everything scripturally — I AM is God, awareness of being. But the practice itself requires only the psychological claim: your habitual self-conception shapes your experience. Test it as psychology; the metaphysics can wait.',
      },
      {
        q: 'How is I AM different from the other techniques?',
        a: 'It is their root. SATS impresses a scene, Revision corrects one, the Mental Diet guards inner speech — all of them are ways of changing what I AM is attached to. Neville\'s first book teaches only this, and calls everything at your command through it.',
      },
      {
        q: 'What is a practical daily I AM routine?',
        a: 'Morning, before reaching for the phone: two minutes of unconditioned "I AM", then assume the chosen conception with feeling. During the day: catch-and-correct stray "I am" statements. Night: fall asleep in the feeling of the wish fulfilled.',
      },
      {
        q: 'Can I use it for someone else?',
        a: 'Neville taught that you change others by changing the conception of them you hold in consciousness — always lovingly. See the Revision guide: congratulate them inwardly on the good you wish them.',
      },
    ],
    related: [
      { title: 'At Your Command (full book)', href: '/books/at-your-command' },
      { title: 'Your Faith is Your Fortune', href: '/books/your-faith-is-your-fortune' },
      { title: 'The Power of Awareness (book)', href: '/books/the-power-of-awareness' },
      { title: 'Glossary: I AM', href: '/glossary#i-am' },
    ],
  },
  {
    slug: 'everyone-is-you-pushed-out',
    title: 'Everyone Is You Pushed Out (EIYPO)',
    shortTitle: 'EIYPO',
    tagline: 'Others reflect your assumptions about them. Change the inner man, and the outer one bears witness.',
    description:
      "Neville Goddard's Everyone Is You Pushed Out (EIYPO) explained: how your assumptions about others shape their behavior toward you, with sources and practice.",
    intro: [
      'EIYPO — "everyone is you pushed out" — is Neville\'s most radical and most misunderstood idea: the people in your world show up for you according to the assumptions you hold about them. The boss who never appreciates you, the partner who always criticizes, the friend who always comes through — each is, in Neville\'s frame, your own consciousness made visible.',
      'Taken practically rather than philosophically, it is a lever: **you don\'t have to negotiate with the outer person — you work on the inner one.** Change what you sustain inwardly about someone, and their behavior toward you changes. Neville demonstrated it constantly with revision: congratulating the unemployed friend inwardly until he found work.',
    ],
    stepsIntro: 'How to work with EIYPO on a specific relationship:',
    steps: [
      {
        title: 'Identify the standing assumption',
        detail:
          'Pick the person and ask honestly: what do I *expect* from them? Listen to your inner conversations about them — the complaints you rehearse, the reactions you predict. That script is the assumption they keep confirming.',
      },
      {
        title: 'Decide who they are to you now',
        detail:
          'Define the new fact, specific and finished: "she respects my work", "he is warm with me", "they are thriving". It must be about the fulfilled relationship, not about winning the old argument.',
      },
      {
        title: 'Construct one scene that proves it',
        detail:
          'Build a brief scene which would be natural only if the new fact were true — the warm greeting, the sincere apology given or received, the congratulations. Hear their voice saying the words; hearing inner conversations is Neville\'s favorite instrument for this.',
      },
      {
        title: 'Occupy the scene nightly, guard the diet daily',
        detail:
          'Run the scene in SATS until it feels like memory, and refuse the old inner conversations about them during the day. Complaining to others about the person is watering the old plant while praying over the new one.',
      },
      {
        title: 'Meet them as the new person',
        detail:
          'Next encounter, greet who you\'ve been imagining, not who you remember. Give the changed inner man time to externalize; Neville\'s claim is that they *must* bear witness to the change that took place in you.',
      },
    ],
    quotes: [
      {
        text: 'Everything in the world is yourself pushed out.',
        source: 'Enter The Dream',
        href: '/lectures/enter-the-dream',
      },
      {
        text: 'If I could only get you to realize that you dwell in everyone. That you are always looking at yourself pushed out! Unable to behold another, every being in the world is yourself made visible.',
        source: 'Come, O Blessed',
        href: '/lectures/come-o-blessed',
      },
      {
        text: 'Your world is your dream pushed out. When you can persuade yourself 100% that you are successful, success is yours!',
        source: 'A Prophecy',
        href: '/lectures/a-prophecy',
      },
      {
        text: 'You can only be to others what you are first to yourself. Therefore, to revalue yourself and begin to feel yourself to be the giant, a center of power, is to dwarf these former giants and make of them grasshoppers.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'I bring him before my mind’s eye and I congratulate him on his good fortune because he is now gainfully employed. I allow him to accept my congratulations... Tomorrow people will see him as they could not have seen him before the pruning that took place within me.',
        source: 'The Pruning Shears of Revision',
        href: '/lectures/the-pruning-shears-of-revision',
      },
    ],
    mistakes: [
      {
        title: 'Using it to control people',
        detail:
          'EIYPO is not puppeteering. Neville bound it to the Golden Rule: because everyone is you pushed out, imagining harm or manipulation for another is planting it in your own world. Imagine *for* people what you would want imagined for you.',
      },
      {
        title: 'Using it to excuse people',
        detail:
          '"It\'s all my consciousness" does not mean tolerating mistreatment while you imagine. Take whatever outer action wisdom requires; EIYPO governs the inner assumption you sustain, not whether you set boundaries.',
      },
      {
        title: 'Testing on a deadline',
        detail:
          '"I\'ll imagine nicely about her for three days and see" is watching, not assuming. The friend in Neville\'s stories is congratulated as *already* employed — a settled fact, not an experiment awaiting results.',
      },
      {
        title: 'Revising the scoreboard instead of the person',
        detail:
          'Rehearsing scenes where they finally admit you were right is the old grievance wearing a new costume. The revised scene must be the *fulfilled relationship*, with the argument dissolved, not won.',
      },
    ],
    faq: [
      {
        q: 'Does EIYPO mean other people aren\'t real?',
        a: 'Neville\'s metaphysics goes far ("you dwell in everyone"), but the practice doesn\'t require solving philosophy of mind. The operational claim is narrower: *your experience of* others tracks your sustained assumptions about them — and that you can test.',
      },
      {
        q: 'Someone treats me badly. Am I to blame?',
        a: 'EIYPO is a lever, not a verdict. Neville\'s point is never guilt — it is that you are not at the mercy of the other person, because the assumption is yours to change. Blame keeps the old scene; revision replaces it.',
      },
      {
        q: 'Can I use this for a specific person romantically?',
        a: 'Neville answered questions like this constantly, and his counsel was always the same discipline: assume the fulfilled, loving relationship and let the outer follow — never manipulation, and never against anyone\'s dignity, since what you plant for them you plant in your own world.',
      },
      {
        q: 'What if the person never changes?',
        a: 'In Neville\'s frame, a person who "never changes" is an assumption faithfully held. But the fulfilled state also includes your own freedom — sometimes the change EIYPO delivers is a graceful exit, a better job, a new circle. Assume the end (harmony, respect, love), not the mechanism.',
      },
    ],
    related: [
      { title: 'Enter The Dream', href: '/lectures/enter-the-dream' },
      { title: 'Come, O Blessed', href: '/lectures/come-o-blessed' },
      { title: 'A Divine Event', href: '/lectures/a-divine-event' },
      { title: 'Glossary: Everyone is you pushed out', href: '/glossary#everyone-is-you-pushed-out' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'affirmations',
    title: 'Affirmations — Claiming It Inwardly',
    shortTitle: 'Affirmations',
    tagline: 'Not words repeated at the mirror — a self-conception affirmed until the old one is crowded out.',
    description:
      "How Neville Goddard actually taught affirmations: felt I AM claims that crowd out the old self-conception — with steps, sources, and common mistakes.",
    intro: [
      'Affirmations are the most used — and most misused — tool in the modern manifestation world. Neville\'s version is sharper than the mantra-at-the-mirror cliché: what you *affirm within yourself* — the concept of self you inwardly consent to — is what develops in your world. The sentence is only a handle; the affirmation is the state it lets you grip.',
      'His mechanism for why repetition works is also more honest than "the universe hears you": an old idea is not willed away — it is *crowded out* by a new and absorbing one. Affirming, done properly, is deliberate crowding: occupying consciousness with the new claim until the old tenant leaves.',
    ],
    stepsIntro: 'How to affirm the way Neville taught it:',
    steps: [
      {
        title: 'Find the I AM form',
        detail:
          'Convert the desire into a present-tense statement of being: not "I want confidence" but "I am confident"; not "money is coming" but "I am financially secure". If it can\'t be said as I AM, it isn\'t yet a self-conception — and self-conception is what out-pictures.',
      },
      {
        title: 'Say it to feel it, not to fill air',
        detail:
          'The words are a ladder into a feeling. Say the sentence slowly, inwardly, until a trace of its truth registers in the body — the loosened shoulders of "I am secure", the lifted chest of "I am appreciated". One felt repetition outweighs a hundred mechanical ones.',
      },
      {
        title: 'Use the still moment',
        detail:
          'Neville\'s formula from the radio talks: "Be still and know \'I am that which I desire.\'" The drowsy state, the quiet minute before sleep and after waking — these are when the claim sinks below argument. Anchor your affirming there rather than shouting over a busy day.',
      },
      {
        title: 'Crowd, don\'t fight',
        detail:
          'When the old idea speaks ("who are you kidding?"), don\'t debate it — return to the claim. The old conception is pushed off like dead leaves by the new one\'s occupancy, never by argument.',
      },
      {
        title: 'Let the day confirm you',
        detail:
          'An affirmation held inwardly changes how you interpret and respond, and the world answers the new responses. Watch for the small confirmations and receive them as evidence — that reception is itself an act of affirming.',
      },
    ],
    quotes: [
      {
        text: 'Everything depends on our attitude towards ourself – that which we will not affirm within ourself can never develop in our world.',
        source: 'Radio Lecture: Affirm The Reality of our Own Greatness',
        href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness',
      },
      {
        text: 'If we wish to see the world a finer, greater place, we must affirm the reality of a finer, greater being within ourselves.',
        source: 'Radio Lecture: Affirm The Reality of our Own Greatness',
        href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness',
      },
      {
        text: 'Be still and know "I am that which I desire." Strive always after being.',
        source: 'Radio Lecture: Affirm The Reality of our Own Greatness',
        href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness',
      },
      {
        text: 'An old idea is not fickly forgotten, it is crowded out by new ideas. It disappears when a wholly new and absorbing idea occupies our attention.',
        source: 'Radio Lecture: Affirm The Reality of our Own Greatness',
        href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness',
      },
      {
        text: 'Man can decree a thing and it will come to pass.',
        source: 'Your Faith Is Your Fortune — Chapter 2',
        href: '/books/your-faith-is-your-fortune/your-faith-is-your-fortune-chapter-2',
      },
    ],
    mistakes: [
      {
        title: 'Reciting against the feeling',
        detail:
          'Saying "I am wealthy" while feeling the ache of lack affirms the ache — feeling is the language that lands. If a claim is too far to feel, step it down to one you can feel ("I am learning to receive") and climb from there.',
      },
      {
        title: 'Volume over stillness',
        detail:
          'A hundred rushed repetitions in traffic do less than three slow ones on the edge of sleep. The state of the mind receiving the words matters more than the count.',
      },
      {
        title: 'Affirming the future',
        detail:
          '"I will be" keeps the good permanently ahead of you — Neville notes the I AM can only speak in the present tense. Affirm from the end, as fact, now.',
      },
      {
        title: 'Arguing with the backtalk',
        detail:
          'Treating the old idea\'s objections as a debate to win gives them your attention — the one food they need. Notice, return to the claim, repeat. Crowding is quiet work.',
      },
    ],
    faq: [
      {
        q: 'What about "robotic affirming"?',
        a: 'The community technique of repeating a phrase mechanically all day is a modern coinage, not Neville\'s vocabulary — but it can work for the reason he gives: sustained occupancy crowds out the old idea, and repetition often softens into feeling. If it stays dead recitation and the feeling never comes, switch to fewer, stiller, felt repetitions.',
      },
      {
        q: 'How is this different from the I AM technique?',
        a: 'The I AM guide covers the foundation — unconditioned awareness and self-conception. Affirmations are its daily handles: short felt claims that keep the chosen conception occupied during ordinary hours. Same root, different grip.',
      },
      {
        q: 'How many affirmations should I run at once?',
        a: 'One core claim — or a small set that describes one coherent self. Ten unrelated affirmations describe nobody; the subconscious out-pictures a self-conception, not a shopping list.',
      },
      {
        q: 'Aloud or silent?',
        a: 'Neville\'s emphasis was always inner: the affirmation that counts is the one your inner conversations agree with. Speak aloud if it helps you feel it — but the test is what you keep saying inwardly when nobody is listening.',
      },
    ],
    related: [
      { title: 'Radio Lecture: Affirm The Reality of our Own Greatness', href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness' },
      { title: 'I AM — The Foundation', href: '/techniques/i-am' },
      { title: 'The Mental Diet', href: '/techniques/mental-diet' },
      { title: 'Your Faith Is Your Fortune — Chapter 2', href: '/books/your-faith-is-your-fortune/your-faith-is-your-fortune-chapter-2' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'visualization',
    title: 'Visualization — From Seeing to Being',
    shortTitle: 'Visualization',
    tagline: 'The picture is not the power. Entering the scene with all five imaginal senses is.',
    description:
      "Visualization as Neville Goddard taught it: not watching mental pictures but entering the scene with imaginal sight, sound, touch — spiritual sensation. Steps and sources.",
    intro: [
      'Visualization is where most people start — and where most practice quietly fails, because they stop at *seeing*. A mental picture observed from outside is what Neville called thinking OF the state: pleasant, powerless. The operative act is entering the picture and experiencing it from within, with every imaginal sense — what he named **spiritual sensation**.',
      'His own test for the difference is disarmingly simple: visualize yourself climbing a ladder, then close your eyes and feel yourself actually climbing one. The first is a movie; the second recruits your body\'s knowledge of rungs and effort and height. That felt difference is the entire technique.',
    ],
    stepsIntro: 'How to turn a mental picture into an imaginal act:',
    steps: [
      {
        title: 'Build a small scene, not a montage',
        detail:
          'One moment that implies the wish fulfilled — a handshake, a doorway, a view. Short enough to loop; specific enough to touch.',
      },
      {
        title: 'Step through the screen',
        detail:
          'If you can see yourself in the scene, you are still the audience. Move your point of view behind your own eyes: what would you see FROM there? What is on your left? The switch from third to first person is the moment visualization becomes imagining.',
      },
      {
        title: 'Recruit all five imaginal senses',
        detail:
          'Sight is one sense of five. Add the handshake\'s pressure, the room\'s sound, the coffee\'s smell — "imaginal sight, sound, scent, taste and touch", as Neville lists them. Each added sense makes the scene more real than the last.',
      },
      {
        title: 'Let feeling crown the scene',
        detail:
          'Sensory vividness is scaffolding for one thing: the feeling of the wish fulfilled — relief, gratitude, naturalness. When the feeling arrives, stop building and rest in it.',
      },
      {
        title: 'View the world from the state',
        detail:
          'The finished act is not "I saw a nice scene" but a changed vantage: for those seconds you WERE the fulfilled self, and the world was arranged around that self. That vantage, revisited until habitual, is what out-pictures.',
      },
    ],
    quotes: [
      {
        text: 'The difference will be appreciated if you will now visualize yourself climbing a ladder. Then with eyelids closed imagine that a ladder is right in front of you and feel you are actually climbing it.',
        source: 'Out of this World — Chapter 1',
        href: '/books/out-of-this-world/out-of-this-world-chapter-1',
      },
      {
        text: 'Imagining is spiritual sensation.',
        source: 'The Law and the Promise — Chapter 6',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-6',
      },
      {
        text: 'Enter into the feeling of your wish fulfilled. Through spiritual sensation — through your use of imaginal sight, sound, scent, taste and touch — you will give to your image the sensory vividness necessary to produce that image in your outer or shadow world.',
        source: 'The Law and the Promise — Chapter 6',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-6',
      },
      {
        text: 'We must translate vision into Being, thinking of into thinking from. Imagination must center itself in some state and view the world from that state.',
        source: 'Awakened Imagination — Chapter 2',
        href: '/books/awakened-imagination/awakened-imagination-chapter-2',
      },
    ],
    mistakes: [
      {
        title: 'Watching the movie',
        detail:
          'The third-person highlight reel of "future you" is the single most common failure mode. If you appear in your own scene, step into the actor. First person is not a refinement — it is the technique.',
      },
      {
        title: 'Chasing 4K imagery',
        detail:
          'Vividness serves feeling; it is not the goal. A dim scene that carries real relief impresses more than a photorealistic one observed coldly.',
      },
      {
        title: 'Marathon sessions',
        detail:
          'Twenty minutes of drifting montage scatters; ninety seconds of one entered scene, looped with feeling, concentrates. Short and inhabited beats long and observed.',
      },
      {
        title: 'Skipping the other senses',
        detail:
          'All-visual practice leaves the scene thin. Touch is the most grounding imaginal sense — Neville\'s exercises return to it constantly (the ladder\'s rungs, the hand in yours).',
      },
    ],
    faq: [
      {
        q: 'I have aphantasia — no mental images at all. Am I excluded?',
        a: 'No. Neville\'s target was never the picture but the state — and his own instrument list has five senses plus feeling. Build scenes from inner conversation, touch, and emotional certainty; many practitioners with no visual imagery succeed exactly this way.',
      },
      {
        q: 'Is visualization the same as SATS?',
        a: 'SATS is when-and-how (the drowsy state, the loop, falling asleep in the scene); visualization-done-right is the craft of the scene itself. This guide is the scene-craft; the SATS guide is the session.',
      },
      {
        q: 'Open or closed eyes? Day or night?',
        a: 'Closed eyes and a relaxed body make entering easiest, which is why the nightly session is the classic setting. But a practiced imaginer can enter a scene waiting in a queue — the skill, once built, is portable.',
      },
      {
        q: 'How do I know the scene "took"?',
        a: 'Neville\'s markers: the scene ends with the feeling of accomplishment rather than wanting; and afterward, thinking of the desire feels like remembering. If it still feels like hoping, enter again.',
      },
    ],
    related: [
      { title: 'Out of this World — Chapter 1', href: '/books/out-of-this-world/out-of-this-world-chapter-1' },
      { title: 'The Law and the Promise — Chapter 6', href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-6' },
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'scripting',
    title: 'Scripting — Authoring the Fulfilled Scene',
    shortTitle: 'Scripting',
    tagline: 'Write from the end — the modern name for a practice straight out of Neville\'s casebook.',
    description:
      "Scripting explained through Neville Goddard's own casebook: writing the fulfilled scene as its author — with the original examples, steps, and common mistakes.",
    intro: [
      'A word of honesty first: "scripting" as a term is modern community vocabulary — you will not find it in Neville\'s books. The practice, though, is right there in his casebook. In The Law and the Promise he approvingly reports a student who, stuck with an unsellable property, took the agent\'s discouraging letter and *rewrote it in imagination* — then authored a short scene of the sale completed, cast himself in it, and played it until it felt real. The lot sold. Neville\'s comment: imagining creates reality, and mentally rewriting a letter is imagining.',
      'Scripting is that move with a pen in hand: you sit down as the **Author** (one of the Four Mighty Ones of imagination, from Seedtime and Harvest) and write the scene of the wish fulfilled — not a wish list, but the report of a thing accomplished. The writing is not the magic; it is a harness that holds attention and feeling on the end far better than drifting thought.',
    ],
    stepsIntro: 'How to script so the writing becomes an imaginal act:',
    steps: [
      {
        title: 'Write from the end, as fact',
        detail:
          'Present or past tense, first person, done: "I\'m standing in the office shaking his hand — \'thank you, sir\'" / "It sold this morning, and the relief is enormous." Never "I want", never "I will" — the author of a finished scene does not plead.',
      },
      {
        title: 'Keep it a scene, not an essay',
        detail:
          'The student\'s script in Neville\'s account was one handshake and two lines of dialogue. Half a page that you can re-enter beats five pages you can only re-read. Detail belongs to the senses, not to logistics.',
      },
      {
        title: 'Feel while the pen moves',
        detail:
          'Write slowly enough to experience what you describe — the relief, the smile, the words in the other\'s voice. If your hand writes while your head plans dinner, it is stenography, not scripting.',
      },
      {
        title: 'Use it as a doorway, not an archive',
        detail:
          'Re-read the script to re-enter the state — ideally before the nightly SATS session, where the written scene becomes the imaginal one. The paper is a key you cut once and turn often.',
      },
      {
        title: 'Script the revision too',
        detail:
          'The original casebook use was revision in writing: rewriting a received letter, an exchange, a day, as it should have been. When a scene stings, draft its corrected version — the pen makes the new version concrete enough to relive.',
      },
    ],
    quotes: [
      {
        text: 'The question may arise as to how, by representing others to ourselves as better than they really were, or mentally rewriting a letter to make it conform to our wish... but remember my claims for imagining: Imagining Creates Reality.',
        source: 'The Law and the Promise — Chapter 3',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-3',
      },
      {
        text: 'I received his letter on a Tuesday, and — in my imagination — I rewrote it with words indicating that the agent was eager to take my listing.',
        source: 'A student\'s account — The Law and the Promise, Chapter 3',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-3',
      },
      {
        text: 'As the Author, I wrote this simple scene which, to me, implied fulfillment: Standing in the real estate office, I extended my hand to the agent and said, "Thank you, sir".',
        source: 'A student\'s account — The Law and the Promise, Chapter 3',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-3',
      },
      {
        text: 'Life on earth is a kindergarten for image making. The bigness or littleness of the object to be created is not in itself important.',
        source: 'The Law and the Promise — Chapter 13',
        href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-13',
      },
    ],
    mistakes: [
      {
        title: 'The wish-list script',
        detail:
          '"I want X, I\'d love Y, please let Z happen" is a letter to Santa — written from lack, it impresses lack. A script is a report from the fulfilled end, or it is nothing.',
      },
      {
        title: 'Novel-length manuscripts',
        detail:
          'Pages of world-building feel productive and enter nothing. The measure of a script is whether you can close your eyes and be inside it in five seconds.',
      },
      {
        title: 'Writing as the work',
        detail:
          'The notebook does not manifest; the state does. Scripting that never becomes felt re-entry — just daily pages of the same wishes — is journaling about desire, which keeps it a desire.',
      },
      {
        title: 'Scripting the how',
        detail:
          'Plotting the mechanism ("then he calls, then the bank approves...") drags the means into your job description. Script the end scene; leave the bridge of incidents to build itself.',
      },
    ],
    faq: [
      {
        q: 'Is scripting "valid" if Neville never used the word?',
        a: 'The word is new; the act is his. Written revision and authored scenes are documented in his own casebook, and the Author is one of his Four Mighty Ones. Use the modern name freely — just practice the original mechanics: from the end, with feeling.',
      },
      {
        q: 'Past tense or present tense?',
        a: 'Whichever puts YOU in the scene most naturally. Present tense ("I\'m shaking his hand") suits live scenes; past tense ("it sold this morning") suits the gratitude-report style. The tense that kills scripts is future.',
      },
      {
        q: 'Should I script daily?',
        a: 'One good script re-entered nightly beats a new script every day — rewriting the same desire daily from scratch quietly confesses it hasn\'t happened yet. Write once, refine if the scene sharpens, revisit often.',
      },
      {
        q: 'Keep or destroy the scripts?',
        a: 'Practically: keep them somewhere private — re-reading an old script after its fulfillment is one of the best faith-builders there is (your own casebook). Ritually burning them is community folklore; harmless if it helps you release, unnecessary otherwise.',
      },
    ],
    related: [
      { title: 'The Law and the Promise — Chapter 3', href: '/books/the-law-and-the-promise/the-law-and-the-promise-chapter-3' },
      { title: 'Seedtime and Harvest — Chapter 2 (the Four Mighty Ones)', href: '/books/seedtime-and-harvest/seedtime-and-harvest-chapter-2' },
      { title: 'Revision', href: '/techniques/revision' },
      { title: 'SATS', href: '/techniques/sats' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'letting-go',
    title: 'Letting Go — The Sabbath of the Practice',
    shortTitle: 'Letting Go',
    tagline: 'After the assumption, do nothing: the rest that lets the seed grow is part of the technique.',
    description:
      "What Neville Goddard taught about letting go: do nothing between assumption and realization — the Sabbath, detachment from results, and how to stop digging up the seed.",
    intro: [
      'Every practitioner meets the paradox sooner or later: care enough to imagine, then release your grip so the thing can arrive. Neville answered it without mysticism. Asked what to do between the assumption and its realization, his reply was one word: **nothing**. Not because effort is forbidden, but because the belief that anxious doing helps is precisely doubt in the assumption.',
      'His name for the release was the **Sabbath** — not a day of the week but the mental rest that follows the completed inner work: "the period of mental pregnancy... made for the purpose of incubating the manifestation". You cannot force the Sabbath; it arrives by itself when the six days of work — the assuming — are genuinely done. Which turns letting go from a willpower feat into a diagnostic: if you can\'t let go, the state isn\'t yet natural, and the answer is more feeling, not more grip.',
    ],
    stepsIntro: 'How to release without dropping the state:',
    steps: [
      {
        title: 'Finish the work first',
        detail:
          'Letting go presupposes something to let go OF: an assumption established until it feels like fact. If the scene still feels like wishing, you are in the six days — keep working it in SATS. Premature "detachment" is just giving up with better branding.',
      },
      {
        title: 'Close the session with a full stop',
        detail:
          'End the imaginal act on the feeling of accomplishment — "it is done" — and get up, or fall asleep. No encore, no "one more time to be safe": the extra repetition asked from anxiety impresses anxiety.',
      },
      {
        title: 'Drop the checking, keep the state',
        detail:
          'Letting go is not forgetting your desire; it is retiring from the evidence-audit. The farmer doesn\'t dig up the seed to see if it sprouted — but he also doesn\'t forget he planted a field. Live as the one who planted, without inspecting.',
      },
      {
        title: 'Meet the interval with thanksgiving',
        detail:
          'The gap between assumption and appearance is where practices die. Fill it the way Neville filled prayer — with the mood of the already-received: "thank you" is the inner posture that holds the Sabbath without gripping.',
      },
      {
        title: 'Hand the how entirely over',
        detail:
          '"Everything happens automatically": the bridge of incidents is not your department. When the mind drafts logistics, treat it like any mental-diet slip — notice, drop, return to the end.',
      },
    ],
    quotes: [
      {
        text: 'It is a delusion that, other than assuming the feeling of the wish fulfilled, you can do anything to aid the realization of your desire... Everything happens automatically.',
        source: 'The Power of Awareness — Chapter 21',
        href: '/books/the-power-of-awareness/the-power-of-awareness-chapter-21',
      },
      {
        text: 'The Sabbath is the mental rest which follows the fixed psychological state; it is the result of your six days of work.',
        source: 'Freedom for All — Chapter 5',
        href: '/books/freedom-for-all/freedom-for-all-chapter-5',
      },
      {
        text: 'This mental rest which follows a successful conscious impregnation is the period of mental pregnancy; a period which is made for the purpose of incubating the manifestation.',
        source: 'Freedom for All — Chapter 5',
        href: '/books/freedom-for-all/freedom-for-all-chapter-5',
      },
      {
        text: 'I can of mine own self do nothing... because I seek not mine own will, but the will of the Father which hath sent me.',
        source: 'The Power of Awareness — Chapter 21',
        href: '/books/the-power-of-awareness/the-power-of-awareness-chapter-21',
      },
    ],
    mistakes: [
      {
        title: 'Confusing letting go with giving up',
        detail:
          'Giving up abandons the state ("it\'s not working"); letting go abandons the surveillance. The first kills the seed, the second waters it. The state stays; the grasping goes.',
      },
      {
        title: 'White-knuckled detachment',
        detail:
          'Forcing yourself not to think about the desire is thinking about the desire, with cortisol. Real release is a by-product of naturalness — if it won\'t come, go back to the imaginal work instead of wrestling your own attention.',
      },
      {
        title: 'The morning evidence audit',
        detail:
          'Waking and scanning inbox, phone and world for signs is the delusion of doing in its most popular costume. Every audit re-affirms "not yet".',
      },
      {
        title: 'Doing nothing outwardly too',
        detail:
          'Neville\'s "do nothing" is about aiding the manifestation anxiously — not about boycotting life. Answer the phone, attend the interview, accept the invitation: the bridge of incidents arrives dressed as ordinary events, and you must walk across it.',
      },
    ],
    faq: [
      {
        q: 'How do I "let go" of something I desperately want?',
        a: 'You don\'t — desperation IS the grip. Work the state until the wanting relaxes into having (SATS, nightly), and release follows on its own. If the desire is too hot to feel fulfilled, build faith first on smaller targets — that is exactly what the Test the Law path is for.',
      },
      {
        q: 'Is it wrong to think about my desire during the day?',
        a: 'Thinking FROM it — enjoying it as yours — is the practice. Thinking ABOUT it — measuring its absence — is the leak. Same object, opposite postures.',
      },
      {
        q: 'What if letting go feels like losing momentum?',
        a: 'The six days metaphor answers this: momentum belongs to the working phase, rest belongs to the finished impression. A field doesn\'t need daily replanting — but if the state itself fades and wanting returns, that\'s your signal the impression wasn\'t complete: return to the scene.',
      },
      {
        q: 'How long does the Sabbath last?',
        a: 'Until the birth — Neville gives no calendar, only the promise that the interval is part of the design. The practical answer: it lasts exactly as long as it lasts when you\'re not counting.',
      },
    ],
    related: [
      { title: 'The Power of Awareness — Chapter 21', href: '/books/the-power-of-awareness/the-power-of-awareness-chapter-21' },
      { title: 'Freedom for All — Chapter 5', href: '/books/freedom-for-all/freedom-for-all-chapter-5' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'Test the Law', href: '/test-the-law' },
    ],
  },
];

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return TECHNIQUES.find(t => t.slug === slug);
}
