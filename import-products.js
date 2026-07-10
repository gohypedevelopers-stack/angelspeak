import fs from 'fs';
import path from 'path';

import { products } from './data/products.js';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '51q8ch-m3.myshopify.com';
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';

async function importProducts() {
  console.log("Testing connection...");
  try {
    const res = await fetch("https://" + domain + "/admin/api/2024-01/graphql.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query: "{ shop { name } }" }),
    });

    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}

importProducts();
