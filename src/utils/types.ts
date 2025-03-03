interface Creator {
  displayName: string;
  firstName: string;
  headline: string;
  lastName: string;
  profileHandle: string;
  profilePicture: string;
  companyVerifiedAt: string;
  verified: boolean;
  id: string;
  canSuperUpvote: boolean;
}

interface Experience {
  createdAt: string;
  title: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    city?: string;
    country?: string;
    code?: string;
  } & ({ city: string } | { country: string });
  organizationName: string;
  jobType: string;
  skills: Array<{
    id?: string;
    name: string;
    label: string;
  }>;
  current: boolean;
  promoted: boolean;
  verifiedAt: null | string;
  website?: string;
  uuid: string;
  isExpiring: boolean;
  verified: boolean;
  role: string;
  id: string;
  companyId?: string;
  company: string;
  companyName?: string;
  logo?: string;
  profileHandle?: string;
  isClaimed?: boolean;
  tagline?: string;
  companyVerifiedAt?: string;
  companyVerifiedBy?: string;
  companyVerification?: {
    approvedBy: {
      at: string;
      id: string;
    };
  };
  workSkills: Array<{
    id?: string;
    name: string;
    label: string;
  }>;
  jobRole: string;
}

interface Education {
  createdAt: string;
  title: string;
  startDate: string;
  endDate: string;
  organizationName: string;
  courseName?: string;
  skills: Array<{ name: string; label: string }>;
  current: boolean;
  promoted: boolean;
  verifiedAt: null | string;
  uuid: string;
  isExpiring: boolean;
  verified: boolean;
  id: string;
  instituteName: string;
  institution: string;
  degree: string;
  major?: string;
  startYear: number;
  endYear: number;
}

interface Collection {
  title: string;
  type: "BOOKS" | "VIDEOS" | "PODCASTS" | "LINKS";
  createdBy: string;
  itemsCount: number;
  deletedAt: null;
  priority: number;
  subscribersCount: number;
  items: Array<{
    id: string;
    title: string;
    image: string;
    type: string;
    description: string;
    createdAt: string;
    author: string;
    url: string;
  }>;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  subTitle: string;
  publishedAt: string;
  createdBy: string;
  url: string;
  seo: {
    title: string;
    description: string;
    ogImage: string | null;
    keywords: string[];
  };
  creator: Creator;
  upvoteCount: number;
  bookmarkCount: number;
  commentCount: number;
  editAccess: boolean;
  featuredImage: string;
  content: string;
  readTime: number;
}

export interface Project {
  title: string;
  slug: string;
  tagline?: string;
  url?: string;
  tags: string[];
  categories?: Array<{
    name: string;
    id: string;
    title: string;
    description: string;
  }>;
  images?: Array<string>;
  isOpenSource?: boolean;
  createdAt: string;
  hackathonInfo: {
    slug: string;
    submittedAt: null;
  } | null;
  openForCollab: boolean;
  commentsUpdatedAt: string;
  id: string;
  teamName?: string;
  createdBy: Creator[];
  creator: Creator;
  projectURL: string;
  collaborators: Array<Creator>;
  upvotesCount?: number;
  isUpvoted?: boolean;
  commentCount?: number;
  bookmarkCount?: number;
}

export interface PeerlistData {
  follower: boolean;
  following: boolean;
  peer: boolean;
  isPeers: boolean;
  certificationsCount: number;
  communityWorkCount: number;
  companyVerifiedAt: string;
  displayName: string;
  educationCount: number;
  collectionsCount: number;
  enabled: boolean;
  experienceCount: number;
  projectCount: number;
  firstName: string;
  headline: string;
  address: {
    country: string;
    city: string;
    countryCode: string;
  };
  inboxPreferences: null;
  integrations: {
    productHunt?: { username: string };
    github?: { username: string; verified: boolean };
    medium?: { username: string };
    hashnode?: { username: string };
    devto?: { username: string };
    substack?: { username: string };
  };
  integrationsOrder: Array<{ name: string }>;
  lastName: string;
  preferredPronoun: string;
  profileHandle: string;
  profilePicture: string;
  projectsOrder: string[];
  published: boolean;
  skills: Array<{
    id?: string;
    name: string;
    label: string;
  }>;
  socialLinks: {
    Twitter?: string;
    Instagram?: string;
    LinkedIn?: string;
    ProductHunt?: string;
    Behance?: string;
  };
  totalExperienceYears: number;
  verified: boolean;
  website?: string;
  calendar: string;
  createdAt: string;
  publishedAt: string;
  id: string;
  projects: Array<Project>;
  education: Array<Education>;
  experience: Array<Experience>;
  collections: Array<Collection>;
  blog: Array<Article>;
  numPosts: number;
  blogCount: number;
  jobsCount: number;
  networkCount: {
    followers: number;
    peers: number;
  };
  ogDetails: {
    title: string;
    description: string;
    tags: string[];
  };
}

