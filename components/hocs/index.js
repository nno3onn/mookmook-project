/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {
  AR_signOut,
  AR_updateAccountInfo,
} from 'redux/reducers/accountReducer';

import LoadingView from 'components/loading';
import Nav from 'components/nav';

import styles from './index.module.scss';

const AuthHoc = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        // console.log(user);

        if (!user) {
          dispatch(AR_signOut());
        } else {
          const updateData = [
            ['uid', user.uid],
            ['email', user.email],
            ['phoneNumber', user.phoneNumber],
            ['displayName', user.displayName],
            ['photoURL', user.photoURL],
          ];
          dispatch(AR_updateAccountInfo(updateData));
        }
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (loading) return <LoadingView />;

  return (
    <>
      <Nav />
      <div className={styles.page}>
        <div className={styles.contents}>{children}</div>
      </div>
    </>
  );
};

export default AuthHoc;
