import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';

const Nav = ({ uid }) => {
  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // accountSignOut();
    }
  };

  return <div className={styles['nav-wrapper']}>dd</div>;
};

export default Nav;
