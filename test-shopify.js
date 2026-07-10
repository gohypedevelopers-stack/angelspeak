const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '51q8ch-m3.myshopify.com';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '81f006fbb5e4668401d0d8bba9ebbabe';

async function fetchProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

fetchProducts();
