import React from "react";
import { useSelector } from "react-redux";
import { Offcanvas, Button, Image } from "react-bootstrap";
import { provider, auth } from "../_app";

import styles from "./styles.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpPage = ({ show, onHide }) => {
  const account = useSelector((store) => store.account);
  const displayName = account.get("displayName");
  const photoURL = account.get("photoURL");
  const email = account.get("email");

  function loginFacebook() {
    auth().signInWithPopup(provider.facebook);
  }

  function loginGoogle() {
    auth().signInWithPopup(provider.google);
  }

  function logout() {
    alert("계정이 로그아웃 되었습니다.");
    auth()
      .signOut()
      .catch((err) => {
        console.error("logout error: ", err);
      });
  }

  function Loging() {
    if (displayName === "") {
      return (
        <>
          <Button
            variant="light"
            className={styles.google}
            onClick={loginGoogle}
          >
            <i className="bi bi-google" /> Sign in with Google
          </Button>
          <br />
          <Button
            variant="primary"
            className={styles.facebook}
            onClick={loginFacebook}
          >
            <i className="bi bi-facebook" /> Sign in with Facebook
          </Button>
          <br />
        </>
      );
    }
    return (
      <div className={styles["post-component"]}>
        <p className={styles.hi}>{`${displayName}님, 안녕하세요 !`}</p>
        <Image className={styles.image} src={photoURL} width="80" height="80" />
        <div className={styles.text}>{displayName}</div>
        <div className={styles.email}>{email}</div>
        <div className={styles.border} />
        <Button className={styles.logout} variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Offcanvas
      className={styles["post-container"]}
      show={show}
      onHide={onHide}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={styles["post-header"]}>
          Sign
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Loging />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SignUpPage;
