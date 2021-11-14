import { getAuth, signOut } from 'firebase/auth';

const accountSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);

    alert('계정이 로그아웃 되었습니다.');
    window.location.reload();
  } catch (err) {
    throw err;
  }
};

export default accountSignOut;
