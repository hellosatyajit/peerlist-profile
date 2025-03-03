import * as cheerio from "cheerio";
import type {
  PeerlistData,
  ProductHuntProject,
  MediumResponse,
  HashnodeResponse,
  DevToResponse,
  SubstackResponse,
  Blogs,
} from "./types";

const USER_NAME = import.meta.env.PEERLIST_USERNAME;
export const SITE_DOMAIN = import.meta.env.SITE_DOMAIN;

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

export async function fetchUserArticles(): Promise<PeerlistData> {
  const jsonData = await fetchFromPeerlist("/articles");
  
  return jsonData.user;
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

  return data?.data?.user?.madePosts?.edges || [];
}

function getImageSources(description: string) {
  const $ = cheerio.load(description);
  const imgSources: string[] = [];

  $("figure > img").each((_, img) => {
    const src = $(img).attr("src");
    if (src) imgSources.push(src);
  });

  return imgSources.length > 0 ? imgSources[0] : "";
}

export async function fetchMediumPosts(username?: string): Promise<Blogs> {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    );

    const data: MediumResponse = await response.json();

    const blogs = data?.items?.map((post) => ({
      title: post.title,
      url: post.link,
      coverImage: getImageSources(post.description),
    }));

    return {
      publication: {
        name: "Medium",
        url: `https://medium.com/@${username}`,
      },
      blogs,
    };
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return {
      publication: {
        name: "Medium",
      },
      blogs: [],
    };
  }
}

export async function fetchHashnodePosts(username?: string): Promise<Blogs> {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const query = `
      query Publication($host: String = "${username}.hashnode.dev") {
        publication(host: $host) {
          posts(first: 10) {
            edges {
              node {
                url
                title
                coverImage {
                  url
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data: HashnodeResponse = await response.json();

    const blogs = data?.data?.publication?.posts?.edges?.map(
      (post: { node: any }) => ({
        title: post.node.title,
        url: post.node.url,
        coverImage: post.node.coverImage.url,
      })
    );

    return {
      publication: {
        name: "Hashnode",
        url: `https://${username}.hashnode.dev`,
      },
      blogs,
    };
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error);
    return {
      publication: {
        name: "Hashnode",
      },
      blogs: [],
    };
  }
}

export async function fetchDevToPosts(username?: string): Promise<Blogs> {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=10`
    );

    const data: DevToResponse = await response.json();

    const blogs = data?.map((post) => ({
      title: post.title,
      url: post.url,
      coverImage: post.cover_image,
    }));

    return {
      publication: {
        name: "DEV",
        url: `https://dev.to/${username}`,
      },
      blogs,
    };
  } catch (error) {
    console.error("Error fetching DevTo posts:", error);
    return {
      publication: {
        name: "DEV",
      },
      blogs: [],
    };
  }
}

export async function fetchSubstackPosts(username?: string): Promise<Blogs> {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const response = await fetch(
      `https://${username}.substack.com/api/v1/posts?limit=10`
    );

    const data: SubstackResponse = await response.json();

    const publication = {
      name: data?.[0]?.publishedBylines?.[0]?.publicationUsers?.[0]?.publication
        ?.name,
      logo: "https://substackcdn.com/image/fetch/w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/"+data?.[0]?.publishedBylines?.[0]?.publicationUsers?.[0]?.publication
        ?.logo_url,
      url: `https://${username}.substack.com`,
    };
    const blogs = data?.map((post) => ({
      title: post.title,
      url: post.canonical_url,
      coverImage: post.cover_image,
    }));

    return {
      publication,
      blogs,
    };
  } catch (error) {
    console.error("Error fetching Substack posts:", error);
    return {
      publication: {
        name: "Substack",
      },
      blogs: [],
    };
  }
}

export async function getBlogs(
  username: string,
  type: "medium" | "hashnode" | "devto" | "substack"
): Promise<Blogs> {
  switch (type) {
    case "medium":
      return await fetchMediumPosts(username);
    case "hashnode":
      return await fetchHashnodePosts(username);
    case "devto":
      return await fetchDevToPosts(username);
    case "substack":
      return await fetchSubstackPosts(username);
    default:
      return {
        publication: null,
        blogs: [],
      };
  }
}
