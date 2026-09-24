export type Business = {
  name: string;
  category: string;
  website: string;
  phone: string;
  address: string;
  employeeCount: string;
  googleReviewUrl: string;
  googlePlaceConnected: boolean;
  timezone: string;
  /** Maximum times a single customer will ever be asked for a review, spaced automatically. Never re-asked once they leave one. */
  reviewRequestCap: number;
};

export type ReviewSentiment = "positive" | "neutral" | "negative";

export type Review = {
  id: string;
  reviewerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // ISO date
  source: "google";
  responded: boolean;
  responseText?: string;
  responseDate?: string;
  needsAttention: boolean;
  sentiment: ReviewSentiment;
  service?: string;
};

export type RequestMethod = "sms" | "email" | "whatsapp" | "manual" | "qr" | "link";
export type RequestStatus =
  | "draft"
  | "scheduled"
  | "sent"
  | "delivered"
  | "clicked"
  | "completed"
  | "failed"
  | "cancelled";

export type ReviewRequest = {
  id: string;
  customerId: string;
  customerName: string;
  dateRequested: string;
  method: RequestMethod;
  status: RequestStatus;
  campaignId?: string;
  campaignName?: string;
  clicked: boolean;
  completed: boolean;
};

export type CampaignStatus = "active" | "paused" | "draft" | "completed";
export type CampaignChannel = "sms" | "email" | "whatsapp" | "qr" | "link";
export type CampaignTiming = "immediate" | "delayed" | "manual" | "scheduled";

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  audience: string;
  createdDate: string;
  timing: CampaignTiming;
  delayHours?: number;
  messageTemplate: string;
  requestsSent: number;
  clicks: number;
  completions: number;
};

export type CustomerRequestStatus = "not_sent" | "pending" | "completed" | "capped";

export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  service: string;
  serviceDate: string;
  lastRequestDate?: string;
  campaignName?: string;
  requestStatus: CustomerRequestStatus;
  /** How many review requests have actually gone out to this customer so far. */
  requestsSent: number;
  consent: boolean;
};

export type OutreachStatus = "scheduled" | "sent" | "cancelled";

/**
 * A review request the system has drafted and queued to send automatically.
 * It sends itself once `scheduledFor` passes, unless edited (which just
 * updates the draft) or cancelled first — the "edit window" the product
 * gives an owner to add context the software doesn't have.
 */
export type ScheduledOutreach = {
  id: string;
  customerId: string;
  customerName: string;
  service?: string;
  channel: RequestMethod;
  message: string;
  campaignId?: string;
  campaignName?: string;
  requestNumber: number;
  scheduledFor: string;
  createdAt: string;
  status: OutreachStatus;
  edited: boolean;
};

export type DailyMetric = {
  date: string;
  totalReviews: number;
  newReviews: number;
  requestsSent: number;
  avgRating: number;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
  helpText?: string;
};

export type DateRangeKey = "7d" | "30d" | "90d" | "ytd" | "custom";
