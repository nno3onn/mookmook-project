import React from 'react';
import Head from 'next/head';
import Nav from './nav';

const Helmet = ({ title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Nav />
  </div>
);

export default Helmet;
