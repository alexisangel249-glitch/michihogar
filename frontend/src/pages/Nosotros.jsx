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
  <svg viewBox="0 0 180 125" aria-hidden="true" className="michi-float-slow h-24 w-36 sm:h-28 sm:w-44">
    <path d="M54 42C30 14 2 39 21 63l34 34 34-34c19-24-9-49-35-21Z" fill="none" stroke="#F5A77C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="137" cy="83" rx="13" ry="17" fill="#F7BE9A"/>
    <circle cx="115" cy="61" r="9" fill="#F7BE9A"/><circle cx="132" cy="52" r="9" fill="#F7BE9A"/><circle cx="149" cy="56" r="9" fill="#F7BE9A"/><circle cx="161" cy="69" r="9" fill="#F7BE9A"/>
  </svg>
);

const Paw = () => <span className="michi-paw" aria-hidden="true">●</span>;

const Nosotros = () => {
  const objetivos = [
    { texto: 'Rescatar gatos en situación de calle o abandono.' },
    { texto: 'Brindar atención veterinaria y cuidados necesarios.' },
    { texto: 'Encontrar hogares responsables y amorosos.' },
    { texto: 'Educar sobre la tenencia responsable de mascotas.' },
  ];

  return (
    <section className="michi-about-section">
      <div className="michi-section-heading">
        <div className="michi-heading-rays" aria-hidden="true">⌁</div>
        <h2 className="font-heading">Sobre MichiAdopta <span aria-hidden="true">🐱</span></h2>
        <p>Conoce nuestra historia y misión.</p>
      </div>

      <div className="michi-content-shell">
        <article className="michi-info-card michi-history-card">
          <header className="michi-card-heading">
            <span className="michi-heading-icon" aria-hidden="true">🐾</span>
            <h3 className="font-heading">Nuestra Historia</h3>
          </header>
          <div className="michi-history-content">
            <div>
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
            <HistoriaDoodle />
          </div>
        </article>

        <article className="michi-info-card michi-mission-card">
          <header className="michi-card-heading">
            <span className="michi-heading-icon michi-heading-icon-green" aria-hidden="true">🎯</span>
            <h3 className="font-heading">Nuestra Misión</h3>
          </header>
          <div className="michi-mission-content">
            <ul className="michi-objectives">
              {objetivos.map((objetivo) => (
                <li key={objetivo.texto}><Paw /> <span>{objetivo.texto}</span></li>
              ))}
            </ul>
            <div className="michi-mission-cat"><img src="data:image/webp;base64,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" alt="Gatito ilustrado del mockup de MichiAdopta" /></div>
          </div>
        </article>

        <article className="michi-info-card michi-location-card">
          <header className="michi-card-heading">
            <span className="michi-heading-icon" aria-hidden="true">📍</span>
            <h3 className="font-heading">Ubicación</h3>
          </header>
          <div className="michi-location-content">
            <p className="michi-location-intro">
              Nos encontramos en <strong>Jilotepec, Estado de México</strong>. ¡Ven a conocer a nuestros michis!
            </p>
            <div className="michi-location-grid">
              <div className="michi-location-promo">
                <div className="michi-location-paws" aria-hidden="true">🐾</div>
                <div className="michi-location-pin" aria-hidden="true">📍</div>
                <h4 className="font-heading">¡Estamos en Jilotepec!</h4>
                <p>Jilotepec de Molina Enríquez,<br />Estado de México</p>
                <span>Conoce dónde estamos y consulta cómo llegar.</span>
              </div>
              <div className="michi-map-frame">
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
            <div className="michi-map-action">
              <span aria-hidden="true">✳</span>
              <a href="https://www.google.com/maps/search/?api=1&query=Jilotepec+Estado+de+Mexico" target="_blank" rel="noopener noreferrer">
                ♧ Abrir en Google Maps
              </a>
              <span aria-hidden="true">✳</span>
            </div>
            <div className="michi-contact-grid">
              <div className="michi-contact-tile">
                <span className="michi-contact-icon" aria-hidden="true">📍</span>
                <h4 className="font-heading">Dirección</h4>
                <p>Jilotepec de Molina Enríquez<br />Estado de México, México</p>
              </div>
              <div className="michi-contact-tile">
                <span className="michi-contact-icon" aria-hidden="true">📞</span>
                <h4 className="font-heading">Teléfono</h4>
                <p>55 1234 5678<br />Lun-Sáb 10:00 - 18:00</p>
              </div>
              <div className="michi-contact-tile">
                <span className="michi-contact-icon" aria-hidden="true">✉️</span>
                <h4 className="font-heading">Email</h4>
                <p>contacto@michiadopta.com<br />adopciones@michiadopta.com</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Nosotros;
