import Link from 'next/link';
import { products } from '../../../data/products';
import { notFound } from 'next/navigation';
import AddToCartForm from '../../components/AddToCartForm';
import Accordion from '../../components/Accordion';
import ProductCarousel from '../../components/ProductCarousel';

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
    <>
      <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
        <style dangerouslySetInnerHTML={{__html: `
          .product-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; align-items: start; }
          .sticky-info { position: sticky; top: 8rem; padding-right: 1rem; }
          @media (max-width: 768px) {
            .product-grid { grid-template-columns: 1fr; gap: 3rem; }
            .sticky-info { position: static; }
          }
        `}} />
        <div className="product-grid">
          
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={product.image} 
                alt={`${product.title} 1`} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
            <div style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={product.image} 
                alt={`${product.title} 2`} 
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.9) contrast(1.1)' }} 
              />
            </div>
            <div style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={product.image} 
                alt={`${product.title} 3`} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </div>

          <div className="animate-fade-in delay-200 sticky-info" style={{ paddingTop: '1rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h1 className="fs-3xl fw-black uppercase" style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                {product.title}
              </h1>
              <p className="fs-xl" style={{ color: 'var(--accent)' }}>
                {product.price}
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <p className="fs-base" style={{ lineHeight: '1.8', marginBottom: '2rem', color: 'var(--foreground)' }}>
                {product.description}
              </p>
              
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--gray-900)', marginBottom: '2rem' }}>
                <p className="fs-sm" style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }}>{product.fabric}</p>
                <p className="fs-sm fw-bold" style={{ color: 'var(--accent)' }}>{product.scarcity}</p>
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <AddToCartForm product={product} />
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
                <p className="fs-xs uppercase" style={{ color: 'var(--gray-400)', letterSpacing: '0.05em' }}>
                  Free prepaid shipping pan-India · easy size exchanges · dispatched in 24–48h.
                </p>
              </div>
            </div>

            <Accordion title="Size Guide">
              <p className="fs-sm" style={{ color: 'var(--gray-400)', lineHeight: '1.6' }}>
                Angels Peak is cut oversized on purpose — dropped shoulders, room to move, the drape the silhouette is built around. If you want the intended fit, take your normal size. If you'd rather it sit closer to the body, size down one. The model is wearing size L.
              </p>
            </Accordion>
            
            <Accordion title="Shipping & Exchanges">
              <p className="fs-sm" style={{ color: 'var(--gray-400)', lineHeight: '1.6' }}>
                We back the make, so we back you. If the size isn't right, we'll exchange it — fast, prepaid, no story required. Pieces should come back unworn, unwashed, with tags on, within 7 days of delivery. Because every drop is limited, we exchange rather than refund wherever we can; if your size has sold out, we'll make it right.
              </p>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid var(--gray-800)' }}>
      <ProductCarousel />
    </div>
    </>
  );
}
