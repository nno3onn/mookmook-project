import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  router.push('/main');

  return null;
};

export default Home;
