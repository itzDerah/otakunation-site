/**
 * Central site configuration.
 *
 * Destinations that do not exist yet stay `null` so the UI can show an honest
 * status instead of a dead link. Replace these values only with verified,
 * official destinations.
 */

export interface NavItem {
  href: string;
  label: string;
  current?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface CtaLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  footerDescription: string;
  status: string;
  nav: NavItem[];
  headerCta: CtaLink;
  community: {
    registrationUrl: string | null;
    status: string;
  };
  contact: {
    email: string | null;
    note: string;
  };
  socials: SocialLink[];
  legal: {
    privacyUrl: string | null;
    termsUrl: string | null;
  };
  seo: {
    ogImage: string;
    ogImageAlt: string;
  };
}

export const site: SiteConfig = {
  name: "Otakunation",
  slogan: "The World's First Anime Nation",
  description:
    "Otakunation is a digital nation for Otakus: a connected, anime-inspired ecosystem for community, creativity, culture and play. The World's First Anime Nation.",
  footerDescription:
    "A digital nation for Otakus — bringing anime culture, community and creativity together across borders.",
  status: "Platform in development",
  nav: [
    { href: "#top", label: "Home", current: true },
    { href: "#about", label: "About" },
    { href: "#ecosystem", label: "Ecosystem" },
    { href: "#news", label: "News & Updates" },
    { href: "#opportunities", label: "Opportunities" },
    { href: "#contact", label: "Contact" },
  ],
  headerCta: {
    href: "#ecosystem",
    label: "Explore the Nation",
  },
  community: {
    registrationUrl: null,
    status:
      "Community registration is not open yet. The official link will be published on this site when it is ready.",
  },
  contact: {
    email: null,
    note:
      "Official contact channels are being finalised. No email address or phone number is published yet.",
  },
  socials: [],
  legal: {
    privacyUrl: null,
    termsUrl: null,
  },
  seo: {
    ogImage: "/og/og-default.jpg",
    ogImageAlt:
      "Otakunation crest on an ink background with the words Otakunation — The World's First Anime Nation.",
  },
};
