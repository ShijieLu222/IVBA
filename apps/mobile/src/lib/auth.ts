export type AccountRole = "audience" | "host";

const hostDomains = ["artspace.uk", "theisland.uk", "sparksbristol.co.uk"];

export function detectAccountRole(email: string): AccountRole {
  const normalised = email.trim().toLowerCase();
  const domain = normalised.split("@")[1] ?? "";
  return normalised.startsWith("host+") ||
    normalised === "host@artspace.uk" ||
    hostDomains.includes(domain)
    ? "host"
    : "audience";
}

export const demoAccounts = {
  audience: { email: "visitor@example.com", password: "bristol2026" },
  host: { email: "host@artspace.uk", password: "bristol2026" },
} as const;
