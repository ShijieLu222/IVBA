export const OrganizationKinds = ["host", "venue"] as const;
export type OrganizationKind = (typeof OrganizationKinds)[number];

export const OrganizationRoles = ["owner", "staff"] as const;
export type OrganizationRole = (typeof OrganizationRoles)[number];

export const VenueStatuses = [
  "draft",
  "pending_review",
  "published",
  "changes_requested",
  "rejected",
  "archived",
] as const;
export type VenueStatus = (typeof VenueStatuses)[number];

export const HireRequestStatuses = [
  "draft",
  "submitted",
  "under_review",
  "changes_requested",
  "accepted",
  "rejected",
  "cancelled",
  "confirmed",
  "quoted",
  "payment_pending",
] as const;
export type HireRequestStatus = (typeof HireRequestStatuses)[number];

export const PricingModels = ["fixed", "from", "enquiry"] as const;
export type PricingModel = (typeof PricingModels)[number];
