import Link from 'next/link';
import { products } from '../../data/products';

export default function Shop() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container">
        <div style={{ marginBottom: '6rem', textAlign: 'center' }} className="animate-fade-in">
          <h1 className="fs-4xl fw-black uppercase" style={{ marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
            The Drops
          </h1>
          <p className="fs-base" style={{ color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Drop 1 — Built in Chaos. Six pieces, limited numbers, no restock. Choose your chapter.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '4rem 2rem' }}>
          {products.map((product, index) => (
            <Link href={`/shop/${product.slug}`} key={product.id} className={`animate-fade-in delay-${(index % 3) * 100}`} style={{ display: 'block' }}>
              <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--gray-900)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9)', transition: 'transform 0.5s ease' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="fw-bold uppercase fs-base" style={{ letterSpacing: '0.05em' }}>{product.title}</h2>
                  <span className="fs-sm" style={{ color: 'var(--accent)' }}>{product.price}</span>
                </div>
                <p className="fs-xs" style={{ color: 'var(--gray-400)' }}>{product.chapter}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
