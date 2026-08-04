import type { Metadata } from 'next';
import RandomRedirect from './RandomRedirect';

export const metadata: Metadata = {
  title: 'Random Lecture',
  description: 'Discover a randomly selected lecture from the Neville Goddard vault.',
  robots: { index: false },
};

export default function RandomPage() {
  return <RandomRedirect />;
}
