import {redirect} from '@shopify/remix-oxygen';

export async function loader({params, context}) {
  const {lang, locale} = params;
  if (lang !== 'en' || !['us', 'ca'].includes(locale))
    return redirect('/en/us');

  return null;
}

export default function Homepage() {
  return <div className="home">Welcome to Orion's Razors</div>;
}
