import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {Money} from '@shopify/hydrogen';
import {RECOMMENDED_PRODUCTS_QUERY} from './$lang.$locale_.products';

export async function loader({params, context}) {
  const {productUrlName} = params;
  // I know this is silly
  const productTitle = productUrlName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const {storefront} = context;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({recommendedProducts, productTitle});
}

export default function Product() {
  const {recommendedProducts, productTitle} = useLoaderData<typeof loader>();

  return (
    <div className="product">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={recommendedProducts}>
          {({products}) => {
            console.log(products.nodes[1].title, productTitle);
            const product = products.nodes.find(
              (product) => product.title === productTitle,
            );
            console.log(product);
            return (
              <>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <img
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText}
                />
                <p>
                  <Money data={product.priceRange.minVariantPrice} />
                </p>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
