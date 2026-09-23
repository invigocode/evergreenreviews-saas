import type {
  Business,
  Campaign,
  ChecklistItem,
  Customer,
  DailyMetric,
  Review,
  ReviewRequest,
} from "@/lib/types";

// Deterministic pseudo-random generator so demo numbers are stable across renders.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);

function daysAgo(n: number) {
  const d = new Date();
  d.setHours(9, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const business: Business = {
  name: "Oak & Stone Property Services",
  category: "Home & Property Maintenance",
  website: "oakandstoneservices.com",
  phone: "(503) 555-0148",
  address: "1420 Evergreen Terrace, Portland, OR 97214",
  employeeCount: "12–20 employees",
  googleReviewUrl: "https://g.page/r/oak-and-stone-demo/review",
  googlePlaceConnected: true,
  timezone: "America/Los_Angeles",
};

export const DEMO_MODE = true;

export const businessHours = [
  { day: "Monday", hours: "7:00 AM – 5:00 PM" },
  { day: "Tuesday", hours: "7:00 AM – 5:00 PM" },
  { day: "Wednesday", hours: "7:00 AM – 5:00 PM" },
  { day: "Thursday", hours: "7:00 AM – 5:00 PM" },
  { day: "Friday", hours: "7:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

const reviewSeed: Array<{
  name: string;
  rating: Review["rating"];
  text: string;
  daysAgo: number;
  responded: boolean;
  responseText?: string;
  service?: string;
}> = [
  {
    name: "Priya Nair",
    rating: 5,
    text: "The crew replaced our gutters and cleaned up better than they found it. Communication was excellent the whole way through — they texted photos before and after. Would recommend to anyone in the neighborhood.",
    daysAgo: 1,
    responded: true,
    responseText:
      "Thank you, Priya! We're so glad the gutter replacement went smoothly and that you appreciated the before/after photos — that's something we try to do on every job. Enjoy the new gutters!",
    service: "Gutter replacement",
  },
  {
    name: "Marcus Chen",
    rating: 5,
    text: "Second time using Oak & Stone, this time for a deck rebuild. On time, tidy, and the finished deck looks fantastic. Fair pricing too.",
    daysAgo: 3,
    responded: true,
    responseText:
      "Thanks for trusting us with a second project, Marcus! Really glad the deck turned out the way you pictured it. See you next time.",
    service: "Deck rebuild",
  },
  {
    name: "Danielle Ortiz",
    rating: 4,
    text: "Good work overall on the fence repair. Took a day longer than quoted because of a supply delay, but the team kept me updated and the end result is solid.",
    daysAgo: 4,
    responded: true,
    responseText:
      "Thanks for the patience on the timing, Danielle — that supply delay was outside our control but we should have flagged it sooner. Glad the fence is holding up well!",
    service: "Fence repair",
  },
  {
    name: "Robert Hail",
    rating: 2,
    text: "Work quality was fine but scheduling was frustrating — had to reschedule twice on their end and nobody called to confirm the final date until the morning of.",
    daysAgo: 5,
    responded: false,
    service: "Pressure washing",
  },
  {
    name: "Sarah Whitfield",
    rating: 5,
    text: "Booked a same-week estimate for roof repair after a storm and they were incredibly responsive. The technician explained everything clearly before starting.",
    daysAgo: 6,
    responded: true,
    responseText:
      "So glad we could get to you quickly after the storm, Sarah! Clear communication is something the whole team takes seriously — thank you for the kind words.",
    service: "Roof repair",
  },
  {
    name: "James Okafor",
    rating: 5,
    text: "Professional from the first phone call to the final walkthrough. Landscaping crew transformed our front yard.",
    daysAgo: 8,
    responded: true,
    responseText: "Thank you, James! It was a fun project to work on — enjoy the new front yard through the seasons.",
    service: "Landscaping",
  },
  {
    name: "Emily Sorensen",
    rating: 1,
    text: "Disappointed with the follow-up after the job. Small leak reappeared two weeks later and it's been hard to get someone back out to look at it.",
    daysAgo: 9,
    responded: false,
    service: "Roof repair",
  },
  {
    name: "Tom Delacroix",
    rating: 5,
    text: "Fair, honest quote and they stuck to it. No surprise add-ons at the end like we've had with other contractors.",
    daysAgo: 10,
    responded: true,
    responseText: "We believe quotes should mean something, Tom — thanks for noticing and for the review!",
    service: "General maintenance",
  },
  {
    name: "Aisha Rahman",
    rating: 5,
    text: "Our property manager recommended Oak & Stone for a multi-unit gutter clean and they handled scheduling across all six units without a hitch.",
    daysAgo: 12,
    responded: true,
    responseText: "Thanks Aisha — coordinating across units can be tricky and we appreciate you noticing the effort!",
    service: "Gutter cleaning",
  },
  {
    name: "Nate Fischer",
    rating: 4,
    text: "Solid work on our retaining wall. Crew was friendly. Only knock is the initial quote turnaround took about a week.",
    daysAgo: 13,
    responded: false,
    service: "Retaining wall",
  },
  {
    name: "Grace Lindqvist",
    rating: 5,
    text: "They power washed our driveway and walkway and it honestly looks brand new. Booking online was easy too.",
    daysAgo: 15,
    responded: true,
    responseText: "That's great to hear, Grace! Glad the online booking made things easy on your end too.",
    service: "Pressure washing",
  },
  {
    name: "Victor Reyes",
    rating: 5,
    text: "Called about a small plumbing fix under a property maintenance contract and they had someone out the same afternoon.",
    daysAgo: 17,
    responded: true,
    responseText: "Glad we could turn that around quickly, Victor — thanks for being a long-time customer!",
    service: "General maintenance",
  },
  {
    name: "Lena Kowalski",
    rating: 3,
    text: "Job itself was fine but pricing felt a bit higher than the estimate we discussed on the phone. Would have liked that clarified upfront.",
    daysAgo: 19,
    responded: true,
    responseText:
      "Thanks for the honest feedback, Lena — we want our phone estimates and final invoices to match and will use this to tighten that up. Feel free to reach out directly if you'd like us to review the invoice with you.",
    service: "Fence repair",
  },
  {
    name: "Oliver Bennett",
    rating: 5,
    text: "Best contractor experience I've had in Portland. Everything from the quote to cleanup was smooth.",
    daysAgo: 21,
    responded: true,
    responseText: "That means a lot, Oliver — thank you for taking the time to write this!",
    service: "Deck rebuild",
  },
  {
    name: "Fatima Al-Sayed",
    rating: 5,
    text: "They handled our HOA's common area landscaping refresh. Great communication with the board throughout.",
    daysAgo: 24,
    responded: true,
    responseText: "Thank you, Fatima — working with the board was a pleasure and the common areas look great!",
    service: "Landscaping",
  },
  {
    name: "Derek Palmer",
    rating: 2,
    text: "Crew left some debris in the side yard after the fence job that we had to clean up ourselves.",
    daysAgo: 27,
    responded: false,
    service: "Fence repair",
  },
  {
    name: "Hannah Voss",
    rating: 5,
    text: "Roof inspection was thorough and they didn't try to upsell us on repairs we didn't need — actually told us it could wait a year.",
    daysAgo: 30,
    responded: true,
    responseText: "That kind of honesty is exactly what we aim for, Hannah. Thanks for trusting us with the inspection!",
    service: "Roof repair",
  },
  {
    name: "Chris Anand",
    rating: 5,
    text: "Great experience getting our gutters replaced before the rainy season. On budget, on time.",
    daysAgo: 34,
    responded: true,
    responseText: "Perfect timing before the rains, Chris — glad it all came together smoothly!",
    service: "Gutter replacement",
  },
  {
    name: "Maria Gonzalez",
    rating: 4,
    text: "Nice work on the retaining wall. Would have appreciated a bit more notice before the crew arrived.",
    daysAgo: 38,
    responded: false,
    service: "Retaining wall",
  },
  {
    name: "Ben Whitaker",
    rating: 5,
    text: "We use Oak & Stone for all our rental property upkeep now. Reliable and easy to reach.",
    daysAgo: 42,
    responded: true,
    responseText: "Thanks for making us part of your rental upkeep routine, Ben — we appreciate the trust!",
    service: "General maintenance",
  },
  {
    name: "Sophie Renner",
    rating: 5,
    text: "Loved the landscaping redesign for our front bed. They worked with our budget and still delivered a great look.",
    daysAgo: 47,
    responded: true,
    responseText: "So glad it worked within budget and still hit the mark, Sophie — enjoy the new beds!",
    service: "Landscaping",
  },
  {
    name: "Andre Dubois",
    rating: 5,
    text: "Quick response to a storm-damage roof claim, and they worked directly with our insurance adjuster which saved us a lot of hassle.",
    daysAgo: 53,
    responded: true,
    responseText: "Glad we could take some of the insurance hassle off your plate, Andre. Thanks for the review!",
    service: "Roof repair",
  },
  {
    name: "Katie Boone",
    rating: 5,
    text: "Driveway pressure wash looks incredible. Booked, paid, and scheduled entirely online which was refreshing.",
    daysAgo: 61,
    responded: true,
    responseText: "Thanks Katie! Always trying to make the booking side as painless as the work itself.",
    service: "Pressure washing",
  },
];

export const reviews: Review[] = reviewSeed.map((r, i) => {
  const sentiment: Review["sentiment"] = r.rating >= 4 ? "positive" : r.rating === 3 ? "neutral" : "negative";
  return {
    id: `rev_${i + 1}`,
    reviewerName: r.name,
    rating: r.rating,
    text: r.text,
    date: daysAgo(r.daysAgo),
    source: "google",
    responded: r.responded,
    responseText: r.responseText,
    responseDate: r.responded ? daysAgo(Math.max(r.daysAgo - 1, 0)) : undefined,
    needsAttention: !r.responded && r.rating <= 3,
    sentiment,
    service: r.service,
  };
});

export const TOTAL_GOOGLE_REVIEWS = 247;
export const AVERAGE_RATING = 4.8;

export const ratingDistribution = {
  5: 189,
  4: 38,
  3: 12,
  2: 5,
  1: 3,
};

// ---------------------------------------------------------------------------
// Customers
// ---------------------------------------------------------------------------

const firstNames = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Cameron",
  "Drew", "Avery", "Reese", "Quinn", "Rowan", "Blair", "Skyler", "Elliot",
  "Harper", "Finley", "Dakota", "Emerson",
];
const lastNames = [
  "Bennett", "Holloway", "Marsh", "Doyle", "Pierce", "Sutton", "Winters",
  "Lang", "Osei", "Ferraro", "Novak", "Brandt", "Castillo", "Whitmore",
  "Hoang", "Larkin", "Fontaine", "Mackey", "Schaefer", "Delgado",
];
const services = [
  "Gutter cleaning", "Roof repair", "Deck rebuild", "Fence repair",
  "Pressure washing", "Landscaping", "Retaining wall", "General maintenance",
];

function seededName(i: number) {
  return `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`;
}

export const customers: Customer[] = Array.from({ length: 42 }).map((_, i) => {
  const serviceDaysAgo = 2 + Math.floor(rand() * 70);
  const hasRequest = rand() > 0.15;
  const requestDaysAgo = hasRequest ? Math.max(serviceDaysAgo - 1 - Math.floor(rand() * 2), 0) : undefined;
  const completed = hasRequest && rand() > 0.55;
  const name = seededName(i);
  return {
    id: `cust_${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
    phone: `(503) 555-0${(100 + i).toString().slice(-3)}`,
    service: services[i % services.length],
    serviceDate: daysAgo(serviceDaysAgo),
    lastRequestDate: requestDaysAgo !== undefined ? daysAgo(requestDaysAgo) : undefined,
    campaignName: hasRequest ? ["Post-Service Follow-up", "Seasonal Roof Check-in", "Landscaping Refresh"][i % 3] : undefined,
    requestStatus: !hasRequest ? "not_sent" : completed ? "completed" : rand() > 0.5 ? "sent" : "no_response",
    consent: rand() > 0.06,
  };
});

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const campaigns: Campaign[] = [
  {
    id: "camp_1",
    name: "Post-Service Follow-up",
    status: "active",
    channel: "sms",
    audience: "All completed jobs",
    createdDate: daysAgo(96),
    timing: "delayed",
    delayHours: 24,
    messageTemplate:
      "Hi [Customer Name], thank you again for choosing Oak & Stone Property Services. We hope you're happy with the [Service] we completed. If you have a moment, we'd really appreciate hearing about your experience — it helps other homeowners know what to expect from us.\n\nYou can share your experience here: [Review Link]\n\nThank you for your support.\n– Oak & Stone Property Services",
    requestsSent: 118,
    clicks: 71,
    completions: 46,
  },
  {
    id: "camp_2",
    name: "Seasonal Roof Check-in",
    status: "active",
    channel: "email",
    audience: "Roof repair customers, last 6 months",
    createdDate: daysAgo(60),
    timing: "scheduled",
    messageTemplate:
      "Hi [Customer Name],\n\nIt's been a little while since we worked on your roof. We hope everything has held up well through the recent weather.\n\nIf you were happy with the work, would you mind sharing a quick review? It genuinely helps other homeowners find us.\n\n[Review Link]\n\nThanks for being a customer,\n[Business Name]",
    requestsSent: 34,
    clicks: 19,
    completions: 11,
  },
  {
    id: "camp_3",
    name: "Landscaping Refresh",
    status: "paused",
    channel: "email",
    audience: "Landscaping customers, spring 2026",
    createdDate: daysAgo(140),
    timing: "manual",
    messageTemplate:
      "Hi [Customer Name],\n\nThanks for trusting us with your landscaping refresh this spring! If you have two minutes, we'd love to hear how it turned out for you.\n\n[Review Link]\n\nWarmly,\n[Business Name]",
    requestsSent: 27,
    clicks: 14,
    completions: 9,
  },
  {
    id: "camp_4",
    name: "QR Card — Front Desk",
    status: "active",
    channel: "qr",
    audience: "Walk-in & on-site customers",
    createdDate: daysAgo(180),
    timing: "manual",
    messageTemplate:
      "Scan to share your experience with Oak & Stone Property Services — it only takes a minute and means a lot to our small team.",
    requestsSent: 0,
    clicks: 38,
    completions: 21,
  },
  {
    id: "camp_5",
    name: "New Client Welcome + Review Ask",
    status: "draft",
    channel: "whatsapp",
    audience: "First-time customers",
    createdDate: daysAgo(4),
    timing: "delayed",
    delayHours: 48,
    messageTemplate:
      "Hi [Customer Name], thanks for choosing [Business Name] for your first project with us! We hope the [Service] met your expectations. A quick review would mean a lot: [Review Link]",
    requestsSent: 0,
    clicks: 0,
    completions: 0,
  },
];

// ---------------------------------------------------------------------------
// Review requests
// ---------------------------------------------------------------------------

const statusPool: Array<{ status: ReviewRequest["status"]; clicked: boolean; completed: boolean }> = [
  { status: "completed", clicked: true, completed: true },
  { status: "clicked", clicked: true, completed: false },
  { status: "delivered", clicked: false, completed: false },
  { status: "sent", clicked: false, completed: false },
  { status: "failed", clicked: false, completed: false },
  { status: "scheduled", clicked: false, completed: false },
];

export const reviewRequests: ReviewRequest[] = Array.from({ length: 58 }).map((_, i) => {
  const customer = customers[i % customers.length];
  const outcome = statusPool[Math.floor(rand() * (rand() > 0.15 ? 4 : statusPool.length))];
  const campaign = campaigns[i % 3];
  const methodMap: ReviewRequest["method"][] = ["sms", "email", "whatsapp", "manual", "qr", "link"];
  return {
    id: `req_${i + 1}`,
    customerId: customer.id,
    customerName: customer.name,
    dateRequested: daysAgo(1 + Math.floor(rand() * 90)),
    method: campaign.channel === "qr" ? "qr" : methodMap[i % 3],
    status: outcome.status,
    campaignId: campaign.id,
    campaignName: campaign.name,
    clicked: outcome.clicked,
    completed: outcome.completed,
  };
});

// ---------------------------------------------------------------------------
// Daily time series (12 months)
// ---------------------------------------------------------------------------

export const dailySeries: DailyMetric[] = (() => {
  const days = 365;
  const series: DailyMetric[] = [];
  let totalReviews = TOTAL_GOOGLE_REVIEWS - 210; // reviews the business had 12 months ago
  let ratingAccumulator = 4.6;

  for (let i = days; i >= 0; i--) {
    const date = daysAgo(i);
    const dow = new Date(date).getDay();
    const isWeekday = dow >= 1 && dow <= 5;
    const growthPressure = 1 - i / days; // ramps up activity as we approach "today"

    const requestsSent = Math.max(
      0,
      Math.round((isWeekday ? 3 : 1) * (0.6 + growthPressure) + rand() * 3 - 1)
    );
    const reviewChance = 0.34 + growthPressure * 0.22;
    const newReviews = rand() < reviewChance ? (rand() > 0.85 ? 2 : 1) : 0;

    totalReviews += newReviews;
    ratingAccumulator += (rand() - 0.48) * 0.01;
    ratingAccumulator = Math.min(4.9, Math.max(4.55, ratingAccumulator));

    series.push({
      date,
      totalReviews: Math.min(totalReviews, TOTAL_GOOGLE_REVIEWS),
      newReviews,
      requestsSent,
      avgRating: Math.round(ratingAccumulator * 10) / 10,
    });
  }

  // Force the final value to match the canonical totals exactly.
  series[series.length - 1].totalReviews = TOTAL_GOOGLE_REVIEWS;
  series[series.length - 1].avgRating = AVERAGE_RATING;
  return series;
})();

// ---------------------------------------------------------------------------
// Milestones, checklist, momentum
// ---------------------------------------------------------------------------

export const MILESTONES = [10, 25, 50, 100, 250, 500];

export function getNextMilestone(total = TOTAL_GOOGLE_REVIEWS) {
  const next = MILESTONES.find((m) => m > total);
  const previous = [...MILESTONES].reverse().find((m) => m <= total) ?? 0;
  return { next: next ?? null, previous, total };
}

export const weeklyChecklist: ChecklistItem[] = [
  { id: "chk_1", label: "Review-request system created", done: true },
  { id: "chk_2", label: "Google review link configured", done: true },
  {
    id: "chk_3",
    label: "Send this week's review requests",
    done: false,
    helpText: "6 completed jobs from this week don't have a request sent yet.",
  },
  {
    id: "chk_4",
    label: "Respond to outstanding reviews",
    done: false,
    helpText: "4 reviews are waiting on a response, including 2 that may need attention.",
  },
  { id: "chk_5", label: "Review your campaign performance", done: false },
];

export const gbpChecklist: ChecklistItem[] = [
  { id: "gbp_1", label: "Business information added", done: true },
  { id: "gbp_2", label: "Review link configured", done: true },
  { id: "gbp_3", label: "Business category selected", done: true },
  { id: "gbp_4", label: "Description reviewed", done: false, helpText: "Last updated 8 months ago." },
  { id: "gbp_5", label: "Photos added", done: true },
  { id: "gbp_6", label: "Services added", done: false, helpText: "3 of 8 services are listed." },
  { id: "gbp_7", label: "Opening hours checked", done: false, helpText: "Holiday hours haven't been confirmed." },
];

export const AVG_RESPONSE_TIME_HOURS = 14;

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function activityByWeekday() {
  const totals = weekdayLabels.map((label) => ({ label, requestsSent: 0, newReviews: 0 }));
  for (const day of dailySeries.slice(-90)) {
    const dow = new Date(day.date).getDay();
    totals[dow].requestsSent += day.requestsSent;
    totals[dow].newReviews += day.newReviews;
  }
  // Reorder Mon–Sun for a more natural business week view.
  return [...totals.slice(1), totals[0]];
}

export function getMomentum() {
  const last30 = dailySeries.slice(-30).reduce((sum, d) => sum + d.newReviews, 0);
  const prior30 = dailySeries.slice(-60, -30).reduce((sum, d) => sum + d.newReviews, 0);
  const requestsLast14 = dailySeries.slice(-14).reduce((sum, d) => sum + d.requestsSent, 0);

  if (last30 >= prior30 * 1.15 && requestsLast14 > 10) {
    return {
      level: "strong" as const,
      headline: "Your review activity is gaining momentum.",
      detail: `You've received ${last30} new reviews in the last 30 days, up from ${prior30} in the previous 30 — and requests have stayed consistent.`,
    };
  }
  if (last30 > 0) {
    return {
      level: "steady" as const,
      headline: "Your reputation is growing steadily.",
      detail: `${last30} new reviews came in over the last 30 days. Keep review requests consistent to build on this.`,
    };
  }
  return {
    level: "starting" as const,
    headline: "Your growth story starts here.",
    detail: "Once review requests start going out consistently, you'll see momentum build here.",
  };
}
