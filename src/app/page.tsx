import { Page } from '@/types';
import PageService from '@/services/page/parsePage';
import { Metadata } from 'next';

//get blog data fetch
async function getPage(slug: string): Promise<PageService> {
  const pageFetch: Page[] = await fetch(`http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-json/wp/v2/pages?slug=${slug}&per_page=1`, { next: { revalidate: 0 } }).then((res) => res.json());
  const pageRender = new PageService(pageFetch[0]);
  return pageRender;
}

export const metadata: Metadata = {
  title: "Metric Gamer: curated list of ranked games for PS2 and more"
}

export default async function Home() {

  const page = await getPage('home-page');

  return (
    <main className='home-page'>
      {page.content}
    </main>
  )
}
