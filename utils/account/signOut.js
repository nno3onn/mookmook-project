import { getAuth, signOut } from 'firebase/auth';

const accountSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

export default accountSignOut;
