import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({params, context}) {
  console.log(params);

  return redirect('/en/us');
}

export default function Index() {
  return <div>Hi</div>;
}

/**
 * @param {LoaderFunctionArgs}
 */
