import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import styles from './index.module.scss';

const ContactModal = ({ isOpen, setter }) => {
  const [question, setQuestion] = useState('');
  const account = useSelector((store) => store.account);
  const user = account.get('uid');

  const handleQuestion = ({ target: { value } }) => setQuestion(value);

  const handleSubmit = async () => {
    try {
      if (question.length > 0) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, question }),
        });
        setter(false);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={setter(false)}
        dialogClassName={styles.modalposition}
      >
        <Modal.Header closeButton>
          <Modal.Title>Give Us FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className={styles.inputstyle}
            placeholder="🙋‍♂️문의사항이 있다면 적어주세요"
            value={question}
            onChange={handleQuestion}
          />
        </Modal.Body>
        <Modal.Footer className={styles.speechbubble}>
          {/* <Button variant="secondary" onClick={handleSubmit}>
            Send
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
