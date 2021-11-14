import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './index.module.scss';

const PostModal = ({ isOpen, setter }) => {
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // data request
    setLoading(false);
  }, []);

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
          <div>create review</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
