import { Metadata } from 'next';
import { CategoryForPageType, Page } from "@/types";
import { wpPreviewHeaders } from '@/config/api';
import { draftMode } from 'next/headers';
import PageService from '@/services/page/parsePage';
import { SidePanel } from '@/components/layouts/side-panel/SidePanel';
import ShareButton from '@/components/core/share-button/ShareButton';
import { social } from '@/types/social';
import { Contact } from '@/components/layouts/contact/Contact';


/**
 * Generate static paths for blog pages
 * @returns 
 */
export async function generateStaticParams() {

  // Call an external API endpoint to get posts
  const postsFetch: Page[] = await fetch(`http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2/posts`, {
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
  const baseURL = `http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2`;
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

  //if draft mode is enabled, then do not set any meta data, retrieving and dynamically setting causes reload in which the draft token is lost
  const { isEnabled } = draftMode();
  if (isEnabled)
    return {};

  const post = await getPost([params.slug]);
  const title = params.slug[0].replaceAll("-", " ");

  return {
    title: post.properties.metaTitle || title,
    description: post.properties.metaDescription || `Check out the ranked list of ${title}`,
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
          {post.properties.featuredImage}
          <h1 className="wp-title">{post.meta.title}</h1>
          <p>Published: {post.meta.date}</p>
          {/* TODO: move to layout */}
          <p className="share-section">Share:
            <ShareButton type={social.facebook} title={post.meta.title} url={post.meta.url} />
            <ShareButton type={social.pinterest} title={post.meta.title} url={post.meta.url} />
            <ShareButton type={social.twitter} title={post.meta.title} url={post.meta.url} />
            <ShareButton type={social.link} title={post.meta.title} url={post.meta.url} />
          </p>
          {post.tableOfContents}
          {post.content}
        </article>
      </div>

      <SidePanel>
        {sidebar}
        <Contact/>
      </SidePanel>
    </>
  )
}

