import {redirect} from '@shopify/remix-oxygen';
import {Outlet} from '@remix-run/react';

export async function loader() {
  return null;
}

export default function Homepage() {
  return (
    <div>
      <div className="home">Welcome to Orion's Razors</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
