import { Header } from '@/components/header/Header'
import './globals.scss'
import { Inter } from 'next/font/google'
import { SidePanel } from '@/components/layouts/side-panel/SidePanel'
import { ListContainer } from '@/components/core/list-container/ListContainer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL("https://www.metricgamer.com")
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-W9CVD1Y1EF" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-W9CVD1Y1EF');
        `}
      </Script>
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6729388944848700"
        // strategy='beforeInteractive'
        crossOrigin="anonymous" />
      <body className={inter.className}>

        <Header />

        {/* Layout for page */}
        <div className='page-layout'>

          {/* Layout for page content */}
          <div className='page-content'>
            {children}
          </div>

          {/* Layout for side panel */}
          <SidePanel>
            <ListContainer title='Sidebar' className='sidebar'>
              <>
                <li>New Blogs Coming Soon</li>
              </>
            </ListContainer>
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-6729388944848700"
              data-ad-slot="8400791358"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <Script id="sidebar-adsense">
              {`
              (adsbygoogle = window.adsbygoogle || []).push({ });
              `}
            </Script>
          </SidePanel>

        </div>
      </body>
    </html>
  )
}
