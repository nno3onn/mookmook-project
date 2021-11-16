import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import styles from './index.module.scss';

const ContactModal = ({ isOpen, setter }) => {
  const account = useSelector((store) => store.account);
  const user = account.get('uid');

  const [question, setQuestion] = useState('');

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
  console.log('contactmodal');

  return (
    <Modal show={isOpen} onHide={() => setter(false)}></Modal>
    // <>
    //   <Modal
    //     show={isOpen}
    //     onHide={() => setter(false)}
    //     dialogClassName={styles.modalposition}
    //   >
    //     <Modal.Header closeButton>
    //       <Modal.Title>Give Us FeedBack</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <input
    //         className={styles.inputstyle}
    //         placeholder="🙋‍♂️문의사항이 있다면 적어주세요"
    //         value={question}
    //         onChange={({ target: value }) => setQuestion(value)}
    //       />
    //     </Modal.Body>
    //     <Modal.Footer className={styles.speechbubble}>
    //       <Button variant="secondary" onClick={handleSubmit}>
    //         Send
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </>
  );
};

export default ContactModal;
