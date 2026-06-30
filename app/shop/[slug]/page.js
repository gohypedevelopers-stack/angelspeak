import Link from 'next/link';
import { products } from '../../../data/products';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          
          <div className="animate-fade-in" style={{ backgroundColor: 'var(--gray-900)', aspectRatio: '3/4', position: 'sticky', top: '4rem' }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9)' }} 
            />
          </div>

          <div className="animate-fade-in delay-200" style={{ paddingTop: '2rem' }}>
            <div style={{ marginBottom: '4rem' }}>
              <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>
                {product.title}
              </h1>
              <p className="fs-xl" style={{ color: 'var(--accent)' }}>
                {product.price}
              </p>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <p className="fs-base" style={{ lineHeight: '1.8', marginBottom: '2rem', color: 'var(--foreground)' }}>
                {product.description}
              </p>
              
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--gray-900)', marginBottom: '2rem' }}>
                <p className="fs-sm" style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }}>{product.fabric}</p>
                <p className="fs-sm fw-bold" style={{ color: 'var(--accent)' }}>{product.scarcity}</p>
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <button className="btn btn-full" style={{ padding: '1.5rem', fontSize: '1rem' }}>
                CLAIM THIS PIECE
              </button>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
                <p className="fs-xs" style={{ color: 'var(--gray-400)' }}>
                  Free prepaid shipping pan-India · easy size exchanges · dispatched in 24–48h.
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
              <h3 className="fs-sm fw-bold uppercase" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>Size Guide</h3>
              <p className="fs-sm" style={{ color: 'var(--gray-400)', lineHeight: '1.6' }}>
                Angels Peak is cut oversized on purpose — dropped shoulders, room to move, the drape the silhouette is built around. If you want the intended fit, take your normal size. If you'd rather it sit closer to the body, size down one. The model is wearing size L.
              </p>
            </div>
            
            <div style={{ borderTop: '1px solid var(--gray-800)', marginTop: '2rem', paddingTop: '2rem' }}>
              <h3 className="fs-sm fw-bold uppercase" style={{ marginBottom: '1rem', letterSpacing: '0.05em' }}>Exchanges</h3>
              <p className="fs-sm" style={{ color: 'var(--gray-400)', lineHeight: '1.6' }}>
                We back the make, so we back you. If the size isn't right, we'll exchange it — fast, prepaid, no story required. Pieces should come back unworn, unwashed, with tags on, within 7 days of delivery. Because every drop is limited, we exchange rather than refund wherever we can; if your size has sold out, we'll make it right.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
