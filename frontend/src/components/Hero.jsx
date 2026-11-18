const Hero = ({ navegarA }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-michi-bg to-rose-50 px-4 py-16 md:py-20">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-michi-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-michi-secondary/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-michi-accent/70 bg-white/80 px-4 py-2 text-sm font-bold text-michi-primary shadow-sm">
            <span aria-hidden="true">🐾</span>
            Un hogar lleno de amor te espera
          </span>

          <h1 className="font-heading mb-5 text-4xl font-bold leading-tight text-michi-primary md:text-6xl">
            Adopta amor,
            <span className="block text-michi-text">equipa su hogar</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-michi-text/80 md:mx-0 md:text-xl">
            En MichiAdopta Shop rescatamos, cuidamos y buscamos el hogar perfecto para cada michi.
            Con tu ayuda, cada ronroneo tiene una nueva oportunidad.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              onClick={() => navegarA && navegarA('adoptar')}
              className="rounded-full bg-michi-primary px-7 py-3.5 font-heading font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              ♡ Quiero Adoptar
            </button>
            <button
              onClick={() => navegarA && navegarA('tienda')}
              className="rounded-full bg-michi-secondary px-7 py-3.5 font-heading font-bold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
            >
              🛍️ Ir a la Tienda
            </button>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-6 text-sm font-semibold text-michi-text/70 md:justify-start">
            <span>🐱 Adopción responsable</span>
            <span>💚 Michis cuidados</span>
            <span>🏡 Nuevos hogares</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-3 top-5 h-24 w-24 rounded-full bg-michi-accent/40 blur-2xl" />
          <div className="absolute -bottom-4 -left-3 h-28 w-28 rounded-full bg-michi-secondary/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br from-amber-100 via-white to-rose-100 p-8 shadow-2xl shadow-orange-200/70 md:p-12">
            <div className="absolute right-6 top-5 rotate-12 text-4xl text-michi-primary/60" aria-hidden="true">♡</div>
            <div className="absolute bottom-5 left-6 -rotate-12 text-3xl" aria-hidden="true">🐾</div>
            <div className="mx-auto flex aspect-[5/4] max-w-md flex-col items-center justify-center rounded-[1.5rem] border border-white/80 bg-white/45 text-center shadow-inner backdrop-blur-sm">
              <div className="mb-3 text-8xl drop-shadow-md md:text-9xl" role="img" aria-label="Gatito">🐈</div>
              <p className="font-heading text-2xl font-bold text-michi-primary md:text-3xl">Pequeñas patitas,</p>
              <p className="font-heading text-xl font-semibold text-michi-text md:text-2xl">grandes historias de amor</p>
            </div>
            <div className="absolute bottom-5 right-6 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-michi-secondary shadow-lg">
              ¡Adopta, no compres! 💚
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
