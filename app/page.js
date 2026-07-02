import Link from 'next/link';
import { products } from '../data/products';
import ProductCarousel from './components/ProductCarousel';
import PromoBanner from './components/PromoBanner';
import ProductGrid from './components/ProductGrid';
import ScrollReveal from './components/ScrollReveal';

export default function Home() {
  return (
    <>
      {/* 1. CINEMATIC HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="parallax-bg"
          style={{ 
            position: 'absolute', inset: 0, zIndex: -1,
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.4) contrast(1.2) grayscale(0.5)'
          }}
          src="/video.mp4"
        />
        <div className="container animate-fade-in" style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="fw-normal uppercase" style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', whiteSpace: 'nowrap', marginBottom: '1.5rem', color: 'var(--foreground)' }}>
            EVERY PIECE IS A CHANNEL
          </h1>
          <p className="fs-lg delay-200 animate-fade-in" style={{ maxWidth: '800px', marginBottom: '3rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            The garment is the channel between you and the force pulling you toward your peak
          </p>

        </div>
      </section>

      {/* 2. SCROLLING MARQUEE */}
      <div className="marquee-container fs-xl fw-black uppercase" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', padding: '1.5rem 0', letterSpacing: '0.05em' }}>
        <div className="marquee-content">
          <span>WEAR YOUR ASCENT</span>
          <span>//</span>
          <span>BUILT IN CHAOS</span>
          <span>//</span>
          <span>A BRAND BUILT IN CHAOS</span>
          <span>//</span>
          <span>THE ANGEL HAS YOUR BACK</span>
          <span>//</span>
          <span>WEAR YOUR ASCENT</span>
          <span>//</span>
          <span>BUILT IN CHAOS</span>
          <span>//</span>
          <span>A BRAND BUILT IN CHAOS</span>
          <span>//</span>
          <span>THE ANGEL HAS YOUR BACK</span>
          <span>//</span>
        </div>
      </div>



      {/* 4. HORIZONTAL DROPS CAROUSEL */}
      <ProductCarousel />

      {/* NEW: PROMO BANNER */}
      <PromoBanner />

      {/* NEW: 4.5 ALL PIECES GRID */}
      <ProductGrid />

      {/* 5. DROP HIGHLIGHT (EDITORIAL SPOTLIGHT) */}
      <section style={{ backgroundColor: 'var(--background)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1800px', position: 'relative' }}>
          <ScrollReveal delay={100}>
            <div className="editorial-layout" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', minHeight: '80vh' }}>
              
              {/* Massive Image Container */}
              <div className="editorial-img-container" style={{ width: '80%', height: '100%', position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
                <img src="/product1.jpg" alt="The Ascent Tee Detail" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'contrast(1.05)' }} />
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', backgroundColor: 'var(--accent)', color: 'var(--foreground)', padding: '0.5rem 1rem', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.1em', borderRadius: '4px' }}>
                  FLAGSHIP 01
                </div>
              </div>

              {/* Glassmorphism Overlapping Card */}
              <div className="editorial-card" style={{ 
                width: 'clamp(320px, 40vw, 500px)', 
                marginLeft: 'auto', 
                marginRight: '2rem',
                backgroundColor: 'rgba(10, 10, 10, 0.65)', 
                backdropFilter: 'blur(16px)', 
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: 'clamp(2rem, 5vw, 4rem)', 
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <p className="fs-sm fw-bold uppercase" style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.2em' }}>The Brand Statement</p>
                
                <h2 className="fw-black uppercase" style={{ 
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                  lineHeight: '0.9', 
                  marginBottom: '2rem', 
                  letterSpacing: '-0.02em',
                  color: 'var(--foreground)'
                }}>
                  The<br/>Ascent<br/>Tee
                </h2>
                
                <p className="fs-base" style={{ color: 'var(--gray-400)', marginBottom: '3rem', lineHeight: '1.6' }}>
                  The whole world on one chest. The Angels Peak wordmark, the wings, the mark of everything we climb toward. If you own one piece from the house, own this one.
                </p>
                
                <Link href="/shop/the-ascent-tee" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 2rem',
                  border: '1px solid var(--foreground)',
                  borderRadius: '30px',
                  color: 'var(--foreground)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease'
                }} className="glass-btn">
                  EXPLORE THE PIECE
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>

            </div>
          </ScrollReveal>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .glass-btn:hover { background-color: var(--foreground); color: var(--background) !important; padding-left: 2.5rem; padding-right: 1.5rem; }
          @media (max-width: 1024px) {
            .editorial-layout { flex-direction: column !important; min-height: auto !important; }
            .editorial-img-container { position: relative !important; width: 100% !important; height: 60vh !important; }
            .editorial-card { width: 90% !important; margin: -10vh auto 0 !important; }
          }
        `}} />
      </section>

      {/* NEW: 6. THE MOTION (REELS CAROUSEL - CHAPTER 2 INSPIRED) */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--background)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '3rem' }}>
          <h2 className="fs-3xl fw-black uppercase text-center">In Motion</h2>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .reel-video { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) brightness(0.6); transition: all 0.3s ease; }
          .group:hover .reel-video { filter: grayscale(0%) brightness(1); transform: scale(1.05); }
          @keyframes scrollLeftMotion {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.5rem)); }
          }
          .motion-track {
            display: flex;
            gap: 1rem;
            width: max-content;
            animation: scrollLeftMotion 40s linear infinite;
          }
          .motion-track:hover {
            animation-play-state: paused;
          }
        `}} />
        <ScrollReveal delay={200}>
          <div className="motion-track">
            {[
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509631179647-0c1158a474c1?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509631179647-0c1158a474c1?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=600&auto=format&fit=crop"
            ].map((img, i) => (
              <div key={i} className="group" style={{ minWidth: 'clamp(260px, 75vw, 320px)', width: 'clamp(260px, 75vw, 320px)', aspectRatio: '9/16', flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: 'var(--gray-900)' }}>
                <img 
                  src={img} 
                  alt={`Motion ${i}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.7)' }} 
                  className="hover-scale"
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ width: '60px', height: '60px', border: '2px solid var(--foreground)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid var(--foreground)', marginLeft: '5px' }}></div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                  <p className="fs-sm fw-bold uppercase" style={{ color: 'var(--foreground)' }}>VIEW REEL {(i % 9) + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 7. CHAPTER BLOCKS (ASYMMETRICAL GRID) */}
      <section style={{ padding: '0 clamp(1rem, 5vw, 2rem) 8rem' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .chapter-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; max-width: 1440px; margin: 0 auto; }
          .chapter-col-8 { grid-column: span 8; aspect-ratio: 16/9; }
          .chapter-col-4 { grid-column: span 4; aspect-ratio: 3/4; }
          @media (max-width: 768px) {
            .chapter-grid { grid-template-columns: 1fr; }
            .chapter-col-8, .chapter-col-4 { grid-column: span 1; aspect-ratio: 4/5; }
          }
        `}} />
        <ScrollReveal delay={100}>
          <div className="chapter-grid">
            
            <Link href="/about-us" className="group chapter-col-8 parallax-bg hover-scale" style={{ 
              position: 'relative', overflow: 'hidden', display: 'block',
              backgroundImage: 'url("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop")',
              backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', transition: 'background-color 0.4s ease' }} className="overlay"></div>
              <div style={{ position: 'absolute', bottom: 'clamp(1rem, 5vw, 3rem)', left: 'clamp(1rem, 5vw, 3rem)', zIndex: 2 }}>
                <p className="fs-sm uppercase fw-bold" style={{ color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>CHAPTER 01</p>
                <h3 className="fs-4xl fw-black uppercase">ORIGIN</h3>
              </div>
            </Link>

            <Link href="/about-us" className="group chapter-col-4 parallax-bg hover-scale" style={{ 
              position: 'relative', overflow: 'hidden', display: 'block',
              backgroundImage: 'url("https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop")',
              backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', transition: 'background-color 0.4s ease' }} className="overlay"></div>
              <div style={{ position: 'absolute', bottom: 'clamp(1rem, 5vw, 3rem)', left: 'clamp(1rem, 5vw, 2rem)', zIndex: 2 }}>
                <p className="fs-sm uppercase fw-bold" style={{ color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>CHAPTER 02</p>
                <h3 className="fs-3xl fw-black uppercase">WILDERNESS</h3>
              </div>
            </Link>

          </div>
        </ScrollReveal>
      </section>

      {/* 8. THE CLIMBERS (COMMUNITY/UGC GRID) */}
      <section style={{ padding: '4rem 0 8rem', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="fs-3xl fw-black uppercase">The Climbers</h2>
          <p className="fs-sm uppercase" style={{ color: 'var(--gray-400)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>Tested in isolation. Worn in chaos.</p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scrollLeftClimbers {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.5rem)); }
          }
          .climbers-track {
            display: flex;
            gap: 1rem;
            width: max-content;
            animation: scrollLeftClimbers 35s linear infinite;
          }
          .climbers-track:hover {
            animation-play-state: paused;
          }
        `}} />
        <ScrollReveal delay={200}>
          <div className="climbers-track">
            {[
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511511450040-677116ff389e?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1484515991647-c5760fce5c70?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511511450040-677116ff389e?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1484515991647-c5760fce5c70?q=80&w=600&auto=format&fit=crop"
            ].map((img, i) => (
              <div key={i} style={{ minWidth: '300px', width: '300px', aspectRatio: '4/5', flexShrink: 0, overflow: 'hidden' }}>
                <img src={img} alt={`Community ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* NEW: 3. THE MANIFESTO (CHAPTER 2 INSPIRED) */}
      <section style={{ padding: '10rem 2rem', backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
        <ScrollReveal delay={100}>
          <div className="container" style={{ maxWidth: '1200px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
              <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)' }}></div>
              <p className="fs-sm uppercase fw-bold" style={{ color: 'var(--accent)', letterSpacing: '0.2em', margin: 0 }}>The Manifesto</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 className="fw-black uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.9', letterSpacing: '-0.03em', color: 'var(--foreground)' }}>
                Angels Peak is a<br/>
                <span style={{ WebkitTextStroke: '2px var(--foreground)', color: 'transparent' }}>manifesto</span> of <span style={{ color: 'var(--gray-500)', fontStyle: 'italic' }}>resilience.</span>
              </h2>
              

              
              <h2 className="fw-black uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.9', letterSpacing: '-0.03em', color: 'var(--foreground)', marginTop: '2rem' }}>
                We reject the valley.<br/>
                <span style={{ borderBottom: '6px solid var(--foreground)', paddingBottom: '0.5rem' }}>We embrace the climb.</span>
              </h2>
            </div>
            
            <div style={{ marginTop: '6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
              <img src="/Angel_peak_logo_White.png" alt="Icon" style={{ height: '40px', opacity: 0.5 }} />
              <p className="fs-base uppercase fw-bold" style={{ maxWidth: '400px', textAlign: 'right', color: 'var(--gray-400)', lineHeight: '1.6' }}>
                Creating pieces that act as a channel between you and your peak.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
      {/* 9. WAITLIST / NEWSLETTER */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className="fs-4xl fw-black uppercase" style={{ marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            YOU'RE EARLY.<br/>THAT'S THE POINT.
          </h2>
          <p className="fs-base fw-bold uppercase" style={{ color: 'var(--gray-800)', marginBottom: '3rem', letterSpacing: '0.05em' }}>
            Built in Chaos drops soon. The waitlist climbs first. Leave your number. We'll open the door before anyone else.
          </p>
          <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto', flexDirection: 'column' }}>
            <input 
              type="text" 
              placeholder="Enter your email or WhatsApp..." 
              style={{ padding: '1.2rem', fontSize: '1rem', border: '2px solid var(--background)', backgroundColor: 'transparent', color: 'var(--background)', outline: 'none', width: '100%', fontWeight: '500' }} 
            />
            <button className="btn btn-full" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', padding: '1.2rem', fontSize: '1rem', border: 'none' }}>
              JOIN THE CLIMB
            </button>
          </form>
        </div>
      </section>

    </>
  );
}
