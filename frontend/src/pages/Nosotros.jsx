const Nosotros = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-michi-primary mb-4">
            Sobre MichiAdopta 🐱
          </h1>
          <p className="font-body text-lg text-michi-text/70">
            Conoce nuestra historia y misión
          </p>
        </div>

        <div className="bg-michi-bg rounded-3xl p-8 shadow-lg border-2 border-michi-accent mb-8">
          <h2 className="font-heading text-2xl font-bold text-michi-primary mb-4">
            Nuestra Historia
          </h2>
          <p className="font-body text-michi-text/80 leading-relaxed mb-4">
            MichiAdopta Shop nació en 2024 en Jilotepec, Estado de México, 
            con la misión de rescatar, cuidar y encontrar el hogar perfecto 
            para cada michi abandonado.
          </p>
          <p className="font-body text-michi-text/80 leading-relaxed">
            Lo que comenzó como un pequeño esfuerzo de un grupo de amantes 
            de los gatos, hoy se ha convertido en un refugio que ha rescatado 
            a más de 200 michis y encontrado hogar para más de 150.
          </p>
        </div>

        <div className="bg-michi-bg rounded-3xl p-8 shadow-lg border-2 border-michi-accent mb-8">
          <h2 className="font-heading text-2xl font-bold text-michi-primary mb-4">
            Nuestra Misión
          </h2>
          <ul className="space-y-3 font-body text-michi-text/80">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🐾</span>
              <span>Rescatar gatos en situación de calle o abandono</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💚</span>
              <span>Brindar atención veterinaria y cuidados necesarios</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <span>Encontrar hogares responsables y amorosos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <span>Educar sobre la tenencia responsable de mascotas</span>
            </li>
          </ul>
        </div>

        <div className="bg-michi-bg rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          <h2 className="font-heading text-2xl font-bold text-michi-primary mb-4 flex items-center gap-2">
            <span className="text-3xl">📍</span>
            Ubicación
          </h2>
          <p className="font-body text-michi-text/80 mb-6">
            Nos encontramos en <strong>Jilotepec, Estado de México</strong>. 
            ¡Ven a conocer a nuestros michis!
          </p>
          
          {/* Ubicación en dos paneles: información a la izquierda y mapa interactivo a la derecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border-2 border-michi-accent shadow-lg bg-gradient-to-br from-orange-50 via-white to-amber-100 min-h-[300px] sm:min-h-[340px]">
              <div className="h-full min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <div className="text-6xl mb-4" aria-hidden="true">📍</div>
                <h3 className="font-heading text-2xl font-bold text-michi-primary mb-2">¡Estamos en Jilotepec!</h3>
                <p className="font-body text-michi-text/80 max-w-md">
                  Jilotepec de Molina Enríquez, Estado de México
                </p>
                <p className="font-body text-sm text-michi-text/60 mt-3">
                  Conoce dónde estamos y consulta cómo llegar.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-michi-accent shadow-lg bg-white min-h-[300px] sm:min-h-[340px]">
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

          {/* Botón para abrir en Google Maps */}
          <div className="text-center mb-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jilotepec+Estado+de+Mexico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-michi-primary text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-michi-primary/90 transition-colors"
            >
              <span>🗺️</span>
              <span>Abrir en Google Maps</span>
            </a>
          </div>

          {/* Información de contacto en tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-michi-card p-6 rounded-xl text-center border-2 border-michi-accent">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-heading font-bold text-michi-text mb-2">Dirección</h3>
              <p className="font-body text-sm text-michi-text/70">
                Jilotepec de Molina Enríquez<br />
                Estado de México, México
              </p>
            </div>
            <div className="bg-michi-card p-6 rounded-xl text-center border-2 border-michi-accent">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-heading font-bold text-michi-text mb-2">Teléfono</h3>
              <p className="font-body text-sm text-michi-text/70">
                55 1234 5678<br />
                Lun-Sáb 10:00 - 18:00
              </p>
            </div>
            <div className="bg-michi-card p-6 rounded-xl text-center border-2 border-michi-accent">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-heading font-bold text-michi-text mb-2">Email</h3>
              <p className="font-body text-sm text-michi-text/70">
                contacto@michiadopta.com<br />
                adopciones@michiadopta.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;