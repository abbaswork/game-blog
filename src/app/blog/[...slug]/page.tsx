import { Metadata } from 'next';
import { Page } from "@/types";
import { wpPreviewHeaders } from '@/config/api';
import { draftMode } from 'next/headers';
import PageService from '@/services/page/parsePage';


/**
 * Generate static paths for blog pages
 * @returns 
 */
export async function generateStaticParams() {

  // Call an external API endpoint to get posts
  const postsFetch: Page[] = await fetch(`${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/posts`, {
    headers: wpPreviewHeaders
  }).then((res) => res.json());

  // Get the paths we want to prerender based on posts
  const paths = postsFetch.map((post) => ({ slug: [post.slug] }));

  // { fallback: false } means other routes should 404
  return paths;
}


//get blog data fetch
async function getPost(slug: string[]): Promise<PageService> {

  //check draft mode and get params, draft mode can ONLY by enabled through draft endpoint auth
  const { isEnabled } = draftMode();
  const draftPage = isEnabled && slug[0] === 'draft';

  //create url parts, search params change based on url type
  const baseURL = `${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/posts`;
  var searchURL = draftPage ? `/${slug[1]}` : `?slug=${slug[0]}&per_page=1`;

  const postsFetch: Page[] = await fetch(`${baseURL}${searchURL}`, {
    headers: wpPreviewHeaders
  }).then((res) => {
    return res.json();
  });

  console.log("postsFetch: ", postsFetch);

  const postRender = new PageService(postsFetch[0] ? postsFetch[0] : postsFetch as any);
  return postRender;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const title = params.slug[0].replaceAll("-", " ");
  return {
    title: title,
    description: `Check out the ranked list of ${title}`,
    alternates: {
      canonical: `/blog/${params.slug}`
    }
  }
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Post({ params }: { params: { slug: string[] } }) {

  const { slug } = params;
  const post = await getPost(slug);

  //return parsed page content
  return (
    <article className="blog-page">
      {post.featuredImage}
      <h1 className="wp-title">{post.meta.title}</h1>
      <p>Published: {post.meta.date}</p>
      {post.tableOfContents}
      {post.content}
    </article>
  )
}

