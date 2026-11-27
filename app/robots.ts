import type { MetadataRoute } from "next";
import { SITE_URL } from "@/brands";

// Generated instead of public/robots.txt because crawlers need the sitemap as an absolute URL
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
