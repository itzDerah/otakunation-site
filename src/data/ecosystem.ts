/**
 * The six planned areas of the Otakunation ecosystem.
 *
 * Every area is pre-launch. Keep the `status` copy honest until a feature is
 * actually available to the public.
 */

export type EcosystemIcon =
  | "clapperboard"
  | "users"
  | "crown"
  | "pen"
  | "gamepad"
  | "store";

export type EcosystemLayout = "feature" | "standard" | "wide";

export interface EcosystemArea {
  key:
    | "anime"
    | "community"
    | "guilds"
    | "creators"
    | "gaming"
    | "marketplace";
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: EcosystemIcon;
  layout: EcosystemLayout;
  status: string;
}

export const ecosystemAreas: EcosystemArea[] = [
  {
    key: "anime",
    id: "ecosystem-anime",
    number: "01",
    title: "Anime & Manga",
    tagline: "Discover · Watch · Read",
    description:
      "A home for the stories that move us. Discover new series, revisit favourites and talk about anime and manga with people who understand why it matters.",
    icon: "clapperboard",
    layout: "feature",
    status: "Planned",
  },
  {
    key: "community",
    id: "ecosystem-community",
    number: "02",
    title: "Community & Social",
    tagline: "Connect · Share · Belong",
    description:
      "Belonging beyond the feed. A place to meet fellow Otakus, share what you love and build friendships around a culture you already call home.",
    icon: "users",
    layout: "standard",
    status: "Planned",
  },
  {
    key: "guilds",
    id: "ecosystem-guilds",
    number: "03",
    title: "Guilds & Events",
    tagline: "Gather · Compete · Celebrate",
    description:
      "Rally your circle. Guilds and community events are planned to turn shared fandom into connection, friendly rivalry and moments worth showing up for.",
    icon: "crown",
    layout: "standard",
    status: "Planned",
  },
  {
    key: "creators",
    id: "ecosystem-creators",
    number: "04",
    title: "Creators & Artists",
    tagline: "Create · Inspire · Thrive",
    description:
      "A stage for the makers. Fan artists, writers and creators will have room to be seen, supported and inspired by a community that values original work.",
    icon: "pen",
    layout: "standard",
    status: "Planned",
  },
  {
    key: "gaming",
    id: "ecosystem-gaming",
    number: "05",
    title: "Gaming",
    tagline: "Play · Compete · Connect",
    description:
      "Play together. A planned space for casual sessions, community tournaments and the games Otakus already love to share.",
    icon: "gamepad",
    layout: "standard",
    status: "Planned",
  },
  {
    key: "marketplace",
    id: "ecosystem-marketplace",
    number: "06",
    title: "Marketplace",
    tagline: "Discover · Support · Trade",
    description:
      "A future home for fan-made goods, independent merchants and culture-led commerce — designed with trust, care and the community in mind.",
    icon: "store",
    layout: "wide",
    status: "Planned",
  },
];

export const ecosystemLinks = ecosystemAreas.map((area) => ({
  href: `#${area.id}`,
  label: area.title,
}));
