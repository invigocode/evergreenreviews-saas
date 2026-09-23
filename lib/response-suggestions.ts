import { business } from "@/lib/demo-data";
import type { Review } from "@/lib/types";

const firstName = (name: string) => name.split(" ")[0];

// A lightweight, template-driven stand-in for an AI response suggestion.
// Clearly labelled as AI-assisted in the UI — always requires owner review before use.
export function generateSuggestion(review: Review): string {
  const name = firstName(review.reviewerName);
  const service = review.service?.toLowerCase();

  if (review.rating >= 4) {
    return [
      `Thank you, ${name} — we really appreciate you taking the time to share this.`,
      service
        ? `It means a lot to know the ${service} experience lived up to expectations.`
        : `It means a lot to hear the work lived up to expectations.`,
      `Our team works hard to get the details right, and feedback like yours helps us keep raising the bar.`,
      `Looking forward to working with you again.\n— ${business.name}`,
    ].join(" ");
  }

  if (review.rating === 3) {
    return [
      `Hi ${name}, thank you for the honest feedback.`,
      `It sounds like parts of the experience worked well, but we clearly didn't get everything right, and we'd like to understand more.`,
      `If you're open to it, please reach out directly so we can make this right — we take feedback like this seriously.\n— ${business.name}`,
    ].join(" ");
  }

  return [
    `Hi ${name}, thank you for sharing this — we're sorry to hear the experience didn't meet expectations.`,
    `This isn't the standard we aim for, and we'd like the chance to understand what happened and make it right.`,
    `Please reach out to us directly when you have a moment so we can follow up properly.\n— ${business.name}`,
  ].join(" ");
}

export const responseGuidance = {
  positive: [
    "Thank the customer by name and mention something specific if you can.",
    "Invite them back — it reinforces the relationship.",
  ],
  neutral: [
    "Acknowledge the parts that fell short without getting defensive.",
    "Offer a private way to follow up.",
  ],
  negative: [
    "Acknowledge the concern calmly — don't argue the details publicly.",
    "Never share private customer information in a public reply.",
    "Invite them to continue the conversation privately.",
    "Avoid admitting fault or liability in specific, actionable terms.",
    "Never offer an incentive in exchange for changing or removing a review.",
  ],
};
