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
            <div className="michi-mission-cat"><CatIllustration /></div>
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
