import type { RequestStatus, RequestMethod, CampaignStatus, CustomerRequestStatus } from "@/lib/types";

export const requestStatusConfig: Record<RequestStatus, { label: string; tone: "neutral" | "green" | "warning" | "error" | "gold" }> = {
  draft: { label: "Draft", tone: "neutral" },
  scheduled: { label: "Scheduled", tone: "gold" },
  sent: { label: "Sent", tone: "neutral" },
  delivered: { label: "Delivered", tone: "neutral" },
  clicked: { label: "Clicked", tone: "gold" },
  completed: { label: "Completed", tone: "green" },
  failed: { label: "Failed", tone: "error" },
  cancelled: { label: "Cancelled", tone: "error" },
};

export const methodLabels: Record<RequestMethod, string> = {
  sms: "SMS",
  email: "Email",
  whatsapp: "WhatsApp",
  manual: "Manual",
  qr: "QR code",
  link: "Direct link",
};

export const campaignStatusConfig: Record<CampaignStatus, { label: string; tone: "neutral" | "green" | "warning" | "gold" }> = {
  active: { label: "Active", tone: "green" },
  paused: { label: "Paused", tone: "warning" },
  draft: { label: "Draft", tone: "neutral" },
  completed: { label: "Completed", tone: "gold" },
};

export const customerRequestStatusConfig: Record<CustomerRequestStatus, { label: string; tone: "neutral" | "green" | "warning" }> = {
  not_sent: { label: "Not sent", tone: "neutral" },
  sent: { label: "Sent", tone: "warning" },
  completed: { label: "Review received", tone: "green" },
  no_response: { label: "No response yet", tone: "neutral" },
};
