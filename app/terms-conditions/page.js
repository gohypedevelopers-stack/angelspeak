export default function TermsConditions() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '2rem' }}>Terms & Conditions</h1>
        <div style={{ color: 'var(--gray-400)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Welcome to Angels Peak. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Angels Peak if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>License</h2>
          <p>
            Unless otherwise stated, Angels Peak and/or its licensors own the intellectual property rights for all material on Angels Peak. All intellectual property rights are reserved. You may access this from Angels Peak for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>User Comments</h2>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Angels Peak does not filter, edit, publish or review Comments prior to their presence on the website.
          </p>

          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>Contact Information</h2>
          <p>
            For any queries regarding our terms, please contact us at [EMAIL] or [PHONE_NUMBER].
          </p>
        </div>
      </div>
    </div>
  );
}
