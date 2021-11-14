import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

import styles from './index.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignInModal = ({ isOpen, setter }) => {
  const handleSignIn = async (social) => {
    const auth = getAuth();
    const provider =
      social === 'google'
        ? new GoogleAuthProvider()
        : social === 'facebook'
        ? new FacebookAuthProvider()
        : null;

    if (provider) {
      try {
        await signInWithPopup(auth, provider);
        setter(false);
        return window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Modal
      centered
      show={isOpen}
      onHide={() => setter(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className={styles['modal-wrapper']}>
          <div
            className={styles['close-wrapper']}
            onClick={() => setter(false)}
          >
            <i className="bi bi-x-lg" />
          </div>
          <div className={styles['logo']}>MookMook</div>
          <div className={styles['button-wrapper']}>
            <Button
              variant="light"
              className={styles['google']}
              onClick={() => handleSignIn('google')}
            >
              <i className="bi bi-google" />
              Sign in with Google
            </Button>
            <br />
            <Button
              variant="primary"
              className={styles['facebook']}
              onClick={() => handleSignIn('facebook')}
            >
              <i className="bi bi-facebook" />
              Sign in with Facebook
            </Button>
            <br />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
