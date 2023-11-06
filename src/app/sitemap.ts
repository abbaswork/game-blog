import { MetadataRoute } from 'next';
import { wpPreviewHeaders } from '@/config/api';
import { Page } from '@/types';

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
  priority?: number
}>

/**
 * Generate static paths for all pages
 * @returns 
 */
export async function generateUrls(type: "pages" | "posts") {

  // Call an external API endpoint to get posts
  const pageFetch: Page[] = await fetch(`${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/${type}`, {
    headers: wpPreviewHeaders
  }).then((res) => res.json());

  // Get the paths we want to prerender based on posts
  const paths = pageFetch.map((page) => ({ slug: page.slug, modifed: page.modified}));

  // { fallback: false } means other routes should 404
  return mapToSitemap(paths, type);
}

const mapToSitemap = (urls: { slug: string, modifed: string }[], type: "pages" | "posts") => {
  return urls.map(url => ({
    url: `https://www.metricgamer.com/${type === "posts" ? "posts/" : ""}${url.slug}`,
    lastModified: new Date(url.modifed),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await generateUrls("pages");
  const posts = await generateUrls("posts");

  return <Sitemap>[
    {
      url: 'https://www.metricgamer.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...pages,
    ...posts
  ]
}