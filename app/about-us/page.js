export default function AboutUs() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="fs-4xl fw-black uppercase animate-fade-in" style={{ marginBottom: '4rem', letterSpacing: '0.05em' }}>
            About Us
          </h1>

          <div className="fs-lg animate-fade-in delay-200" style={{ lineHeight: '1.8', color: 'var(--accent)' }}>
            <p style={{ marginBottom: '2rem' }}>
              Angels Peak is about ascension — the climb toward your highest self, your peak.
            </p>
            <p style={{ marginBottom: '4rem' }}>
              The angel is the guardian force that walks the climb with you. Not a flex. A companion. And the garment is the channel between you and that force — something you put on when you need reminding what you're climbing toward.
            </p>

            <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
              The story moves in four chapters.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div>
                <h3 className="fs-base fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  BUILT IN CHAOS — the origin.
                </h3>
                <p>
                  Where it begins: loud, unformed, alive. You start here, in the noise, before anything is certain.
                </p>
              </div>

              <div>
                <h3 className="fs-base fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  EXILE MODE — the wilderness.
                </h3>
                <p>
                  You go inward. You leave the crowd to hear yourself think far beyond human limits.
                </p>
              </div>

              <div>
                <h3 className="fs-base fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  FALLEN DIVISION — the relapse and the return.
                </h3>
                <p>
                  You fall. Everyone does. The chapter is not the fall; it's what you do after it.
                </p>
              </div>

              <div>
                <h3 className="fs-base fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  PEAK STATE — the summit.
                </h3>
                <p>
                  The arrival. You outlast the chaos that built you.
                </p>
              </div>
            </div>

            <p style={{ marginTop: '4rem', color: 'var(--foreground)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Every drop advances the story. People don't buy one tee — they collect chapters.<br/>
              Wear your ascent.
            </p>

            <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--gray-800)' }}>
              <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
                Brand Information
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--gray-400)' }}>
                [BRAND_DESCRIPTION]
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--gray-400)' }}>
                <p><strong>Email:</strong> [EMAIL]</p>
                <p><strong>Phone:</strong> [PHONE_NUMBER]</p>
                <p><strong>Address:</strong> [ADDRESS]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
