// Book Summaries: original editorial summaries of the books hosted in the
// vault. Chapter gists follow the actual chapter division of this edition
// (verified against the summary sections inside each chapter file); quotes are
// verbatim from the vault. All hrefs are validated by scripts/validate-links.mjs.

export interface SummaryQuote {
  text: string;
  source: string;
  href: string;
}

export interface SummaryChapter {
  label: string;
  href: string;
  gist: string;
}

export interface SummaryIdea {
  title: string;
  detail: string;
}

export interface SummaryLink {
  title: string;
  href: string;
}

export interface BookSummary {
  slug: string;
  title: string;
  year: number;
  bookHref: string;
  oneLiner: string;
  intro: string[];
  keyIdeas: SummaryIdea[];
  chapters: SummaryChapter[];
  chaptersNote?: string;
  quotes: SummaryQuote[];
  relatedTechniques: SummaryLink[];
  nextRead: { title: string; href: string; why: string };
  whoFor: string;
}

const poa = (n: number) => `/books/the-power-of-awareness/the-power-of-awareness-chapter-${n}`;
const lap = (n: number) => `/books/the-law-and-the-promise/the-law-and-the-promise-chapter-${n}`;
const ai = (n: number) => `/books/awakened-imagination/awakened-imagination-chapter-${n}`;
const fits = (n: number) => `/books/feeling-is-the-secret/feeling-is-the-secret-chapter-${n}`;
const ootw = (n: number) => `/books/out-of-this-world/out-of-this-world-chapter-${n}`;

