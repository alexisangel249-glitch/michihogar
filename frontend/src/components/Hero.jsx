const Hero = ({ navegarA }) => {
  return (
    <section className="michi-hero relative isolate overflow-hidden">
      <div className="michi-hero-photo" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=90"
          alt=""
        />
      </div>
      <div className="michi-hero-leaves" aria-hidden="true">🌿</div>
      <div className="michi-hero-content relative z-10">
        <div className="michi-hero-copy">
          <h1 className="font-heading">
            Adopta amor, equipa su hogar <span aria-hidden="true">🐾</span>
          </h1>
          <p>
            En MichiAdopta Shop rescatamos, cuidamos y buscamos el hogar perfecto
            para cada michi. Con tu ayuda, cada ronroneo tiene una nueva oportunidad.
          </p>
          <div className="michi-hero-actions">
            <button onClick={() => navegarA && navegarA('adoptar')} className="michi-button michi-button-primary">
              <span aria-hidden="true">♥</span> Quiero Adoptar
            </button>
            <button onClick={() => navegarA && navegarA('tienda')} className="michi-button michi-button-green">
              <span aria-hidden="true">♧</span> Ir a la Tienda
            </button>
          </div>
        </div>
      </div>
      <div className="michi-hero-tree" aria-hidden="true">
        <div className="michi-tree-pom">●</div>
        <div className="michi-tree-platform" />
        <div className="michi-tree-post" />
        <div className="michi-tree-house"><span>🐾</span></div>
        <div className="michi-tree-base"><span>🐾</span></div>
      </div>
    </section>
  );
};

export default Hero;
