/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <div className="text-center my-4">
      <h1 className="Txt">
        Welcome, {user.fbUser.displayName}!
      </h1>
      <div>
        <Link href="/albums/new" passHref>
          <Button className="homeButton">Create an order</Button>
        </Link>
        <Link href="/albums/new" passHref>
          <Button className="homeButton">View your orders</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
