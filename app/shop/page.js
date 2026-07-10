import { getCollections, getProducts } from '../lib/shopify';
import ShopClient from './ShopClient';

export default async function Shop() {
  const collections = await getCollections();
  const rawProducts = await getProducts();
  const allProducts = rawProducts.map(edge => edge.node);

  return <ShopClient collections={collections} allProducts={allProducts} />;
}
