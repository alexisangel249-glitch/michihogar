const Hero = ({ navegarA }) => {
  return (
    <section className="bg-michi-bg py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-michi-primary mb-6">
          Adopta amor, equipa su hogar 🐾
        </h2>
        <p className="font-body text-lg text-michi-text/80 mb-8">
          En MichiAdopta Shop rescatamos, cuidamos y buscamos el hogar perfecto 
          para cada michi.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navegarA && navegarA('adoptar')}
            className="bg-michi-primary text-white font-bold py-3 px-8 rounded-full hover:bg-michi-primary/90 cursor-pointer"
          >
            Quiero Adoptar
          </button>
          <button 
            onClick={() => navegarA && navegarA('tienda')}
            className="bg-michi-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-michi-secondary/90 cursor-pointer"
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;