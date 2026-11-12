const Footer = ({ onAdminClick, navegarA }) => {
  return (
    <footer className="bg-michi-text text-michi-bg py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl font-bold text-michi-primary mb-4">
            🐱 MichiAdopta
          </h3>
          <p className="font-body text-sm text-michi-bg/80">
            Rescatamos, cuidamos y buscamos el hogar perfecto para cada michi.
          <p>
            Pagina creada por: Angel Alexis Basiliio Garcia 
          </p>
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-bold mb-4">Enlaces</h4>
          <ul className="space-y-2 font-body text-sm">
            <li><button onClick={() => navegarA('home')} className="hover:text-michi-primary">Inicio</button></li>
            <li><button onClick={() => navegarA('tienda')} className="hover:text-michi-primary">Tienda</button></li>
            <li><button onClick={() => navegarA('formularios')} className="hover:text-michi-primary">Formularios</button></li>
            <li><button onClick={() => navegarA('nosotros')} className="hover:text-michi-primary">Nosotros</button></li>
            <li><button onClick={() => navegarA('registro')} className="hover:text-michi-primary">Registro</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-bold mb-4">Contacto</h4>
          <ul className="space-y-2 font-body text-sm">
            <li>📧 contacto@michiadopta.com</li>
            <li>📱 55 1234 5678</li>
            <li>📍 Jilotepec, Estado de México</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-michi-bg/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm text-michi-bg/60">
          © 2026 MichiAdopta Shop. Todos los derechos reservados. 🐾
        </p>
        <button
          onClick={onAdminClick}
          className="text-xs text-michi-bg/40 hover:text-michi-primary transition-colors font-body"
        >
          🔐 Acceso Administrador
        </button>
      </div>
    </footer>
  );
};

export default Footer;