import { Metadata } from 'next';
import BlogPageService from "@/services/page/blog/blogPage";
import { Page } from "@/types";


/**
 * Generate static paths for blog pages
 * @returns 
 */
export async function getStaticPaths() {

  // When this is true (in preview environments) don't prerender any static pages, (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Call an external API endpoint to get posts
  const postsFetch: Page[] = await fetch('http://18.213.34.154/wp-json/wp/v2/posts',
    { next: { revalidate: 0 } }
  ).then((res) => res.json());

  // Get the paths we want to prerender based on posts
  const paths = postsFetch.map((post) => ({
    params: { slug: post.slug },
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}


//get blog data fetch
async function getPost(slug: string): Promise<BlogPageService> {
  const postsFetch: Page[] = await fetch(`http://18.213.34.154/wp-json/wp/v2/posts?slug=${slug}&per_page=1`,
    { next: { revalidate: 0 } },
  ).then((res) => res.json());
  const postRender = new BlogPageService(postsFetch[0]);
  return postRender;
}

export  function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const title = params.slug.replaceAll("-", " ");
  return {
    title: title
  }
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Post({ params }: { params: { slug: string } }) {

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

