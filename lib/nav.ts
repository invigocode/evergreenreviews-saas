import {
  LayoutDashboard,
  Star,
  Send,
  Megaphone,
  Users,
  BarChart3,
  Building2,
  MessageSquareText,
  QrCode,
  Settings,
  LifeBuoy,
} from "lucide-react";

export const primaryNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Review Requests", href: "/dashboard/review-requests", icon: Send },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Business Profile", href: "/dashboard/business-profile", icon: Building2 },
  { label: "Review Responses", href: "/dashboard/responses", icon: MessageSquareText },
  { label: "Review Materials", href: "/dashboard/materials", icon: QrCode },
] as const;

export const secondaryNav = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Help & Support", href: "/dashboard/help", icon: LifeBuoy },
] as const;
