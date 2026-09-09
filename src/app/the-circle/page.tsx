import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE_NAME, SITE_URL, withBasePath } from '@/lib/config';
import styles from './page.module.css';

const discordInvite = 'https://discord.gg/kDQ26WJHBS';
const description = 'A small Neville Goddard practice group on Discord. One shared intention per cycle, with members committed to imagining for others.';

export const metadata: Metadata = {
  title: 'The Circle — Imagine Together',
  description,
  alternates: { canonical: `${SITE_URL}/the-circle/` },
  openGraph: {
    title: 'The Circle — Imagine Together',
    description,
    url: `${SITE_URL}/the-circle/`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function TheCirclePage() {
  return (
    <article className={`glass ${styles.page}`}>
      <header className={styles.header}>
        <Image src={withBasePath('/images/the-circle.png')} alt="" width={88} height={88} className={styles.icon} />
        <div>
          <p className={styles.eyebrow}>A shared imaginal practice</p>
          <h1>The Circle</h1>
          <p className={styles.subtitle}>One intention at a time. Everyone taking part.</p>
        </div>
      </header>

      <p className={styles.lead}>
        The Circle brings together people who already believe in Neville Goddard&apos;s
        teachings and want to apply them together. We meet on Discord to commit to a
        shared practice: imagining the fulfillment of one chosen desire, including
        when it benefits someone other than ourselves.
      </p>
      <p>
        The purpose is practice. Members arrive with a working understanding of SATS,
        an imaginal scene that implies fulfillment, and the feeling of the wish fulfilled.
        The group stays small and focused, with no general discussion feed or introductory course.
      </p>

      <section aria-labelledby="how-it-works">
        <h2 id="how-it-works">How we practice together</h2>
        <ol className={styles.steps}>
          <li><strong>One intention is chosen.</strong> Members propose desires, and the
            moderators decide which enter the rotation. Each cycle has one clear outcome
            and a short suggested scene implying that it has already happened.</li>
          <li><strong>Everyone practices with that outcome.</strong> Our starting rhythm is
            seven days, with a short daily session at a time that suits each member.
            Use SATS or your established imaginal practice. You may adapt the sensory
            details while keeping the shared outcome unchanged.</li>
          <li><strong>We close the cycle and begin the next.</strong> Brief updates stay
            with the original cycle. Seven days defines our practice schedule, not a
            deadline for events to happen.</li>
        </ol>
      </section>

      <section className={styles.commitment} aria-labelledby="commitment">
        <h2 id="commitment">Join to contribute</h2>
        <p>
          The essential commitment is simple: take part even when the chosen intention
          has nothing to do with you. A personal need can be proposed, but membership
          never guarantees that your desire will be selected.
        </p>
        <p>
          New members participate in one full cycle before submitting a proposal for
          consideration. Moderators review proposals for clarity, benefit and fit with
          the group&apos;s purpose; selection is not a popularity vote.
        </p>
      </section>

      <section aria-labelledby="shared-understanding">
        <h2 id="shared-understanding">Our shared understanding</h2>
        <ul className={styles.boundaries}>
          <li>Bring an existing practice and a willingness to sustain it. The Circle
            is for people ready to apply the teachings, rather than looking for others
            to build their belief or fulfill a request on their behalf.</li>
          <li>Specific-person romantic requests, attempts to separate couples, revenge
            and harmful intentions are outside the group&apos;s scope.</li>
          <li>Participation is free. There are no coaching offers, sales or promises of results.</li>
          <li>Respect privacy, describe observed outcomes honestly, and never blame a
            member for an absence, a doubt or an outcome.</li>
        </ul>
      </section>

      <section className={styles.join} aria-labelledby="join-the-circle">
        <h2 id="join-the-circle">Take your place in the Circle</h2>
        <p>
          Open the Discord server, read <strong>#start-here</strong>, then answer the
          three questions in <strong>#join</strong> about your practice, motivation and
          availability. A moderator will review your introduction before admitting you
          to the practice channels.
        </p>
        <a className={styles.button} href={discordInvite}>Apply to join on Discord <span aria-hidden="true">↗</span></a>
        <p className={styles.note}>A Discord account is required. Opening the server begins your application; it does not automatically admit you to the practice group.</p>
      </section>
    </article>
  );
}
