import Link from 'next/link';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import './globals.css';

export const metadata = {
  title: 'ANGELS PEAK | Built in Chaos',
  description: 'Angels Peak is for the ones climbing. Built in chaos, tested in isolation, fallen and risen — every piece is a channel between you and the force pulling you toward your peak. Wear your ascent.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CartProvider>
          <div className="noise-overlay"></div>
          <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--background)' }}>
            <div className="announcement-bar fs-xs fw-bold text-center uppercase" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', padding: '8px 0', letterSpacing: '0.05em' }}>
              DROP 1 — BUILT IN CHAOS. 1 AUGUST. 250 PIECES. NO RESTOCK.
            </div>
            <Navbar />
          </div>
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
                    <Link href="/world">The World</Link>
                    <Link href="/shop">The Drops</Link>
                    <Link href="#">Join the Climb</Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--gray-400)' }}>
                    <Link href="#">Size & Fit</Link>
                    <Link href="#">Exchanges</Link>
                    <Link href="#">FAQ</Link>
                    <Link href="#">Contact</Link>
                  </div>
                </div>
              </div>
              <div className="fs-xs" style={{ color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                © {new Date().getFullYear()} Angels Peak. Division 01.
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
