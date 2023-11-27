import { Metadata } from 'next';
import { CategoryForPageType, Page } from "@/types";
import { wpPreviewHeaders } from '@/config/api';
import { draftMode } from 'next/headers';
import PageService from '@/services/page/parsePage';
import { SidePanel } from '@/components/layouts/side-panel/SidePanel';


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
  const baseURL = `${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2`;
  var searchURL = draftPage ? `/posts/${slug[1]}` : `/posts/?slug=${slug[0]}&per_page=1`;

  const postsFetch: Page[] = await fetch(`${baseURL}${searchURL}`, {
    headers: wpPreviewHeaders
  }).then((res) => res.json());

  var post: Page = postsFetch[0] ? postsFetch[0] : postsFetch as any;

  //catch error
  if (!post || !post.content) {
    console.log(`WP Fetch Error for ${searchURL}: `, postsFetch);
    throw Error(`Page could not be retrieved from WP, check terminal for more info`);
  }

  //query category for page
  if (post.categories) {
    const category: CategoryForPageType = await fetch(`${baseURL}/categories/${post.categories[0]}`, {
      headers: wpPreviewHeaders
    }).then((res) => res.json()).catch(e => console.log(e));

    post.categoryForPage = category;
  }

  const postRender = new PageService(post);
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
  const sidebar = await post.parseSidebar(post.meta);

  //return parsed page conten, sidebars are rendered here because they are unique for each blog
  return (
    <>
      <div className='page-content'>
        <article className="blog-page">
          {post.featuredImage}
          <h1 className="wp-title">{post.meta.title}</h1>
          <p>Published: {post.meta.date}</p>
          {post.tableOfContents}
          {post.content}
        </article>
      </div>

      <SidePanel>
        {sidebar}
      </SidePanel>
    </>
  )
}

