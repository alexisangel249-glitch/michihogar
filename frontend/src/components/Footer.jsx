const Footer = ({ onAdminClick, navegarA }) => {
  return (
    <footer className="michi-footer">
      <div className="michi-footer-inner">
        <div className="michi-footer-brand">
          <h3 className="font-heading">🐱 MichiAdopta</h3>
          <p>Rescatamos, cuidamos y buscamos el hogar perfecto para cada michi.</p>
          <p>Pagina creada por: Angel Alexis Basiliio Garcia</p>
        </div>

        <div className="michi-footer-links">
          <h4 className="font-heading">Enlaces</h4>
          <div className="michi-footer-link-columns">
            <ul>
              <li><button onClick={() => navegarA('home')}>Inicio</button></li>
              <li><button onClick={() => navegarA('tienda')}>Tienda</button></li>
              <li><button onClick={() => navegarA('formularios')}>Formularios</button></li>
            </ul>
            <ul>
              <li><button onClick={() => navegarA('cotizacion')}>Cotización</button></li>
              <li><button onClick={() => navegarA('nosotros')}>Nosotros</button></li>
              <li><button onClick={() => navegarA('registro')}>Registro</button></li>
            </ul>
          </div>
        </div>

        <div className="michi-footer-contact">
          <h4 className="font-heading">Contacto</h4>
          <p>✉ contacto@michiadopta.com</p>
          <p>☎ 55 1234 5678</p>
          <p>📍 Jilotepec, Estado de México</p>
        </div>

        <div className="michi-footer-art" aria-hidden="true">
          <svg viewBox="0 0 180 120">
            <path d="M42 44C22 20 0 43 18 63l24 24 24-24c18-20-4-43-24-19Z" fill="none" stroke="#D99565" strokeWidth="4" strokeLinecap="round"/>
            <ellipse cx="132" cy="84" rx="13" ry="17" fill="#D99565"/>
            <circle cx="111" cy="61" r="9" fill="#D99565"/><circle cx="128" cy="52" r="9" fill="#D99565"/><circle cx="145" cy="56" r="9" fill="#D99565"/><circle cx="157" cy="69" r="9" fill="#D99565"/>
          </svg>
        </div>
      </div>

      <div className="michi-footer-bottom">
        <p>© 2026 MichiAdopta Shop. Todos los derechos reservados. 🐾</p>
        <button onClick={onAdminClick}>🔐 Acceso Administrador</button>
      </div>
    </footer>
  );
};

export default Footer;
