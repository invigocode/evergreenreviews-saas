export type IndustryTemplate = { id: string; label: string; template: string };

export const industryTemplates: IndustryTemplate[] = [
  {
    id: "general",
    label: "General service business",
    template:
      "Hi [Customer Name],\n\nThank you again for choosing [Business Name]. We hope you're happy with the [Service] we completed for you.\n\nIf you have a moment, we'd really appreciate hearing about your experience. Your feedback helps other customers understand what they can expect from us.\n\nYou can share your experience here:\n[Review Link]\n\nThank you for your support.\n[Business Name]",
  },
  {
    id: "roofer",
    label: "Roofers",
    template:
      "Hi [Customer Name],\n\nThanks for trusting [Business Name] with your roof. We hope it's giving you peace of mind, especially through the next storm season.\n\nIf you have two minutes, a quick review would really help other homeowners find a roofer they can trust:\n[Review Link]\n\nThanks again,\n[Business Name]",
  },
  {
    id: "plumber",
    label: "Plumbers",
    template:
      "Hi [Customer Name],\n\nThanks for calling [Business Name] for your [Service]. We hope everything is running smoothly now.\n\nIf you were happy with the visit, a short review would mean a lot and helps neighbors know who to call in a plumbing emergency:\n[Review Link]\n\nThank you,\n[Business Name]",
  },
  {
    id: "electrician",
    label: "Electricians",
    template:
      "Hi [Customer Name],\n\nThank you for choosing [Business Name] for your electrical work. Safety and quality matter to us, and we hope that came through.\n\nIf you have a moment, we'd appreciate a quick review:\n[Review Link]\n\nThanks,\n[Business Name]",
  },
  {
    id: "cleaner",
    label: "Cleaning companies",
    template:
      "Hi [Customer Name],\n\nThanks for having [Business Name] in to clean your space! We hope it's exactly how you like it.\n\nIf you have a minute, we'd love to hear how we did:\n[Review Link]\n\nSee you next time,\n[Business Name]",
  },
  {
    id: "mechanic",
    label: "Mechanics",
    template:
      "Hi [Customer Name],\n\nThanks for bringing your vehicle to [Business Name] for [Service]. We hope it's driving well.\n\nIf you have a moment, a quick review helps other drivers find a shop they can trust:\n[Review Link]\n\nThanks for your business,\n[Business Name]",
  },
  {
    id: "salon",
    label: "Salons & barbers",
    template:
      "Hi [Customer Name],\n\nThanks for visiting [Business Name]! We hope you're loving the result.\n\nIf you have a moment, we'd really appreciate a quick review — it helps other clients find us:\n[Review Link]\n\nSee you again soon,\n[Business Name]",
  },
  {
    id: "cafe",
    label: "Cafés",
    template:
      "Hi [Customer Name],\n\nThanks for stopping by [Business Name]! We hope you enjoyed your visit.\n\nIf you have a moment, a quick review helps other locals discover us:\n[Review Link]\n\nHope to see you again soon,\n[Business Name]",
  },
  {
    id: "hotel",
    label: "Hotels",
    template:
      "Hi [Customer Name],\n\nThank you for staying with [Business Name]. We hope your visit was comfortable from check-in to check-out.\n\nIf you have a moment, sharing your experience helps future guests know what to expect:\n[Review Link]\n\nWarm regards,\n[Business Name]",
  },
];

export const mergeFields = ["[Customer Name]", "[Business Name]", "[Service]", "[Review Link]"];

export function renderPreview(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((text, [key, value]) => text.split(key).join(value), template);
}
