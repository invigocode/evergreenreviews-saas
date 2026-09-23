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

export type CustomerRequestStatus = "not_sent" | "sent" | "completed" | "no_response";

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
  consent: boolean;
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
