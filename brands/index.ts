import type { Brand } from "./types";
import { dr } from "./dr";
import { gmc } from "./gmc";

// The only place brands are registered; a third brand is one more import and key here
export const brands: Record<Brand["id"], Brand> = { dr, gmc };

// Returns undefined for unknown ids so routes can 404 instead of falling back to another brand
export function getBrand(id: string): Brand | undefined {
  return Object.hasOwn(brands, id) ? brands[id as Brand["id"]] : undefined;
}

// Finds the brand that owns a request's host (port ignored); preview and unknown hosts get none
export function brandForHost(host: string | null): Brand | undefined {
  const name = host?.split(":")[0].toLowerCase();
  return name ? Object.values(brands).find((b) => b.domains.includes(name)) : undefined;
}
