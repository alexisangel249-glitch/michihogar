const Nosotros = () => {
  const objetivos = [
    { icono: '🐾', texto: 'Rescatar gatos en situación de calle o abandono.' },
    { icono: '💚', texto: 'Brindar atención veterinaria y cuidados necesarios.' },
    { icono: '🏡', texto: 'Encontrar hogares responsables y amorosos.' },
    { icono: '📚', texto: 'Educar sobre la tenencia responsable de mascotas.' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white px-4 py-16 md:py-20">
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-michi-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-michi-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-michi-primary/10 px-4 py-2 text-sm font-bold text-michi-primary">
            🐱 Conoce quiénes somos
          </span>
          <h2 className="font-heading text-3xl font-bold text-michi-primary md:text-5xl">
            Sobre MichiAdopta
          </h2>
          <p className="mt-3 text-lg text-michi-text/70">Conoce nuestra historia y misión.</p>
        </div>

        <div className="mb-7 overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-michi-primary text-xl text-white shadow-md">🐾</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary">Nuestra Historia</h3>
          </div>
          <div className="grid items-center gap-5 p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div className="space-y-4 leading-relaxed text-michi-text/80">
              <p>
                MichiAdopta Shop nació en 2024 en Jilotepec, Estado de México,
                con la misión de rescatar, cuidar y encontrar el hogar perfecto
                para cada michi abandonado.
              </p>
              <p>
                Lo que comenzó como un pequeño esfuerzo de un grupo de amantes
                de los gatos, hoy se ha convertido en un refugio que ha rescatado
                a más de 200 michis y encontrado hogar para más de 150.
              </p>
            </div>
            <div className="hidden select-none px-8 text-7xl text-michi-primary/30 md:block" aria-hidden="true">♡🐾</div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-michi-secondary text-xl text-white shadow-md">♡</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary">Nuestra Misión</h3>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-8">
            {objetivos.map((objetivo) => (
              <div key={objetivo.texto} className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50/80 to-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{objetivo.icono}</span>
                <span className="font-semibold leading-relaxed text-michi-text/80">{objetivo.texto}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end px-8 pb-2 text-6xl opacity-80" aria-hidden="true">🐈</div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-michi-primary text-xl text-white shadow-md">📍</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary">Ubicación</h3>
          </div>
          <div className="p-5 md:p-8">
            <p className="mb-6 text-michi-text/80">
              Nos encontramos en <strong>Jilotepec, Estado de México</strong>. ¡Ven a conocer a nuestros michis!
            </p>

            <div className="mb-6 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
              <div className="min-h-[300px] overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-100 shadow-inner sm:min-h-[340px]">
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 text-center sm:min-h-[340px] sm:p-8">
                  <div className="mb-4 text-6xl" aria-hidden="true">📍</div>
                  <h4 className="font-heading mb-2 text-2xl font-bold text-michi-primary">¡Estamos en Jilotepec!</h4>
                  <p className="max-w-md text-michi-text/80">Jilotepec de Molina Enríquez, Estado de México</p>
                  <p className="mt-3 text-sm text-michi-text/60">Conoce dónde estamos y consulta cómo llegar.</p>
                </div>
              </div>

              <div className="min-h-[300px] overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-md sm:min-h-[340px]">
                <iframe
                  title="Mapa interactivo de MichiAdopta en Jilotepec, Estado de México"
                  src="https://maps.google.com/maps?q=Jilotepec%20de%20Molina%20Enriquez%2C%20Estado%20de%20Mexico&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="340"
                  style={{ border: 0, display: 'block', minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mb-7 text-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jilotepec+Estado+de+Mexico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-michi-primary px-7 py-3 font-heading font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                🗺️ Abrir en Google Maps
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📍</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Dirección</h4>
                <p className="text-sm leading-relaxed text-michi-text/70">
                  Jilotepec de Molina Enríquez<br />
                  Estado de México, México
                </p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📞</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Teléfono</h4>
                <p className="text-sm leading-relaxed text-michi-text/70">
                  55 1234 5678<br />
                  Lun-Sáb 10:00 - 18:00
                </p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📧</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Email</h4>
                <p className="break-words text-sm leading-relaxed text-michi-text/70">
                  contacto@michiadopta.com<br />
                  adopciones@michiadopta.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
