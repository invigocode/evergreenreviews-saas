export type AuditQuestion = {
  id: string;
  question: string;
  options: { label: string; points: number }[];
};

export const auditQuestions: AuditQuestion[] = [
  {
    id: "reviewCount",
    question: "About how many Google reviews do you have today?",
    options: [
      { label: "0–10", points: 5 },
      { label: "11–50", points: 12 },
      { label: "51–150", points: 19 },
      { label: "150+", points: 25 },
    ],
  },
  {
    id: "rating",
    question: "What's your current average rating?",
    options: [
      { label: "Under 3.5★", points: 5 },
      { label: "3.5–4.0★", points: 12 },
      { label: "4.0–4.5★", points: 18 },
      { label: "4.5–5.0★", points: 25 },
      { label: "Not sure", points: 10 },
    ],
  },
  {
    id: "askMethod",
    question: "How do you currently ask customers for reviews?",
    options: [
      { label: "We don't really ask", points: 0 },
      { label: "Occasionally, in person", points: 8 },
      { label: "Sometimes by text or email", points: 16 },
      { label: "We have a consistent system", points: 25 },
    ],
  },
  {
    id: "responding",
    question: "How do you handle responding to reviews?",
    options: [
      { label: "We don't respond", points: 0 },
      { label: "Only to negative ones", points: 10 },
      { label: "Sometimes", points: 18 },
      { label: "We respond to most reviews", points: 25 },
    ],
  },
];

export const auditTips: Record<string, { threshold: number; tip: string; strength: string }> = {
  reviewCount: {
    threshold: 15,
    tip: "Your review count is still building. That's normal early on — the fastest fix is asking consistently, not waiting for reviews to happen on their own.",
    strength: "You've already built up a solid base of reviews — that's real social proof working for you.",
  },
  rating: {
    threshold: 15,
    tip: "There's room to lift your average rating. That usually comes from two things: fixing the service issues behind the lower scores, and making it easy for your happiest customers to balance things out.",
    strength: "Your rating is strong — that's the hardest part to get right, and you're already there.",
  },
  askMethod: {
    threshold: 15,
    tip: "Not having a consistent way to ask is usually the single biggest lever you're not pulling yet. A simple, well-timed request turns happy customers you already have into reviews you don't have yet.",
    strength: "You already ask consistently — that's the habit most businesses never build.",
  },
  responding: {
    threshold: 15,
    tip: "Responding to reviews — especially the critical ones — shows future customers you're paying attention, and it's one of the fastest trust signals you can send.",
    strength: "You're staying on top of responses — that consistency builds trust with everyone reading your profile.",
  },
};

export function scoreBand(score: number) {
  if (score >= 80) return { headline: "Strong foundation", description: "You're doing many of the right things already." };
  if (score >= 55) return { headline: "Good start, clear room to grow", description: "The basics are there — a few changes will compound quickly." };
  if (score >= 30) return { headline: "Real opportunity here", description: "A handful of simple changes could meaningfully shift your trajectory." };
  return { headline: "You're just getting started", description: "Everyone starts here — the good news is small, consistent changes go a long way." };
}
