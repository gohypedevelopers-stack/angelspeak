import { NextResponse } from 'next/server';
import { getProducts } from '../../lib/shopify';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  if (!q) {
    return NextResponse.json({ products: [] });
  }

  const query = q.toLowerCase();
  const rawProducts = await getProducts();
  const allProducts = rawProducts.map(edge => edge.node);
  
  const filteredProducts = allProducts.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(query);
    return titleMatch;
  });

  return NextResponse.json({ products: filteredProducts.slice(0, 5) });
}
