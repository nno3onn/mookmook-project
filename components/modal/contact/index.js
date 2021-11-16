import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import styles from './index.module.scss';
import ButtonComponent from 'components/button';

const ContactModal = ({ isOpen, setter }) => {
  const account = useSelector((store) => store.account);
  const user = account.get('uid');

  const [text, setText] = useState('');

  const handleClick = async () => {
    try {
      if (text.length > 0) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, text }),
        });
        setter(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log('contactmodal');

  return (
    <Modal
      show={isOpen}
      onHide={() => setter(false)}
      dialogClassName={styles['modal-wrapper']}
      centered
    >
      <div className={styles['header-wrapper']}>문의 사항</div>
      <div className={styles['input-wrapper']}>
        <input
          className={styles.inputstyle}
          placeholder="🙋‍♂️문의사항이 있다면 적어주세요"
          value={text}
          onChange={({ target: value }) => console.log(value)}
        />
      </div>
      <div className={styles['btn-wrapper']}>
        <ButtonComponent label="전송" onClick={handleClick} />
      </div>
    </Modal>
  );
};

export default ContactModal;
