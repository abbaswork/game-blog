import { Page } from '@/types';
import PageService from '@/services/page/parsePage';
import { Metadata } from 'next';
import { wpPreviewHeaders } from '@/config/api';
import { SidePanel } from '@/components/layouts/side-panel/SidePanel';
import { Contact } from '@/components/layouts/contact/Contact';
import NavigationService from '@/services/navigation/navigation';
import { menuLocations } from '@/services/api/wordpress';

//get blog data fetch
async function getPage(slug: string): Promise<PageService> {
  const pageFetch: Page[] = await fetch(`http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2/pages?slug=${slug}&per_page=1`,
    {
      headers: wpPreviewHeaders,
    }
  ).then((res) => res.json())
    .catch(e => console.log('e: ', e));

  //this function is only run when a page that exists is accessed
  if (!pageFetch[0]) {
    console.log('WP Error: ', pageFetch);
    throw Error(`Page could not be retrieved from WP, check terminal for more info`);
  }

  const pageRender = new PageService(pageFetch[0]);
  return pageRender;
}

export const metadata: Metadata = {
  title: "Metric Gamer: curated list of games ranked on metrics for PS5, Switch, PC and more",
  description: "Top 5's, Hidden Gems, In-depth reviews, game news and more for PS5, PS4, Switch, PC, Steam Deck and more",
  alternates: {
    canonical: "/"
  }
}

export default async function Home() {

  const navigationService = new NavigationService();
  const page = await getPage('home-page');
  const sidebar = await page.parseSidebar(page.meta);
  const sidebarContact = await navigationService.getMenuItems(menuLocations.sidebar);

  return (
    <>
      <div className='page-content'>
        <main className='home-page'>
          {page.content}
        </main>

      </div>

      <SidePanel>
        {sidebar}
        <Contact links={sidebarContact} />
      </SidePanel>
    </>
  )
}