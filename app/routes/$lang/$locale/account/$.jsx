import {redirect} from '@shopify/remix-oxygen';

// fallback wild card for all unauthenticated routes in account section
/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  console.log('am i here');
  await context.customerAccount.handleAuthStatus();
  console.log('how about here');
  return redirect('/account', {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  });
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
