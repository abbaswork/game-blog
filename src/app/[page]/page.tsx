import { Page } from '@/types';
import PageService from '@/services/page/parsePage';
import { Metadata } from 'next';
import { wpPreviewHeaders } from '@/config/api';

/**
 * Generate static paths for blog pages
 * @returns 
 */
export async function generateStaticParams() {

  // Call an external API endpoint to get posts
  const pageFetch: Page[] = await fetch(`${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/pages`, {
    headers: wpPreviewHeaders
  }).then((res) => res.json());

  // Get the paths we want to prerender based on posts
  const paths = pageFetch.map((page) => ({ slug: [page.slug] }));

  // { fallback: false } means other routes should 404
  return paths;
}

//get blog data fetch
async function getPage(page: string): Promise<PageService> {
  const pageFetch: Page[] = await fetch(`${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/pages?slug=${page}&per_page=1`,
    {
      headers: wpPreviewHeaders,
    }
  ).then((res) => res.json())
  .catch(e => console.log('e: ', e));

  //this function is only run when a page that exists is accessed
  if(!pageFetch[0]){
    console.log('WP Error: ', pageFetch);
    throw Error(`Page could not be retrieved from WP, check terminal for more info`);
  }

  const pageRender = new PageService(pageFetch[0]);
  return pageRender;
}

export const metadata: Metadata = {
  title: "Metric Gamer: curated list of ranked games for PS2 and more",
  description: "Checkout our list of best games for modern and older consoles",
  alternates: {
    canonical: "/"
  }
}

export default async function Page({params }: { params: { page: string } }) {

  const page = await getPage(params.page);

  return (
    <main className='home-page'>
      {page.meta.title}
      {page.content}
    </main>
  )
}