import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Suspense} from 'react';

export async function loader({params, context}) {
  const {lang, locale} = params;

  if (lang !== 'en' || !['us', 'ca'].includes(locale))
    return redirect('/en/us');

  const {storefront} = context;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer(
    {recommendedProducts, locale},
    {headers: {'Oxygen-Cache-Control': 'public, max-age=180'}},
  );
}

export default function _products() {
  const {recommendedProducts} = useLoaderData<typeof loader>();

  return (
    <div className="products">
      <>
        <RecommendedProducts products={recommendedProducts} />
      </>
    </div>
  );
}

function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`${product.title.toLowerCase().split(' ').join('-')}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
