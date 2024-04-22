import {redirect} from '@shopify/remix-oxygen';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request}) {
  if (!request.url.includes('en/us')) {
    return redirect(`/en/us${new URL(request.url).pathname}`);
  }
  //
  // throw new Response(`${new URL(request.url).pathname} not found`, {
  //   status: 404,
  // });
}

export default function CatchAllPage() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
