import { Header } from '@/components/header/Header'
import './globals.scss'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import NavigationService from '@/services/navigation/navigation';
import { ScrollUpButton } from '@/components/core/scroll-up-button/ScrollUpButton';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL("https://www.metricgamer.com")
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const navigationService = new NavigationService();
  const menuItems = await navigationService.getMenuItems();

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
      {/* <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6729388944848700"
        // strategy='beforeInteractive'
        crossOrigin="anonymous" /> */}
      <body className={inter.className}>

        <Header menuItems={menuItems} />

        {/* Layout for page */}
        <div className='page-layout'>


          {/* Layout for Scroll Up Button*/}
          <ScrollUpButton/>


          {/* Layout for page content */}

          {children}

        </div>
      </body>
    </html>
  )
}
