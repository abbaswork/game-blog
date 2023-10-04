import { Page } from '@/types';
import PageService from '@/services/page/parsePage';
import { Metadata } from 'next';
import { wpPreviewHeaders } from '@/config/api';

//get blog data fetch
async function getPage(slug: string): Promise<PageService> {
  const pageFetch: Page[] = await fetch(`${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/pages?slug=${slug}&per_page=1`,
    {
      headers: wpPreviewHeaders,
      next: { revalidate: 0 }
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

export default async function Home() {

  const page = await getPage('home-page');

  return (
    <main className='home-page'>
      {page.content}
    </main>
  )
}