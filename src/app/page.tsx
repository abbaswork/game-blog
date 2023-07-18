import { Page } from '@/types';
import PageService from '@/services/page/parsePage';

//get blog data fetch
async function getPage(slug: string): Promise<PageService> {
  const pageFetch: Page[] = await fetch(`http://gameblog.local/wp-json/wp/v2/pages?slug=${slug}&per_page=1`, { next: { revalidate: 0 } }).then((res) => res.json());
  const pageRender = new PageService(pageFetch[0]);
  return pageRender;
}

export default async function Home() {

  const page = await getPage('home-page');

  return (
    <main>
      {page.content}
    </main>
  )
}