export const BOOK_SUMMARIES: BookSummary[] = [
  // -------------------------------------------------------------------------
  {
    slug: 'the-power-of-awareness',
    title: 'The Power of Awareness',
    year: 1952,
    bookHref: '/books/the-power-of-awareness',
    oneLiner:
      'Neville\'s most systematic book: consciousness is the only reality, and the law of assumption is how you operate it.',
    intro: [
      'If you read only one Neville book, most students would hand you this one. The Power of Awareness is his most complete and orderly statement of the teaching: you are not a person who *has* consciousness — you are consciousness, and every condition of your life is a state you occupy within it. Change the state, and the conditions must follow.',
      'The book\'s engine is the law of assumption: an assumption, though false, if persisted in, will harden into fact. Around that single law Neville arranges everything the practitioner needs — desire, attention, feeling, naturalness, persistence, faith — in short chapters that each isolate one working part.',
    ],
    keyIdeas: [
      {
        title: 'Consciousness is the one and only reality',
        detail:
          'The I AM at the center of you is the same creative consciousness the Bible calls God. Everything you experience is that consciousness expressed at your current level — the world is your concept of yourself pushed into form.',
      },
      {
        title: 'The law of assumption',
        detail:
          'Assume the feeling of your wish fulfilled and persist: the assumption, though at first denied by the senses, hardens into fact. This is the book\'s spine, stated in Chapter 4 and developed everywhere after.',
      },
      {
        title: 'Desire is the gift, not the problem',
        detail:
          'Your desire is the word of God spoken to you — the self you are meant to grow into. You don\'t suppress it or apologize for it; you accept it as already granted.',
      },
      {
        title: 'Attention is the muscle',
        detail:
          'The capacity to change your future depends on directing attention *from within* — holding it steadily on the wish fulfilled rather than letting the world attract it. Discipline of attention is the practical work.',
      },
      {
        title: 'Naturalness is the measure of success',
        detail:
          'The time it takes an assumption to become fact is proportionate to how natural it feels to be it. Failure has two causes only: lack of persistence, and assumptions that never lose the feeling of pretense.',
      },
      {
        title: 'Do nothing between assumption and realization',
        detail:
          'Once the assumption is established, you don\'t plot the how. The bridge of events builds itself; your one task is fidelity to the state.',
      },
    ],
    chapters: [
      { label: 'Chapters 1–2', href: poa(1), gist: 'The foundation: consciousness is the light in which all things appear — I AM is the only reality, and the world is consciousness made visible.' },
      { label: 'Chapter 3', href: poa(3), gist: 'Man\'s chief delusion is believing in causes outside his own consciousness; transformation begins with the renewing of the mind.' },
      { label: 'Chapter 4', href: poa(4), gist: 'The law stated: an assumption, though false, persisted in hardens into fact. Everything depends on your attitude toward yourself.' },
      { label: 'Chapters 5–6', href: poa(5), gist: 'Life as a psychological drama; controlling imagination and concentrating attention on the wish fulfilled is how you rewrite the script.' },
      { label: 'Chapters 7–9', href: poa(7), gist: 'Assumptions shape reality for good or ill: renounce evil rather than resist it, and claim what is already yours by right of consciousness.' },
      { label: 'Chapters 10–11', href: poa(10), gist: 'Creation is finished — every state already exists. You don\'t create your desire; you select the self-concept that contains it.' },
      { label: 'Chapters 12–13', href: poa(12), gist: 'Attention directed from within, and the state of absorption where assumption becomes effortless perception.' },
      { label: 'Chapters 14–16', href: poa(14), gist: 'The law of least action: assumption works by surrender, not force. You cannot compel creation — you yield to the law and let it operate.' },
      { label: 'Chapters 17–19', href: poa(17), gist: 'Be a doer of the law, not a hearer only — Neville\'s own proofs, and the call to apply rather than admire.' },
      { label: 'Chapters 20–21', href: poa(20), gist: 'Righteousness redefined as the consciousness of already being what you want to be; free will is the choice of which assumption to occupy.' },
      { label: 'Chapters 22–24', href: poa(22), gist: 'Persistence and naturalness: why assumptions fail, how repetition breeds the feeling of reality, and the timing of results.' },
      { label: 'Chapter 25', href: poa(25), gist: 'Faith is not hope but awareness — the inner knowing that the assumed state is already real.' },
      { label: 'Chapters 26–27', href: poa(26), gist: 'Destiny as the sum of your states, and the final unveiling: the consciousness reading these pages is the creator itself.' },
    ],
    quotes: [
      {
        text: 'The only fate governing your life is the fate determined by your own concepts, your own assumptions; for an Assumption, though false, if persisted in will harden into fact.',
        source: 'The Power of Awareness — Chapter 4',
        href: poa(4),
      },
      {
        text: 'Man\'s chief delusion is his conviction that there are causes other than his own state of consciousness.',
        source: 'The Power of Awareness — Chapter 3',
        href: poa(3),
      },
      {
        text: 'All progress, all fulfillment of desire, depend upon the control and concentration of your attention.',
        source: 'The Power of Awareness — Chapter 12',
        href: poa(12),
      },
      {
        text: 'The time it takes your Assumption to become reality is proportionate to the naturalness of being it.',
        source: 'The Power of Awareness — Chapter 24',
        href: poa(24),
      },
      {
        text: 'You are God. You are the "I am that I am." You are consciousness. You are the creator.',
        source: 'The Power of Awareness — Chapter 27',
        href: poa(27),
      },
    ],
    relatedTechniques: [
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'I AM — The Foundation', href: '/techniques/i-am' },
      { title: 'SATS', href: '/techniques/sats' },
    ],
    nextRead: {
      title: 'The Law and the Promise',
      href: '/summaries/the-law-and-the-promise',
      why: 'After the theory at its clearest, read the book of evidence: dozens of real practitioners\' stories.',
    },
    whoFor:
      'The best single-book introduction to the whole teaching — and the one to re-read when practice feels scattered and you need the system in order again.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'the-law-and-the-promise',
    title: 'The Law and the Promise',
    year: 1961,
    bookHref: '/books/the-law-and-the-promise',
    oneLiner:
      'Neville\'s book of proof: real people\'s stories showing that imagining creates reality — and the mystical Promise beyond the law.',
    intro: [
      'Neville\'s last major book is also his most concrete. Where The Power of Awareness argues the law, The Law and the Promise *demonstrates* it: chapter after chapter of letters from his students — houses imagined and moved into, careers rewritten, relationships revised — each followed by his commentary on the principle at work. It reads like a success-stories archive sixty years before Reddit.',
      'Then the final chapter changes register entirely: beyond the Law (imagining for things) stands the Promise — the mystical awakening Neville believed every person is moving toward. It is the clearest bridge in his work between the practical teaching and its ultimate purpose.',
    ],
    keyIdeas: [
      {
        title: 'Imagining creates reality — as testable claim',
        detail:
          'The book opens by asking to be judged as science judges: by performance. The stories are offered as experiments anyone can repeat.',
      },
      {
        title: 'Dwell in the wish fulfilled',
        detail:
          'The recurring method in the stories: don\'t visit your dream — live in it. Fall asleep in the dream house, feel the ring on the finger, hear the congratulations, until the outer world catches up.',
      },
      {
        title: 'Moods are causes, not effects',
        detail:
          'A sustained mood is an imaginal activity that creates its like in circumstance. The practitioners who succeed are the ones who chose their mood deliberately.',
      },
      {
        title: 'Enter the image',
        detail:
          'The turning point in many stories is the shift from *seeing* a mental picture to *entering* it — becoming the actor rather than the audience. Entering the image impregnates it with life.',
      },
      {
        title: 'Happiness lives in particulars',
        detail:
          'Life is "a kindergarten for image making": the small, specific scene — a hat, a ride, a handshake — is where the power trains. The bigness of the object is irrelevant to the law.',
      },
      {
        title: 'The Promise beyond the Law',
        detail:
          'Using imagination to improve circumstances is the Law; being awakened *as* the divine imagination is the Promise. The last chapter recounts the mystical experiences Neville held to be everyone\'s destination.',
      },
    ],
    chapters: [
      { label: 'Chapter 1', href: lap(1), gist: 'The thesis and the method: imagining creates reality, proven not by argument but through the true stories that follow.' },
      { label: 'Chapters 2–3', href: lap(2), gist: 'Dwelling in the dream until it objectifies — and revision as imagining\'s power to reshape what already happened.' },
      { label: 'Chapters 4–6', href: lap(4), gist: 'Causation is mental: attitudes become vision, and disciplined imagination — spiritual sensation — is distinguished from idle fancy.' },
      { label: 'Chapters 7–9', href: lap(7), gist: 'Moods as creative acts, attention as the spearhead of imagining, and the decisive move of entering the image instead of observing it.' },
      { label: 'Chapters 10–12', href: lap(10), gist: 'The visible world rises from the unseen: imagination as the Potter, and mental things as the only ultimate realities.' },
      { label: 'Chapters 13–14', href: lap(13), gist: 'The power of small particulars — life as a kindergarten for image making — and the daily creative moment that renews all others.' },
      { label: 'Chapter 15', href: lap(15), gist: 'The Promise: beyond wise use of the Law stand the mystical experiences — the birth from above — that reveal who the imaginer is.' },
    ],
    quotes: [
      {
        text: 'When man solves the mystery of imagining, he will have discovered the secret of causation, and that is: Imagining creates reality.',
        source: 'The Law and the Promise — Chapter 1',
        href: lap(1),
      },
      {
        text: 'Nothing appears or continues in being by a power of its own.',
        source: 'The Law and the Promise — Chapter 1',
        href: lap(1),
      },
      {
        text: 'Faith is believing what is unbelievable. Commit yourself to the feeling of the wish fulfilled, in faith that this act of self-commission will become a reality.',
        source: 'The Law and the Promise — Chapter 1',
        href: lap(1),
      },
      {
        text: 'Life on earth is a kindergarten for image making. The bigness or littleness of the object to be created is not in itself important.',
        source: 'The Law and the Promise — Chapter 13',
        href: lap(13),
      },
    ],
    relatedTechniques: [
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'Revision', href: '/techniques/revision' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
    nextRead: {
      title: 'Awakened Imagination',
      href: '/summaries/awakened-imagination',
      why: 'The stories show the law working; Awakened Imagination reveals who the imaginer actually is.',
    },
    whoFor:
      'For the skeptic who needs evidence before doctrine, and for any practitioner whose faith is fed by other people\'s testimony — this is the original success-stories collection.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'awakened-imagination',
    title: 'Awakened Imagination',
    year: 1954,
    bookHref: '/books/awakened-imagination',
    oneLiner:
      'The identity of Christ and human imagination — and the practical arts of revision, inner speech, and thinking from the end.',
    intro: [
      'This is Neville\'s deepest book, and his own favorite ground: the claim that the Christ of scripture is not a man in history but the human imagination itself — "the power that worketh in us". What religion calls salvation, Neville presents as the awakening of that power from passive dreaming to deliberate use.',
      'For a mystical book it is remarkably practical. Two of the most usable chapters Neville ever wrote are here: the distinction between thinking *of* the end and thinking *from* it (Chapter 2), and the disciplines of revision and inner speech (Chapters 4–6) that turn the metaphysics into a daily craft.',
    ],
    keyIdeas: [
      {
        title: 'Christ is your imagination',
        detail:
          'The book\'s central identification: the creative power scripture personifies is the imagination in you. Awakening it — not worshiping it at a distance — is the whole work.',
      },
      {
        title: 'Thinking from the end',
        detail:
          'A state thought *of* stays a possibility; a state thought *from* becomes overpoweringly real. The preposition is the entire secret, and Chapter 2 is its definitive statement.',
      },
      {
        title: 'Revision is the first act of cure',
        detail:
          'Rewriting the day in imagination repeals it. Neville presents revision not as an occasional fix but as the daily hygiene of the awakened imagination.',
      },
      {
        title: 'Inner speech builds the world',
        detail:
          'Your unheard conversations are the channels of creation: change the inner dialogue to match the wish fulfilled and the outer speech of the world must follow.',
      },
      {
        title: 'All states already exist',
        detail:
          'You never create a state — you enter one. The "inner countryside" contains every possible condition, and movement between states is what men call change of fortune.',
      },
    ],
    chapters: [
      { label: 'Chapter 1', href: ai(1), gist: 'The awakening claim: continuous imagination is sufficient for all things, and an assumption persisted in hardens into fact.' },
      { label: 'Chapter 2', href: ai(2), gist: 'The pivot of the whole teaching: from thinking of the end to thinking from the end — "determined imagination is the beginning of all miracles".' },
      { label: 'Chapter 3', href: ai(3), gist: 'The two outlooks — natural and spiritual — and the inner body through which the second sees.' },
      { label: 'Chapter 4', href: ai(4), gist: 'Revision as the first act of cure: the daily exercise of rewriting the day, and why it heals the reviser first.' },
      { label: 'Chapter 5', href: ai(5), gist: 'Inner speech revealed as the engine of states: what you say inwardly is what you are sowing.' },
      { label: 'Chapter 6', href: ai(6), gist: 'The method of matching: make inner speech and action agree with the fulfilled desire, and the outer world reshapes itself.' },
      { label: 'Chapter 7', href: ai(7), gist: 'States already exist and the mental diet that keeps you in the chosen one — infidelity to the diet is why the world stays unchanged.' },
      { label: 'Chapter 8', href: ai(8), gist: 'Advent: the awakening of Christ in you — imagination rising from dream to deliberate creation.' },
    ],
    quotes: [
      {
        text: 'Determined imagination, thinking from the end, is the beginning of all miracles.',
        source: 'Awakened Imagination — Chapter 2',
        href: ai(2),
      },
      {
        text: 'Experience has convinced me that an Assumption, though false, if persisted in, will harden into fact, that continuous imagination is sufficient for all things.',
        source: 'Awakened Imagination — Chapter 1',
        href: ai(1),
      },
      {
        text: 'The way to change the outer world is to make the inner speech and action match the outer speech and action of fulfilled desire.',
        source: 'Awakened Imagination — Chapter 6',
        href: ai(6),
      },
      {
        text: 'Nothing is more important to you than the ideas on which you feed. And you feed on the ideas from which you think.',
        source: 'Awakened Imagination — Chapter 7',
        href: ai(7),
      },
    ],
    relatedTechniques: [
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'Revision', href: '/techniques/revision' },
      { title: 'The Mental Diet', href: '/techniques/mental-diet' },
    ],
    nextRead: {
      title: 'Feeling is the Secret',
      href: '/summaries/feeling-is-the-secret',
      why: 'After the depth, the mechanism: the shortest, sharpest account of how feeling impresses the subconscious.',
    },
    whoFor:
      'For the student ready to go past technique into what the teaching actually claims about God and man — while still getting two of Neville\'s most practical chapters.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'feeling-is-the-secret',
    title: 'Feeling is the Secret',
    year: 1944,
    bookHref: '/books/feeling-is-the-secret',
    oneLiner:
      'The mechanism in four short chapters: conscious and subconscious, and why the feeling you sleep in becomes the life you wake to.',
    intro: [
      'Barely forty pages, readable in an evening, and probably the most quoted of all Neville\'s books. Feeling is the Secret strips the teaching to its mechanism: the conscious mind conceives, the subconscious executes — and the language the subconscious understands is not words or images but *feeling*.',
      'Its practical heart is the doctrine of sleep: the state you carry across the threshold of sleep is the instruction the subconscious works from all night. Neville\'s rule — never sleep in the consciousness of failure — may be the single highest-leverage habit in the entire teaching.',
    ],
    keyIdeas: [
      {
        title: 'Conceiving and executing',
        detail:
          'Consciousness is double: the conscious (male, idea-generating) impresses, the subconscious (female, form-giving) expresses. What you feel as true, the deeper mind faithfully out-pictures — without judging whether it serves you.',
      },
      {
        title: 'Feeling is the language',
        detail:
          'Ideas are only impressed on the subconscious through feeling. An affirmation without feeling plants nothing; a fear felt vividly plants everything.',
      },
      {
        title: 'Sleep is the gate',
        detail:
          'In sleep and in prayer — a state akin to sleep — the two minds join creatively. The nightly drift into sleep is your daily audience with the power that shapes tomorrow.',
      },
      {
        title: 'Prayer as yielding',
        detail:
          'Prayer is not begging but receiving: assuming the feeling of the wish already granted and yielding to it, the way you yield to sleep. Force defeats it; feeling accomplishes it.',
      },
    ],
    chapters: [
      { label: 'Chapter 1 — Law and Its Operation', href: fits(1), gist: 'The two minds and their marriage: consciousness is the one reality, and feeling is how the conscious impresses the subconscious.' },
      { label: 'Chapter 2 — Sleep', href: fits(2), gist: 'The doctrine of sleep: enter it in the feeling of the wish fulfilled — never in discouragement — for the state you sleep in is the seed.' },
      { label: 'Chapter 3 — Prayer', href: fits(3), gist: 'Prayer as controlled reverie: relaxed, receptive, assuming the answer already given rather than pleading for it.' },
      { label: 'Chapter 4 — Spirit / Feeling', href: fits(4), gist: 'Feeling as spirit itself: you become what you feel, and disciplined feeling is the whole of the practice.' },
    ],
    quotes: [
      {
        text: 'It is in sleep and in Prayer, a state akin to sleep, that man enters the subconscious to make his impressions and receive his instructions.',
        source: 'Feeling is the Secret — Chapter 2',
        href: fits(2),
      },
      {
        text: 'Night after night, you should assume the feeling of being, having and witnessing that which you seek to be, possess and see manifested. Never go to sleep feeling discouraged or dissatisfied.',
        source: 'Feeling is the Secret — Chapter 2',
        href: fits(2),
      },
      {
        text: 'To assume the feeling of satisfaction is to call conditions into being which will mirror satisfaction.',
        source: 'Feeling is the Secret — Chapter 2',
        href: fits(2),
      },
    ],
    relatedTechniques: [
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
    nextRead: {
      title: 'Out of this World',
      href: '/summaries/out-of-this-world',
      why: 'Once you have the mechanism, Out of this World gives you its most precise operating manual — the SATS procedure.',
    },
    whoFor:
      'The ideal first read: short enough to finish tonight, complete enough to practice tomorrow. Also the book to gift to someone curious about the teaching.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'out-of-this-world',
    title: 'Out of this World',
    year: 1949,
    bookHref: '/books/out-of-this-world',
    oneLiner:
      'Thinking fourth-dimensionally: the clearest step-by-step statement of the SATS technique Neville ever put on paper.',
    intro: [
      'Subtitled "Thinking Fourth-Dimensionally", this short book is Neville\'s frame for how imagination can outrun the senses: the fourth-dimensional self can occupy the future now, and what it occupies, the three-dimensional world must eventually stage. Sci-fi flavored language, rigorously practical intent.',
      'Its second chapter contains the most exact procedural description of the state akin to sleep in all of Neville\'s writing — immobilize the body, induce drowsiness, feel yourself right into the action of the fulfilled desire. If SATS is the flagship technique, this is its original manual.',
    ],
    keyIdeas: [
      {
        title: 'The future can be occupied now',
        detail:
          'Man can observe events before they occur — and alter them. The fourth-dimensional focus (imagination) moves freely along the line the senses walk step by step.',
      },
      {
        title: 'The controlled waking dream',
        detail:
          'The working state is a moderate drowsiness: relaxed enough to loosen the senses\' grip, awake enough to direct attention. Chapter 2 gives the full protocol.',
      },
      {
        title: 'First person, present tense',
        detail:
          'The scene must be experienced from within — performing the action here and now, not watching yourself perform it. This single correction rescues most failed practice.',
      },
      {
        title: 'Truth need not bow to facts',
        detail:
          'An imagined state contradicted by the senses is not thereby false; persisted in, it draws its own affinities and becomes fact. Reason describes what is; imagination decrees what shall be.',
      },
      {
        title: 'The ideal wells up from within',
        detail:
          'Your vision of perfection is not vanity but instruction: inner states mold outer worlds, and the ideal you can feel yourself into is the self you are being led to.',
      },
    ],
    chapters: [
      { label: 'Chapter 1', href: ootw(1), gist: 'Thinking fourth-dimensionally: observing and altering the future, and the two outlooks — natural and spiritual — on the same world.' },
      { label: 'Chapter 2', href: ootw(2), gist: 'The SATS manual: immobilize the body, induce the state akin to sleep, and feel yourself right into the proposed action.' },
      { label: 'Chapter 3', href: ootw(3), gist: 'Truth versus external reality: desire and imagination as the enchanter\'s wand, drawing their own affinities when the mind is akin to sleep.' },
      { label: 'Chapter 4', href: ootw(4), gist: 'The vision of perfection: the ideal comes from within, and inner states — not outer efforts — mold the worlds we walk through.' },
    ],
    quotes: [
      {
        text: 'Immobilize the physical body and induce a state of consciousness akin to sleep; then, mentally feel yourself right into the proposed action – imagining all the while that you are actually performing the action here and now.',
        source: 'Out of this World — Chapter 2',
        href: ootw(2),
      },
      {
        text: 'Drowsiness facilitates change because it favors attention without effort, but it must not be pushed to the stage of sleep.',
        source: 'Out of this World — Chapter 1',
        href: ootw(1),
      },
      {
        text: 'Desire and imagination are the enchanter\'s wand of fable and they draw to themselves their own affinities.',
        source: 'Out of this World — Chapter 3',
        href: ootw(3),
      },
    ],
    relatedTechniques: [
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
    nextRead: {
      title: 'The Power of Awareness',
      href: '/summaries/the-power-of-awareness',
      why: 'You have the technique; The Power of Awareness supplies the complete system around it.',
    },
    whoFor:
      'For the practitioner who wants the technique itself, exactly as its author prescribed it — the book to reread the night you recommit to nightly practice.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'at-your-command',
    title: 'At Your Command',
    year: 1939,
    bookHref: '/books/at-your-command',
    oneLiner:
      'Neville\'s first book: the whole teaching in seed form — I AM is God, and whatever you claim with feeling is at your command.',
    intro: [
      'Everything Neville taught for the next thirty years is already here, compressed into one fierce little book. At Your Command names the creative power without hedging: the I AM you announce yourself with — your bare awareness of being — is the God of scripture, and every condition of your life is a name you have attached to it.',
      'Because it is one continuous text rather than chapters, it reads like a single sustained proclamation: hear the claim, test the claim. Its practice — dwelling on "I AM" until you slip free of every label, then clothing that naked awareness in the conception you choose — remains the root technique beneath all the others.',
    ],
    keyIdeas: [
      {
        title: 'I AM is God',
        detail:
          'The awareness of being — before any label — is the creative power itself. "I AM hath sent me" is, in Neville\'s reading, the permanent revelation of where causation lives.',
      },
      {
        title: 'The agreement of two',
        detail:
          'To realize a desire, the awareness and the thing desired must agree — you feel "I AM healthy" until the two are one. That felt union, not petition, is the answered prayer.',
      },
      {
        title: 'New wine needs new bottles',
        detail:
          'You cannot carry the old self-conception into the new. The formless step — dwelling on unconditioned I AM — quiets the old identity before the new one is assumed.',
      },
      {
        title: 'The world is your mirror',
        detail:
          'You can no more change conditions by fighting them than change your face by attacking the mirror. Revalue yourself, and the giants of circumstance shrink to grasshoppers.',
      },
      {
        title: 'Everything is at your command',
        detail:
          'The title is the thesis: whatever you can feel yourself to be, you can be — the only cost is abandoning the conception of yourself that excludes it.',
      },
    ],
    chapters: [],
    chaptersNote:
      'At Your Command is a single continuous text rather than a chaptered book — best read in one sitting (about 40 minutes), then re-read slowly with the I AM practice alongside.',
    quotes: [
      {
        text: '"I AM" or the awareness of being is the only reality. Things live only as long as I AM aware of being them.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'Just declare yourself to be, and continue to do so, until you are lost in the feeling of just being – faceless and formless. When this expansion of consciousness is attained, then, within this formless deep of yourself give form to the new conception by FEELING yourself to be THAT which you desire to be.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'You can no more change your environment, or world, by destroying things than you can your reflection by destroying the mirror.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
      {
        text: 'You can only be to others what you are first to yourself.',
        source: 'At Your Command',
        href: '/books/at-your-command',
      },
    ],
    relatedTechniques: [
      { title: 'I AM — The Foundation', href: '/techniques/i-am' },
      { title: 'Everyone Is You Pushed Out', href: '/techniques/everyone-is-you-pushed-out' },
    ],
    nextRead: {
      title: 'Feeling is the Secret',
      href: '/summaries/feeling-is-the-secret',
      why: 'The seed states the claim; Feeling is the Secret explains the mechanism that makes it work.',
    },
    whoFor:
      'For anyone who wants the teaching at its source — undiluted, urgent, and short enough to read before bed tonight.',
  },
];

export function getBookSummaryBySlug(slug: string): BookSummary | undefined {
  return BOOK_SUMMARIES.find(b => b.slug === slug);
}
