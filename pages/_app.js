/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import AuthHoc from 'components/hocs';
import firebaseInit from 'utils/common/firebaseInit';

import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducers from 'redux/reducers';

import 'styles/globals.scss';

const App = ({ Component, pageProps }) => {
  firebaseInit();

  return (
    <AuthHoc>
      <Component {...pageProps} />
    </AuthHoc>
  );
};

const makeStore = (initialState) => createStore(reducers, initialState);
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
