export default function RefundPolicy() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '2rem' }}>Refund Policy</h1>
        <div style={{ color: 'var(--gray-400)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
          </p>
          
          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>Eligibility</h2>
          <p>
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
          </p>

          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>Damages and Issues</h2>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>

          <h2 className="fs-xl fw-bold uppercase" style={{ color: 'var(--foreground)', marginTop: '2rem' }}>Refunds</h2>
          <p>
            We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>

          <p style={{ marginTop: '2rem' }}>
            For all return inquiries, contact us at theangelspeak@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
