import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE_NAME, SITE_URL, withBasePath } from '@/lib/config';
import styles from './page.module.css';

const discordInvite = 'https://discord.gg/kDQ26WJHBS';
const description = 'A growing circle of Neville Goddard practitioners with a shared vision: changing reality for the better through collective imaginal practice.';

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
          <p className={styles.subtitle}>Imagine together. For the good of humanity.</p>
        </div>
      </header>

      <p className={styles.lead}>
        Our vision is a vast circle of people united in purpose, applying Neville
        Goddard&apos;s teachings to change reality for the better. We aspire to a
        worldwide conclave of committed practitioners who direct their imagination
        toward the well-being and progress of humanity.
      </p>
      <p>
        At the heart of this vision is our belief that imagination shapes reality,
        and that the occult laws of the universe can be consciously applied in
        service of others. We seek tangible change: lives improved, communities
        flourishing, and a more peaceful and generous world. This is the future
        we want to help bring into being through a sustained, shared practice.
      </p>
      <p>
        The purpose is practice. Members arrive with a working understanding of SATS,
        an imaginal scene that implies fulfillment, and the feeling of the wish fulfilled.
        We welcome growth while keeping that commitment focused: one shared intention
        at a time, with everyone taking part. Discord is where we organize the work,
        with no general discussion feed or introductory course.
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
          Follow the Discord link and complete the application about your practice,
          motivation and availability. Moderators review each application before
          granting access to the server. Once approved, read <strong>#start-here</strong>
          and join the shared practice in <strong>#current-cycle</strong>.
        </p>
        <a className={styles.button} href={discordInvite}>Apply to join on Discord <span aria-hidden="true">↗</span></a>
        <p className={styles.note}>A Discord account is required. Server content remains unavailable while your application is pending.</p>
      </section>
    </article>
  );
}
