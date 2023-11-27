import { Page } from '@/types';
import PageService from '@/services/page/parsePage';
import { Metadata } from 'next';
import { wpPreviewHeaders } from '@/config/api';
import { SidePanel } from '@/components/layouts/side-panel/SidePanel';
import React from 'react';

/**
 * Generate static paths for blog pages
 * @returns 
 */
export async function generateStaticParams() {

  // Call an external API endpoint to get posts
  const pageFetch: Page[] = await fetch(`http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2/pages`, {
    headers: wpPreviewHeaders
  }).then((res) => res.json());

  // Get the paths we want to prerender based on posts
  const paths = pageFetch.map((page) => ({ slug: [page.slug] }));

  // { fallback: false } means other routes should 404
  return paths;
}

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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const title = params.slug[0].replaceAll("-", " ");
  return {
    title: title,
    description: `Check out the our list of ${title}`,
    alternates: {
      canonical: `/${params.slug}`
    }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {

  const page = await getPage(params.slug);
  const sidebar = await page.parseSidebar(page.meta);

  return (
    <>
      <div className='page-content'>
        <main className='home-page'>
          <h1 className="wp-title">{page.meta.title}</h1>
          {page.content}
        </main>
      </div>

      <SidePanel>
        {sidebar}
      </SidePanel>
    </>
  )
}