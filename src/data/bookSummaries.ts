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
const yfyf = (n: number) => `/books/your-faith-is-your-fortune/your-faith-is-your-fortune-chapter-${n}`;
const ffa = (n: number) => `/books/freedom-for-all/freedom-for-all-chapter-${n}`;
const pray = (n: number) => `/books/prayer-the-art-of-believing/prayer-the-art-of-believing-chapter-${n}`;
const sh = (n: number) => `/books/seedtime-and-harvest/seedtime-and-harvest-chapter-${n}`;

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

  // -------------------------------------------------------------------------
  {
    slug: 'your-faith-is-your-fortune',
    title: 'Your Faith Is Your Fortune',
    year: 1941,
    bookHref: '/books/your-faith-is-your-fortune',
    oneLiner:
      'The Bible decoded chapter by chapter: every character is a state of your own consciousness, and I AM is the key to them all.',
    intro: [
      'Neville\'s longest early work is a sustained act of translation: story after story of scripture — the virgin birth, Moses, Elijah, Jericho, Gethsemane — reread as psychological drama happening inside you now. The characters are not people in history; they are states of consciousness, and the hero of every story is your own I AM.',
      'The practical thread never drops: man can decree a thing and it will come to pass, the world is a mirror of self-conception, and your desires are the words of God spoken to you. If The Power of Awareness is the system, this is the scripture course that grounds it.',
    ],
    keyIdeas: [
      {
        title: 'The Bible is your biography',
        detail:
          'Every story is a psychological drama of consciousness — not history but instruction. Reading it literally, in Neville\'s view, is how its power was lost.',
      },
      {
        title: 'Man decrees',
        detail:
          '"Man can decree a thing and it will come to pass" — and he always has: today\'s world is yesterday\'s decrees made visible. The teaching is not to start decreeing but to start decreeing consciously.',
      },
      {
        title: 'Leave the mirror alone',
        detail:
          'The world reflects your self-conception; fighting conditions is breaking the mirror to fix your face. Change the concept of self, and the reflection must follow.',
      },
      {
        title: 'Desires are God\'s words',
        detail:
          'Your deep desires are prophecies of what you are capable of being. Accept them as gifts — with thanks, not worthiness-tests.',
      },
      {
        title: 'The disciplines of the inner man',
        detail:
          'The twelve disciples are twelve qualities of mind to be trained — hearing, faith, judgment, and the rest — a psychological reading that turns doctrine into daily discipline.',
      },
    ],
    chapters: [
      { label: 'Chapters 1–2', href: yfyf(1), gist: 'Before Abraham was, I AM: consciousness as the Word, and man\'s standing power to decree.' },
      { label: 'Chapters 3–5', href: yfyf(3), gist: 'Truth that sets free: no masters above you — I AM is the Lord, and consciousness precedes every fact.' },
      { label: 'Chapters 6–9', href: yfyf(6), gist: 'The world as self-reflection: consciousness objectifies itself, and the mirror cannot be fought — only the face changed.' },
      { label: 'Chapters 10–14', href: yfyf(10), gist: 'Hearing, virgin birth, crucifixion and circumcision — the great symbols decoded as operations of consciousness.' },
      { label: 'Chapters 15–18', href: yfyf(15), gist: 'The trinity as impressor and expression, prayer as spiritual union, and the twelve disciplined qualities of mind.' },
      { label: 'Chapters 19–22', href: yfyf(19), gist: 'The ocean of light, Elijah and the widow, and the turn from problems to the desires that already contain their solutions.' },
      { label: 'Chapters 23–26', href: yfyf(23), gist: 'The inner word, true clairvoyance as insight, Gethsemane as conscious creation, and Jericho — the desired state — taken from within.' },
    ],
    quotes: [
      {
        text: 'Man can decree a thing and it will come to pass.',
        source: 'Your Faith Is Your Fortune — Chapter 2',
        href: yfyf(2),
      },
      {
        text: 'Man moves in a world that is nothing more or less than his consciousness objectified.',
        source: 'Your Faith Is Your Fortune — Chapter 9',
        href: yfyf(9),
      },
      {
        text: 'Stop trying to change the world since it is only the mirror. Leave the mirror and change your face. Leave the world alone and change your conceptions of yourself.',
        source: 'Your Faith Is Your Fortune — Chapter 9',
        href: yfyf(9),
      },
      {
        text: 'Look upon your desires as the spoken words of God and every word of prophecy of that which you are capable of being. Accept them as they come to you. Give thanks for them as though they were gifts.',
        source: 'Your Faith Is Your Fortune — Chapter 21',
        href: yfyf(21),
      },
    ],
    relatedTechniques: [
      { title: 'I AM — The Foundation', href: '/techniques/i-am' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
    nextRead: {
      title: 'Freedom for All',
      href: '/summaries/freedom-for-all',
      why: 'The companion volume: the same symbolic method, distilled into a practical formula of realization.',
    },
    whoFor:
      'For readers drawn to Neville\'s scriptural side — and for anyone raised on the Bible who wants to see what it becomes when read from within.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'freedom-for-all',
    title: 'Freedom for All',
    year: 1942,
    bookHref: '/books/freedom-for-all',
    oneLiner:
      'A practical revelation: the Bible\'s strangest stories — Noah, Jacob, the leper\'s cure — decoded into one repeatable formula of realization.',
    intro: [
      'Subtitled "A Practical Application of the Bible", this compact book does two things at once: it continues the symbolic decoding begun in Your Faith Is Your Fortune — Noah\'s ark, Jacob and Esau, the six days of creation, the cure of the leper — and it distills from those stories a formula anyone can use tonight.',
      'The closing chapters are among the most practical Neville ever wrote: desire defined as God speaking, faith as the mustard seed that is absolute rather than large, and the "immaculate conception" as the technique of self-impregnation — defining the desire, and feeling it fulfilled until it is sealed in consciousness.',
    ],
    keyIdeas: [
      {
        title: 'Unconditioned consciousness is God',
        detail:
          'Before you were "someone" — name, history, limits — you were aware of being. That unconditioned I AM is the creative power, and it is the one thing you cannot forget.',
      },
      {
        title: 'The stories are formulas',
        detail:
          'Noah, Ham, Jacob\'s stolen blessing, the two birds of the leper\'s cure — each story, read symbolically, encodes a step of the creative act: secrecy, feeling, attention withdrawn from the problem.',
      },
      {
        title: 'Six days of psychological work',
        detail:
          'Creation\'s six days are not time but inner labor: the disciplined interval between assuming a state and its Sabbath — the stillness when the assumption is complete and effort ends.',
      },
      {
        title: 'Faith is absolute, not big',
        detail:
          'The mustard seed is not a small amount of faith but faith without mixture: being the desired state, not hoping toward it. Wear the feeling until you are sealed in it.',
      },
      {
        title: 'Desire without conditions',
        detail:
          'God speaks through your basic desires — but adding conditions ("only if", "only through him") corrupts the message. Define the end cleanly and let the means alone.',
      },
    ],
    chapters: [
      { label: 'Chapters 1–2', href: ffa(1), gist: 'The one Lord: unconditioned consciousness as God, and the Bible\'s symbolic language introduced through the name Jehovah.' },
      { label: 'Chapters 3–4', href: ffa(3), gist: 'Noah and Jacob decoded: the secret of feeling, and how the conscious state — not outer merit — determines the objective world.' },
      { label: 'Chapters 5–6', href: ffa(5), gist: 'The six days as psychological work before the Sabbath of stillness, and the leper\'s two birds: attention off the problem, feeling onto the solution.' },
      { label: 'Chapters 7–8', href: ffa(7), gist: 'Desire as God speaking — unconditioned — and mustard-seed faith: being the state until you are sealed within it.' },
      { label: 'Chapter 9', href: ffa(9), gist: 'The immaculate conception as technique: define the desire, still the mind, and let feeling impregnate consciousness with the fulfilled state.' },
    ],
    quotes: [
      {
        text: 'HEAR, O Israel: the Lord our God is one Lord.',
        source: 'Freedom for All — Chapter 1',
        href: ffa(1),
      },
      {
        text: 'This faith of a grain of mustard seed has proved a stumbling block to man. He has been taught to believe that a grain of mustard seed signifies a small degree of faith.',
        source: 'Freedom for All — Chapter 8',
        href: ffa(8),
      },
      {
        text: '"Faith," he is told, "is the substance of things hoped for, the evidence of things not seen."',
        source: 'Freedom for All — Chapter 8',
        href: ffa(8),
      },
    ],
    relatedTechniques: [
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'SATS', href: '/techniques/sats' },
    ],
    nextRead: {
      title: 'Prayer — The Art of Believing',
      href: '/summaries/prayer-the-art-of-believing',
      why: 'From the formula to its engine room: how belief actually reaches and moves the subconscious.',
    },
    whoFor:
      'For the practitioner who wants Neville\'s symbolic method at its most compact — nine short chapters that end in an explicit, usable formula.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'prayer-the-art-of-believing',
    title: 'Prayer — The Art of Believing',
    year: 1945,
    bookHref: '/books/prayer-the-art-of-believing',
    oneLiner:
      'Prayer redefined: not petition but the art of believing what is denied by the senses — with the psychology of how it works.',
    intro: [
      'This is Neville\'s most "technical" book: prayer stripped of begging and rebuilt as applied psychology. Its foundation is the law of reversibility — if a state of consciousness produces a physical fact, then reproducing the state reproduces the fact. Feeling, deliberately assumed, runs the machine in reverse.',
      'Along the way Neville is startlingly frank about mechanism: the subconscious that accepts every felt suggestion, the rapport between minds, the reason will-power fails where belief succeeds. It reads less like devotion and more like an operator\'s manual — which is exactly what he intended prayer to be.',
    ],
    keyIdeas: [
      {
        title: 'Prayer is believing, not begging',
        detail:
          '"The art of believing what is denied by the senses": prayer succeeds when you accept the answer as already given and feel from that acceptance — pleading reaffirms the lack.',
      },
      {
        title: 'The law of reversibility',
        detail:
          'Every transformation of force is reversible. A realized state radiates a feeling; therefore an assumed feeling induces the state. This is the book\'s scientific spine.',
      },
      {
        title: 'Belief beats will',
        detail:
          'Effort is the confession of doubt: when will and imagination conflict, imagination wins. The subconscious yields to felt conviction, never to force.',
      },
      {
        title: 'Rapport and suggestion',
        detail:
          'Minds communicate below speech. The states you sustain about others reach them — which is why prayer for another is the disciplined imagining of their good as accomplished.',
      },
      {
        title: 'Define the objective',
        detail:
          'Vague prayers disperse. A clearly defined objective, felt as fulfilled in a relaxed state akin to sleep, is the whole procedure.',
      },
    ],
    chapters: [
      { label: 'Chapter 1', href: pray(1), gist: 'The foundation: faith as the essence of prayer, and the universal law of reversibility on which every claim rests.' },
      { label: 'Chapter 2', href: pray(2), gist: 'The dual nature of consciousness: prayer as the key that unlocks the subconscious — the believing half of the mind.' },
      { label: 'Chapters 3–4', href: pray(3), gist: 'Imagination, faith and rapport: why belief wins over will, and what hypnosis reveals about suggestion and the subjective mind.' },
      { label: 'Chapters 5–6', href: pray(5), gist: 'The healing word and the mental conversation: clearly defined objectives, and inner arguments replaced by happy conversations.' },
      { label: 'Chapter 7', href: pray(7), gist: 'The good servant: imagination that sees only the good, and the awakening of the healing power within.' },
    ],
    quotes: [
      {
        text: 'Prayer — the art of believing what is denied by the senses — deals almost entirely with the subconscious.',
        source: 'Prayer, The Art of Believing — Chapter 2',
        href: pray(2),
      },
      {
        text: 'The universal law of reversibility is the foundation on which its claims are based.',
        source: 'Prayer, The Art of Believing — Chapter 1',
        href: pray(1),
      },
      {
        text: 'By the law of reversibility, that all transformations of force are reversible, the energy or feeling awakened transforms itself into the state imagined.',
        source: 'Prayer, The Art of Believing — Chapter 3',
        href: pray(3),
      },
    ],
    relatedTechniques: [
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'The Mental Diet', href: '/techniques/mental-diet' },
      { title: 'Everyone Is You Pushed Out', href: '/techniques/everyone-is-you-pushed-out' },
    ],
    nextRead: {
      title: 'Seedtime and Harvest',
      href: '/summaries/seedtime-and-harvest',
      why: 'From mechanism to mastery: the mature Neville teaching the game of life through its parables.',
    },
    whoFor:
      'For the analytically minded — the reader who wants to know *why* the practice works before committing to it, and for anyone whose praying has felt like pleading.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'seedtime-and-harvest',
    title: 'Seedtime and Harvest',
    year: 1956,
    bookHref: '/books/seedtime-and-harvest',
    oneLiner:
      'The mature Neville: life as a game with fixed rules, taught through the Bible\'s parables — as you sow in imagination, you reap in experience.',
    intro: [
      'Written at the height of his powers, Seedtime and Harvest is Neville\'s book of parables: Cain and Abel, Jacob\'s ladder, water into wine — each opened as a "mystical view" of how imagining sows the states that experience harvests. The golden string of Blake\'s couplet runs through every chapter.',
      'Its center of gravity is Chapter 5\'s game of life: a game with aims and unbreakable rules, where thinking is sowing and circumstance is crop. The later chapters widen into imagining for others — the truth that an imaginal act on another\'s behalf is never lost.',
    ],
    keyIdeas: [
      {
        title: 'Sowing and reaping are mental',
        detail:
          'The seed is the imaginal act; the harvest is experience. Nothing appears in the field that was not first planted in imagination — yours or accepted from another\'s.',
      },
      {
        title: 'The game has fixed rules',
        detail:
          'Unlike men\'s games, the rules of the game of life cannot be changed or broken — as one thinks, so one is. Mastery is not bending the rules but finally playing by them consciously.',
      },
      {
        title: 'The four mighty ones',
        detail:
          'Producer, author, director, actor — the faculties of imagination staging your life. The author writes the final scene: define it, and the rest of the play reorganizes.',
      },
      {
        title: 'Abel\'s offering',
        detail:
          'Cain offers the senses — facts as they are; Abel offers imagination — things as they ought to be. The favored offering has never changed.',
      },
      {
        title: 'Imagining for another',
        detail:
          'To imagine lovingly on another\'s behalf is to touch the one imagination in all. What you plant for them, you plant in the same field you harvest from.',
      },
    ],
    chapters: [
      { label: 'Chapter 1', href: sh(1), gist: 'The golden string: the Bible\'s symbolic language, and the sleep of Adam from which imagination awakens as Christ.' },
      { label: 'Chapter 2', href: sh(2), gist: 'The four mighty ones in every man — producer, author, director, actor — and how the author writes the final scene.' },
      { label: 'Chapters 3–4', href: sh(3), gist: 'Abel\'s gift and Jacob\'s ladder: offering imagination over the senses, and the ladder of states with meaning standing above objects.' },
      { label: 'Chapters 5–6', href: sh(5), gist: 'The game of life and its fixed rules — as one thinks, so one is — and practice: assume knowing, do it over and over.' },
      { label: 'Chapters 7–8', href: sh(7), gist: 'Wise as serpents: preparing an inner place until a bridge of incidents manifests it, and the turning of water into wine.' },
      { label: 'Chapter 9', href: sh(9), gist: 'Parables as laws of mind: no intermediary between you and the power, and imagining for another as the highest use of the law.' },
    ],
    quotes: [
      {
        text: 'Life is a game and, like all games, it has its aims and its rules.',
        source: 'Seedtime and Harvest — Chapter 5',
        href: sh(5),
      },
      {
        text: 'In the game of life, the rules cannot be changed or broken. Only within the framework of its universal and everlastingly fixed rules can the game of life be played.',
        source: 'Seedtime and Harvest — Chapter 5',
        href: sh(5),
      },
      {
        text: 'I Give you the end of a golden string; Only wind it into a ball, It will lead you in at Heaven\'s gate…',
        source: 'Seedtime and Harvest — Chapter 1',
        href: sh(1),
      },
    ],
    relatedTechniques: [
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'Revision', href: '/techniques/revision' },
      { title: 'Everyone Is You Pushed Out', href: '/techniques/everyone-is-you-pushed-out' },
    ],
    nextRead: {
      title: 'The Search',
      href: '/summaries/the-search',
      why: 'After the game and its rules, the player himself: Neville\'s brief, luminous mystical memoir.',
    },
    whoFor:
      'For the practitioner past the basics — the reader who wants Neville\'s subtlest teaching on states, parables, and imagining on behalf of others.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'the-search',
    title: 'The Search',
    year: 1946,
    bookHref: '/books/the-search',
    oneLiner:
      'Neville\'s mystical memoir: the visions behind the teaching, and the discovery that we become what we contemplate.',
    intro: [
      'The shortest work in the vault is also the most personal. The Search is not instruction but testimony: the visions that shaped Neville — the Pool of Bethesda where the impotent are made whole, the shoreless ocean of liquid light, the childhood visitations of the "Greater Me" — told plainly, as evidence of what intense contemplation does.',
      'Its law is stated in one line: whatever we conceive the divine presence to be, that it is to us — and by intensity of love or hate, we become what we contemplate. The outer world does not change first; we do, and the world melts and reshapes around the transformation.',
    ],
    keyIdeas: [
      {
        title: 'Union with the state contemplated',
        detail:
          'Intense meditation brings union: absorbed in an ideal, you temporarily become it, and vision organizes itself around the assumed nature. The Bethesda vision is the pattern — perfection felt within molds perfection without.',
      },
      {
        title: 'The Greater Me is mirrored',
        detail:
          'The presence Neville met from boyhood took the shape of his conception of it — stormy sea to a fearful boy, enfolding love to a loving man. "Whatever we conceive It as being, that It is to us."',
      },
      {
        title: 'Transformation of self is the only lever',
        detail:
          'There is no way to the outer perfection we seek except through inner transformation — the world then reshapes itself "magically" in harmony with what the transformation affirms.',
      },
    ],
    chapters: [],
    chaptersNote:
      'The Search is a brief continuous text — three visions and their meaning, readable in about fifteen minutes. Read it slowly, ideally after the doctrinal books, as the experiential seal on everything they claim.',
    quotes: [
      {
        text: 'As soon as we succeed in transforming ourselves, the world will melt magically before our eyes and reshape itself in harmony with that which our transformation affirms.',
        source: 'The Search',
        href: '/books/the-search',
      },
      {
        text: 'Whatever we conceive It as being, that It is to us.',
        source: 'The Search',
        href: '/books/the-search',
      },
      {
        text: 'My mystical experiences have convinced me that there is no way to bring about the outer perfection we seek other than by the transformation of ourselves.',
        source: 'The Search',
        href: '/books/the-search',
      },
    ],
    relatedTechniques: [
      { title: 'I AM — The Foundation', href: '/techniques/i-am' },
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
    ],
    nextRead: {
      title: 'The Radio Lectures',
      href: '/summaries/radio-lectures',
      why: 'From the private visions to the public voice: the 1953 broadcasts that carried the teaching to everyone.',
    },
    whoFor:
      'For the reader who wants to know what Neville actually experienced — fifteen minutes that recolor every book he wrote.',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'radio-lectures',
    title: 'The Radio Lectures',
    year: 1953,
    bookHref: '/lectures/radio-lectures',
    oneLiner:
      'The teaching for everyone: Neville\'s broadcast talks — short, direct, and complete, each one a whole sermon on the law.',
    intro: [
      'In these radio broadcasts Neville had minutes, not evenings — and it shows in the best way. Each talk states the whole law in miniature, in language meant for a listener who might never hear him again: assume the feeling of the wish fulfilled, for to desire a state is to have it.',
      'Because each lecture is self-contained, the series works as both an introduction and a refresher: pick any title and you get the essentials — assumption, feeling, meditation, answered prayer — delivered at conversational speed. Together they are the closest thing the vault has to Neville\'s elevator course.',
    ],
    keyIdeas: [
      {
        title: 'The assumptive world',
        detail:
          '"What you see when you look at something depends not so much on what is there as on the assumption you make when you look." The world you fight and the world you enjoy are both assumption made visible.',
      },
      {
        title: 'To desire a state is to have it',
        detail:
          'Desire is not distance but evidence: the spiritual man speaks to the natural man through desire, and immediate obedience to that voice — assuming the wish fulfilled — closes the gap.',
      },
      {
        title: 'The check of mental conversations',
        detail:
          'You know your assumption has taken when your inner conversations with people change by themselves. The mental world is the honest one; watch it for your true state.',
      },
      {
        title: 'Meditation as controlled waking dream',
        detail:
          'The relaxed state akin to sleep, attention fixed on the fulfilled scene until it has sensory vividness — the radio talks describe the practice with unusual precision.',
      },
    ],
    chapters: [
      { label: 'The Law of Assumption', href: '/lectures/radio-lectures/the-law-of-assumption', gist: 'The cornerstone talk: the assumptive world, the state akin to sleep, and the check of mental conversations.' },
      { label: 'Feeling Is The Secret', href: '/lectures/radio-lectures/feeling-is-the-secret', gist: 'The book\'s thesis in broadcast form: feeling as the one language the deeper mind obeys.' },
      { label: 'Meditation', href: '/lectures/radio-lectures/meditation', gist: 'The practice itself: the controlled waking dream and how to hold attention within it.' },
      { label: 'Answered Prayer', href: '/lectures/radio-lectures/answered-prayer', gist: 'Prayer that is thanksgiving for the already-received, and why pleading postpones.' },
      { label: 'By Imagination We Become', href: '/lectures/radio-lectures/by-imagination-we-become', gist: 'Imagination as the transforming power — we become what we sustain in it.' },
      { label: 'Be What You Wish; Be What You Believe', href: '/lectures/radio-lectures/be-what-you-wish-be-what-you-believe', gist: 'Being over wanting: belief assumed now versus hope deferred.' },
      { label: 'Affirm The Reality of our Own Greatness', href: '/lectures/radio-lectures/affirm-the-reality-of-our-own-greatness', gist: 'Self-valuation as practice: the greatness affirmed inwardly before it is met outwardly.' },
      { label: 'Stone, Water or Wine', href: '/lectures/radio-lectures/stone-water-or-wine', gist: 'The Bible\'s transformations as levels of understanding — literal stone to psychological water to lived wine.' },
      { label: 'Truth', href: '/lectures/radio-lectures/truth', gist: 'Truth as what consciousness makes true — the responsibility hidden inside the freedom.' },
    ],
    quotes: [
      {
        text: 'What you see when you look at something depends not so much on what is there as on the Assumption you make when you look.',
        source: 'Radio Lecture: The Law of Assumption',
        href: '/lectures/radio-lectures/the-law-of-assumption',
      },
      {
        text: 'To desire a state is to have it. As Pascal said, "You would not have sought me had you not already found me."',
        source: 'Radio Lecture: The Law of Assumption',
        href: '/lectures/radio-lectures/the-law-of-assumption',
      },
      {
        text: 'Define your highest ideal and concentrate your attention upon this ideal until you identify yourself with it. Assume the feeling of being it – the feeling that would be yours were you now embodying it in your world.',
        source: 'Radio Lecture: The Law of Assumption',
        href: '/lectures/radio-lectures/the-law-of-assumption',
      },
    ],
    relatedTechniques: [
      { title: 'Living in the End', href: '/techniques/living-in-the-end' },
      { title: 'SATS', href: '/techniques/sats' },
      { title: 'The Mental Diet', href: '/techniques/mental-diet' },
    ],
    nextRead: {
      title: 'Start Here — the 21-day path',
      href: '/start-here',
      why: 'You\'ve met the whole teaching in miniature; the guided path turns it into three weeks of practice.',
    },
    whoFor:
      'For the newcomer with twenty minutes, and for the seasoned student who wants the whole law restated in one sitting — these talks serve both.',
  },
];

export function getBookSummaryBySlug(slug: string): BookSummary | undefined {
  return BOOK_SUMMARIES.find(b => b.slug === slug);
}
