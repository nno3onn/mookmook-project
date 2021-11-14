import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import ButtonComponent from 'components/button';
import SignInModal from 'components/modal/sign';
import PostModal from 'components/modal/review/post';
import ContactModal from 'components/modal/contact';

import accountSignOut from 'utils/account/signOut';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './index.module.scss';

const Nav = () => {
  const account = useSelector((store) => store.account);

  const [uid, setUid] = useState('');
  const [profile, setProfile] = useState('');
  const [signModalShow, setSignModalShow] = useState(false);
  const [postModalShow, setPostModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    setUid(account.get('uid'));
    setProfile(account.get('photoURL'));
  }, account);

  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      return accountSignOut();
    }
  };

  return (
    <>
      <SignInModal isOpen={signModalShow} setter={setSignModalShow} />
      <PostModal isOpen={postModalShow} setter={setPostModalShow} />
      <ContactModal isOpen={contactModalShow} setter={setContactModalShow} />
      <div className={styles['nav-wrapper']}>
        <div className={styles['nav-items-wrapper']}>
          <Link href="/main">
            <a className={styles['logo']}>Mook-Mook</a>
          </Link>
          <div className={styles['nav-right-wrapper']}>
            {uid ? (
              <>
                <div className={styles['nav-icon']}>
                  <Link href="/main">
                    <a className="bi bi-house-door-fill" />
                  </Link>
                </div>
                <div
                  className={styles['nav-icon']}
                  onClick={() => setContactModalShow(true)}
                >
                  <a className="bi bi-send" />
                </div>
                <div
                  className={styles['nav-icon']}
                  onClick={() => setPostModalShow(true)}
                >
                  <a className="bi bi-plus-square" />
                </div>
                <div className={styles['nav-icon']}>
                  <div
                    className={styles['user']}
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 24,
                      backgroundImage: `url(${profile})`,
                    }}
                    onClick={() => {
                      setIsProfile(!isProfile);
                    }}
                  />
                </div>
              </>
            ) : (
              <ButtonComponent
                width="65px"
                label="로그인"
                backgroundColor="white"
                color="#003366"
                handleClick={() => setSignModalShow(true)}
              />
            )}
          </div>
        </div>
      </div>
      {isProfile ? (
        <ul className={styles['profile-dropdowon-menu']}>
          <li>
            <Link href={`/user/${uid}`}>
              <div classname={styles['link']}>프로필</div>
            </Link>
          </li>
          <li onClick={handleSignOut}>로그아웃</li>
        </ul>
      ) : null}
    </>
  );
};

export default Nav;
