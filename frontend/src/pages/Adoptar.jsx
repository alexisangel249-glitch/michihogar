import { useEffect } from 'react';
import CatGatos from '../components/CatGatos';

const Adoptar = ({ navegarA }) => {
  useEffect(() => {
    const handleNavegar = () => {
      if (navegarA) {
        navegarA('formularios');
      }
    };

    window.addEventListener('navegarAFormularios', handleNavegar);
    return () => window.removeEventListener('navegarAFormularios', handleNavegar);
  }, [navegarA]);

  return (
    <div>
      <CatGatos navegarA={navegarA} />
    </div>
  );
};

export default Adoptar;