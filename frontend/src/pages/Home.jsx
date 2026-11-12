import Hero from '../components/Hero';
import Nosotros from './Nosotros';

const Home = ({ navegarA }) => {
  return (
    <div>
      <Hero navegarA={navegarA} />
      <Nosotros />
    </div>
  );
};

export default Home;