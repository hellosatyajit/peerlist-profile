const USER_NAME = "hellosatyajit";

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
  };
  totalExperienceYears: number;
  verified: boolean;
  website?: string;
  calendar: string;
  createdAt: string;
  publishedAt: string;
  id: string;
  projects: Array<{
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
    createdBy: {
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
    };
    creator: {
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
    };
    projectURL: string;
    collaborators: Array<{
      firstName: string;
      lastName: string;
      displayName: string;
      profilePicture: string;
      headline: string;
      profileHandle: string;
      id: string;
    }>;
    upvotesCount?: number;
    isUpvoted?: boolean;
    commentCount?: number;
    bookmarkCount?: number;
  }>;
  education: Array<{
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
  }>;
  experience: Array<{
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
  }>;
  collections: Array<{
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
  }>;
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

async function fetchFromPeerlist(
  path: string
): Promise<{ user: PeerlistData }> {
  const response = await fetch(`https://peerlist.io/${USER_NAME}${path}`);
  const html = await response.text();
  const scriptDataMatch = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s
  );
  if (!scriptDataMatch) {
    throw new Error("Could not find Peerlist data in HTML");
  }
  const jsonData = JSON.parse(scriptDataMatch[1]);

  jsonData.props.pageProps.user.address = {
    country: "India",
    city: "Ahmedabad",
    countryCode: "IN",
  };
  return jsonData.props.pageProps;
}

export async function fetchUserProfile(): Promise<PeerlistData> {
  const jsonData = await fetchFromPeerlist("/");
  return jsonData.user;
}

export async function fetchUserResume(): Promise<PeerlistData> {
  const jsonData = await fetchFromPeerlist("/resume");

  return jsonData.user;
}

export async function fetchUserCollection(): Promise<PeerlistData> {
  const jsonData = await fetchFromPeerlist("/collections");

  return jsonData.user;
}

interface ProductHuntProject {
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

export async function fetchProductHuntProjects(
  username?: string
): Promise<ProductHuntProject[]> {
  if (!username) {
    return [];
  }
  const query = `
    query {
      user(username: "${username}") {
        madePosts(first: 50) {
          edges {
            node {
              id
              name
              tagline
              thumbnail {
                url
              }
              votesCount
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PRODUCT_HUNT_DEV_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.user.madePosts.edges;
}
