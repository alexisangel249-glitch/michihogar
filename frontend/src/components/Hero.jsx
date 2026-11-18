const Hero = ({ navegarA }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 px-4 py-10 md:py-14">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-michi-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-michi-secondary/15 blur-3xl" />

      <div className="relative mx-auto grid w-[96%] max-w-[1500px] items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -left-4 -top-4 z-10 text-5xl text-michi-primary michi-float" aria-hidden="true">♡</div>
          <div className="absolute -bottom-4 -right-3 z-10 text-4xl michi-float-slow" aria-hidden="true">🐾</div>
          <div className="overflow-hidden rounded-[2rem] border-[7px] border-white shadow-2xl shadow-orange-200/70">
            <img
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1400&q=90"
              alt="Gatito mirando con curiosidad, listo para encontrar un hogar"
              className="h-[300px] w-full object-cover object-center sm:h-[390px] lg:h-[490px]"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl border border-white/70 bg-white/90 px-5 py-3 shadow-lg backdrop-blur">
            <p className="font-heading text-lg font-bold text-michi-primary">¡Adopta, no compres!</p>
            <p className="text-sm text-michi-text/70">Cambia una vida para siempre 💚</p>
          </div>
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-michi-accent/70 bg-white/80 px-5 py-2.5 text-base font-bold text-michi-primary shadow-sm">
            🐾 Un hogar lleno de amor te espera
          </span>
          <h1 className="font-heading mb-6 text-4xl font-bold leading-[1.12] text-michi-primary sm:text-5xl lg:text-6xl xl:text-7xl">
            Adopta amor,
            <span className="block text-michi-text">equipa su hogar</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-michi-text/80 sm:text-xl lg:mx-0 lg:text-2xl">
            En MichiAdopta Shop rescatamos, cuidamos y buscamos el hogar perfecto para cada michi.
            Con tu ayuda, cada ronroneo tiene una nueva oportunidad.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <button
              onClick={() => navegarA && navegarA('adoptar')}
              className="rounded-full bg-michi-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl sm:text-lg"
            >
              ♥ Quiero Adoptar
            </button>
            <button
              onClick={() => navegarA && navegarA('tienda')}
              className="rounded-full bg-michi-secondary px-8 py-4 text-base font-bold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl sm:text-lg"
            >
              ♧ Ir a la Tienda
            </button>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-base font-semibold text-michi-text/70 lg:justify-start">
            <span>🐱 Adopción responsable</span>
            <span>💚 Michis cuidados</span>
            <span>🏡 Nuevos hogares</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
