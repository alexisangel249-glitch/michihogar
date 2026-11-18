const CatIllustration = () => (
  <svg viewBox="0 0 260 190" role="img" aria-label="Gatito ilustrado" className="michi-kitty michi-float w-44 sm:w-56">
    <ellipse cx="135" cy="166" rx="92" ry="13" fill="#E9D7C6" opacity=".55" />
    <path d="M76 81 67 23 111 54Q132 45 153 53L197 22 190 87" fill="#F6B77D" stroke="#B96B43" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M82 68 77 38 101 58M177 60 187 37 184 70" fill="#F9D4B5"/>
    <ellipse cx="133" cy="111" rx="67" ry="57" fill="#F6B77D" stroke="#B96B43" strokeWidth="4"/>
    <ellipse cx="133" cy="133" rx="35" ry="26" fill="#FFF1E4"/>
    <path d="M105 102q8 11 16 0M148 102q8 11 16 0" fill="none" stroke="#583B31" strokeWidth="5" strokeLinecap="round"/>
    <path d="M128 119q5 6 10 0q-5 11-10 0" fill="#D97976"/>
    <path d="M133 130q-13 14-24 0M133 130q13 14 24 0" fill="none" stroke="#583B31" strokeWidth="3" strokeLinecap="round"/>
    <path d="M72 117 28 108M73 130 25 132M194 117 238 108M193 130 241 132" stroke="#B96B43" strokeWidth="3" strokeLinecap="round"/>
    <path d="M78 147q-18 14-7 29q12 10 23-5M185 148q18 14 7 29q-12 10-23-5" fill="none" stroke="#B96B43" strokeWidth="9" strokeLinecap="round"/>
    <path d="M91 158q-5 18 9 20M173 158q5 18-9 20" fill="none" stroke="#FFF1E4" strokeWidth="7" strokeLinecap="round"/>
    <path d="M212 49q15-16 27 0q-12 15-27 0Z" fill="#F3A6A6"/>
    <path d="M226 28v-9M243 40l8-5" stroke="#E8734A" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const HistoriaDoodle = () => (
  <svg viewBox="0 0 150 115" aria-hidden="true" className="michi-float-slow w-28 sm:w-36">
    <path d="M54 42C30 14 2 39 21 63l34 34 34-34c19-24-9-49-35-21Z" fill="none" stroke="#F5A77C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M112 28c-8-10-19-1-13 8l13 13 13-13c6-9-5-18-13-8Z" fill="#F7BE9A"/>
    <ellipse cx="114" cy="77" rx="12" ry="16" fill="#F7BE9A"/>
    <circle cx="95" cy="60" r="8" fill="#F7BE9A"/><circle cx="108" cy="52" r="8" fill="#F7BE9A"/><circle cx="122" cy="53" r="8" fill="#F7BE9A"/><circle cx="134" cy="63" r="8" fill="#F7BE9A"/>
  </svg>
);

const Nosotros = () => {
  const objetivos = [
    { icono: '🐾', texto: 'Rescatar gatos en situación de calle o abandono.' },
    { icono: '💚', texto: 'Brindar atención veterinaria y cuidados necesarios.' },
    { icono: '🏡', texto: 'Encontrar hogares responsables y amorosos.' },
    { icono: '📚', texto: 'Educar sobre la tenencia responsable de mascotas.' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white px-4 py-14 md:py-20">
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-michi-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-michi-secondary/10 blur-3xl" />

      <div className="relative mx-auto w-[94%] max-w-[1400px]">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-michi-primary/10 px-5 py-2 text-base font-bold text-michi-primary">
            🐱 Conoce quiénes somos
          </span>
          <h2 className="font-heading text-4xl font-bold text-michi-primary md:text-6xl">
            Sobre MichiAdopta 🐱
          </h2>
          <p className="mt-3 text-lg text-michi-text/70 md:text-xl">Conoce nuestra historia y misión.</p>
        </div>

        <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4 md:px-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-michi-primary text-2xl text-white shadow-md">🐾</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary md:text-3xl">Nuestra Historia</h3>
          </div>
          <div className="grid items-center gap-5 p-6 md:grid-cols-[1fr_auto] md:px-10 md:py-8">
            <div className="space-y-4 text-base leading-relaxed text-michi-text/80 md:text-lg">
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
            <div className="flex justify-center md:pr-4"><HistoriaDoodle /></div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4 md:px-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-michi-secondary text-2xl text-white shadow-md">🎯</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary md:text-3xl">Nuestra Misión</h3>
          </div>
          <div className="grid items-center gap-5 p-6 md:grid-cols-[1fr_auto] md:px-10 md:py-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {objetivos.map((objetivo) => (
                <div key={objetivo.texto} className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50/80 to-white p-4 text-base transition duration-300 hover:-translate-y-1 hover:shadow-md md:text-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{objetivo.icono}</span>
                  <span className="font-semibold leading-relaxed text-michi-text/80">{objetivo.texto}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:pr-2"><CatIllustration /></div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-xl shadow-orange-100/60">
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-rose-50 px-6 py-4 md:px-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-michi-primary text-2xl text-white shadow-md">📍</span>
            <h3 className="font-heading text-2xl font-bold text-michi-primary md:text-3xl">Ubicación</h3>
          </div>
          <div className="p-5 md:p-8">
            <p className="mb-6 text-base text-michi-text/80 md:text-lg">
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
                  width="100%" height="340"
                  style={{ border: 0, display: 'block', minHeight: '300px' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="mb-7 text-center">
              <a href="https://www.google.com/maps/search/?api=1&query=Jilotepec+Estado+de+Mexico" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-michi-primary px-7 py-3 font-heading font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-600">
                🗺️ Abrir en Google Maps
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📍</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Dirección</h4>
                <p className="text-sm leading-relaxed text-michi-text/70">Jilotepec de Molina Enríquez<br />Estado de México, México</p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📞</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Teléfono</h4>
                <p className="text-sm leading-relaxed text-michi-text/70">55 1234 5678<br />Lun-Sáb 10:00 - 18:00</p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 text-center shadow-sm">
                <div className="mb-2 text-3xl">📧</div>
                <h4 className="font-heading mb-2 font-bold text-michi-text">Email</h4>
                <p className="break-words text-sm leading-relaxed text-michi-text/70">contacto@michiadopta.com<br />adopciones@michiadopta.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
