export const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
export const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables = {}, cache = 'force-cache' }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { revalidate: 10 } // Revalidate every 10 seconds for fresh products
    });

    const json = await result.json();
    if (json.errors) {
      console.error('Shopify GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch Shopify API');
    }
    return { status: result.status, body: json };
  } catch (error) {
    console.error('Error fetching Shopify:', error);
    return { status: 500, error: 'Error fetching Shopify' };
  }
}

export async function getCollections() {
  const query = `
    query Collections {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            products(first: 20) {
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
                  images(first: 10) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const response = await shopifyFetch({ query, cache: 'no-store' });
  return response.body?.data?.collections?.edges || [];
}

export async function getProducts() {
  const query = `
    query Products {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const response = await shopifyFetch({ query, cache: 'no-store' });
  return response.body?.data?.products?.edges || [];
}

export async function createCart() {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const response = await shopifyFetch({ query, cache: 'no-store' });
  return response.body?.data?.cartCreate?.cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      }
    ]
  };
  
  const response = await shopifyFetch({ query, variables, cache: 'no-store' });
  return response.body?.data?.cartLinesAdd?.cart;
}

export async function updateCartLines(cartId, lines) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const variables = { cartId, lines };
  const response = await shopifyFetch({ query, variables, cache: 'no-store' });
  return response.body?.data?.cartLinesUpdate?.cart;
}

export async function removeFromCart(cartId, lineIds) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const variables = { cartId, lineIds };
  const response = await shopifyFetch({ query, variables, cache: 'no-store' });
  return response.body?.data?.cartLinesRemove?.cart;
}

export async function subscribeToWaitlist(contact) {
  const isEmail = contact.includes('@');
  const randomPassword = Math.random().toString(36).slice(-12) + "A1!"; 
  
  const input = {
    acceptsMarketing: true,
    password: randomPassword
  };

  if (isEmail) {
    input.email = contact;
  } else {
    let phone = contact.replace(/\D/g, '');
    if (phone.length === 10) {
      phone = '+91' + phone;
    } else if (!phone.startsWith('+')) {
      phone = '+' + phone;
    }
    input.phone = phone;
    // Shopify Storefront API strictly requires an email for customer creation.
    // We will generate a placeholder email for phone-only signups.
    input.email = `${phone.replace('+', '')}@waitlist.angelspeak.com`;
  }

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = { input };
  const response = await shopifyFetch({ query, variables, cache: 'no-store' });
  return response.body?.data?.customerCreate;
}
