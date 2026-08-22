import Script from 'next/script';
import Link from 'next/link';
import StickyHeader from './components/StickyHeader';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './globals.css';

export const metadata = {
  title: 'ANGELS PEAK | Built in Chaos',
  description: 'Angels Peak is for the ones climbing. Built in chaos, tested in isolation, fallen and risen — every piece is a channel between you and the force pulling you towards your peak. Wear your ascent.',
  icons: {
    icon: '/Angel_peak_logo_White.png',
    shortcut: '/Angel_peak_logo_White.png',
    apple: '/Angel_peak_logo_White.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1044533065127434');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1044533065127434&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <Preloader />
            <CustomCursor />
            <div className="noise-overlay"></div>
            <StickyHeader />
            <CartDrawer />
            <WishlistDrawer />
            <WhatsAppButton />
            <main style={{ minHeight: '80vh' }}>
              {children}
            </main>
            <footer style={{ borderTop: '1px solid var(--gray-800)', padding: '4rem 0 2rem' }}>
              <div className="container">
                <style dangerouslySetInnerHTML={{__html: `
                  .footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 4rem; }
                  .footer-links { display: flex; justify-content: flex-end; gap: 4rem; text-transform: uppercase; font-size: 0.875rem; letter-spacing: 0.05em; font-weight: 500; }
                  @media (max-width: 768px) {
                    .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .footer-links { justify-content: flex-start; gap: 2rem; flex-direction: column; }
                  }
                `}} />
                <div className="footer-grid">
                  <div>
                    <h2 className="fs-2xl fw-black uppercase" style={{ letterSpacing: '0.05em', marginBottom: '1rem' }}>Built in chaos.<br/>Above all.</h2>
                  </div>
                  <div className="footer-links">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Link href="/shop">All Drops</Link>
                      <Link href="/shop#exile-mode">Exile Mode</Link>
                      <Link href="/shop#peak-state">Peak State</Link>
                      <Link href="/shop#fallen-division">Fallen Division</Link>
                      <Link href="/shop#final-form">Final Form</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Link href="/about-us">About Us</Link>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                      <Link href="/refund-policy">Refund Policy</Link>
                      <Link href="/terms-conditions">Terms & Conditions</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--gray-400)', textTransform: 'none' }}>
                      <span>Email: theangelspeak@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="fs-xs" style={{ color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  © {new Date().getFullYear()} Angels Peak. Division 01.
                </div>
              </div>
            </footer>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