export interface ProductHuntProject {
  node: {
    id: string;
    name: string;
    tagline: string;
    thumbnail: {
      url: string;
    };
    votesCount: number;
    url: string;
  };
}

export type MediumResponse = {
  status: "ok";
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: Array<{
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: {};
    categories: Array<string>;
  }>;
};

export type HashnodeResponse = {
  data: {
    publication: {
      posts: {
        edges: [
          {
            node: {
              url: string;
              title: string;
              coverImage: {
                url: string;
              };
            };
          }
        ];
      };
    };
  };
};

export type DevToResponse = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  language: string | null;
  subforem_id: string | null;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string;
  crossposted_at: string;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: Array<string>;
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
}[];

export type SubstackResponse = {
  audience: string;
  audience_before_archived: string;
  canonical_url: string;
  default_comment_sort: string;
  editor_v2: boolean;
  exempt_from_archive_paywall: boolean;
  free_unlock_required: boolean;
  id: number;
  podcast_art_url: string;
  podcast_duration: string;
  podcast_preview_upload_id: string;
  podcast_upload_id: string;
  podcast_url: string;
  post_date: string;
  updated_at: string;
  publication_id: number;
  search_engine_description: string;
  search_engine_title: string;
  section_id: string;
  should_send_free_preview: boolean;
  show_guest_bios: boolean;
  slug: string;
  social_title: string;
  subtitle: string;
  teaser_post_eligible: boolean;
  title: string;
  type: string;
  video_upload_id: string;
  write_comment_permissions: string;
  is_metered: boolean;
  restacks: number;
  reactions: { "❤": number };
  top_exclusions: [];
  pins: [];
  section_pins: [];
  previous_post_slug: string;
  next_post_slug: string;
  cover_image: string;
  cover_image_is_square: false;
  cover_image_is_explicit: false;
  videoUpload: string;
  podcastFields: string;
  podcastUpload: string;
  podcastPreviewUpload: string;
  voiceover_upload_id: string;
  voiceoverUpload: string;
  has_voiceover: boolean;
  description: string;
  body_html: string;
  truncated_body_text: string;
  wordcount: number;
  postTags: [];
  postCountryBlocks: [];
  publishedBylines: Array<{
    id: number;
    name: string;
    handle: string;
    previous_name: string;
    photo_url: string;
    bio: string;
    profile_set_up_at: string;
    publicationUsers: Array<{
      id: number;
      user_id: number;
      publication_id: number;
      role: string;
      public: boolean;
      is_primary: boolean;
      publication: {
        id: number;
        name: string;
        subdomain: string;
        custom_domain: string;
        custom_domain_optional: boolean;
        hero_text: string;
        logo_url: string;
        author_id: number;
        theme_var_background_pop: string;
        created_at: string;
        email_from_name: string;
        copyright: string;
        founding_plan_name: string;
        community_enabled: boolean;
        invite_only: boolean;
        payments_state: string;
        language: string;
        explicit: boolean;
        is_personal_mode: boolean;
      };
    }>;
    twitter_screen_name: string;
    is_guest: boolean;
    bestseller_tier: string;
  }>;
  reaction: number;
  reaction_count: number;
  comment_count: number;
  audio_items: Array<{
    post_id: number;
    voice_id: string;
    audio_url: string;
    type: string;
    status: string;
  }>;
  is_geoblocked: boolean;
  hasCashtag: boolean;
}[];

export interface Publication {
  name: string;
  logo?: string;
  url?: string;
}

export interface Blog {
  title: string;
  url: string;
  coverImage: string;
}

export interface Blogs {
  publication: Publication | null;
  blogs: Blog[];
}
