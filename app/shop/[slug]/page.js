import Link from 'next/link';
import { products } from '../../../data/products';
import { notFound } from 'next/navigation';
import AddToCartForm from '../../components/AddToCartForm';
import ProductCarousel from '../../components/ProductCarousel';
import ProductTabs from '../../components/ProductTabs';
import ProductGallery from '../../components/ProductGallery';
import PromoBanner from '../../components/PromoBanner';

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
          .product-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: start; }
          .sticky-info { position: sticky; top: 8rem; padding-right: 1rem; }
          @media (max-width: 768px) {
            .product-grid { grid-template-columns: 1fr; gap: 3rem; }
            .sticky-info { position: static; }
          }
        `}} />
        <div className="product-grid">
          
          <ProductGallery product={product} />

          <div className="animate-fade-in delay-200 sticky-info" style={{ paddingTop: '1rem', paddingLeft: '2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h1 className="fs-3xl fw-bold uppercase" style={{ marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                {product.title}
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-200)', fontWeight: '500' }}>
                {product.price}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <AddToCartForm product={product} />
            </div>

            <ProductTabs description={product.description} fabric={product.fabric} />
            
          </div>
        </div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
      <ProductCarousel />
    </div>
    <div style={{ borderTop: '1px solid var(--gray-800)', borderBottom: '1px solid var(--gray-800)' }}>
      <PromoBanner />
    </div>
    <div style={{ paddingTop: '2rem' }}>
      <ProductCarousel />
    </div>
    </>
  );
}
