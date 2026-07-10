import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartForm from '../../components/AddToCartForm';
import ProductCarousel from '../../components/ProductCarousel';
import ProductTabs from '../../components/ProductTabs';
import ProductGallery from '../../components/ProductGallery';
import PromoBanner from '../../components/PromoBanner';
import { shopifyFetch, getProducts } from '../../lib/shopify';

export async function generateStaticParams() {
  const rawProducts = await getProducts();
  return rawProducts.map((edge) => ({
    slug: edge.node.handle,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        priceRange {
          minVariantPrice { amount }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 10) {
          edges { node { id title } }
        }
      }
    }
  `;
  
  const res = await shopifyFetch({ query, variables: { handle: slug } });
  const product = res.body?.data?.product;

  if (!product) {
    notFound();
  }
  
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0).toLocaleString('en-IN');
  const rawProducts = await getProducts();
  const allProducts = rawProducts.map(edge => edge.node);

  return (
    <>
      <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container">
        <style dangerouslySetInnerHTML={{__html: `
          .product-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: start; }
          .sticky-info { position: sticky; top: 8rem; padding-right: 1rem; }
          @media (max-width: 768px) {
            .product-grid { grid-template-columns: 1fr; gap: 3rem; }
            .sticky-info { position: static !important; padding-left: 0 !important; }
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
                ₹{price}
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <AddToCartForm product={product} />
            </div>

            <ProductTabs description={product.descriptionHtml || 'No description available.'} fabric="100% Premium Material. Crafted for comfort and durability." />
            
          </div>
        </div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '2rem' }}>
      <ProductCarousel products={allProducts.slice(0, 8)} />
    </div>
    <div style={{ borderTop: '1px solid var(--gray-800)', borderBottom: '1px solid var(--gray-800)' }}>
      <PromoBanner />
    </div>
    <div style={{ paddingTop: '2rem' }}>
      <ProductCarousel products={allProducts.slice(0, 8)} />
    </div>
    </>
  );
}
