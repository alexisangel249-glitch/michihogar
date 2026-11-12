/* ============================================= */
/* COMPONENTE: SeccionFormularios.jsx            */
/* Contiene ambos formularios lado a lado        */
/* Adoptar (izquierda) y Pedido (derecha)        */
/* ============================================= */

import FormAdopcion from './FormAdopcion';
import FormPedido from './FormPedido';

const SeccionFormularios = () => {
  return (
    <section id="formularios" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Título principal de la sección */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-michi-primary mb-4">
            ¿Listo para ayudar a un michi? 🐾
          </h2>
          <p className="font-body text-michi-text/70 max-w-2xl mx-auto">
            Elige la opción que mejor se adapte a ti. Ya sea que quieras adoptar 
            un michi o comprar accesorios para consentirlo, ¡aquí puedes hacerlo!
          </p>
        </div>

        {/* Grid de 2 columnas: Adoptar | Pedido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna izquierda: Formulario de Adopción */}
          <div className="bg-michi-bg rounded-3xl p-6 shadow-lg border-2 border-michi-accent">
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">🐱</div>
              <h3 className="font-heading text-2xl font-bold text-michi-primary">
                Adopta un Michi
              </h3>
              <p className="font-body text-sm text-michi-text/70 mt-2">
                Dale un hogar a un gatito rescatado
              </p>
            </div>
            <FormAdopcion compacto={true} />
          </div>

          {/* Columna derecha: Formulario de Pedido */}
          <div className="bg-michi-bg rounded-3xl p-6 shadow-lg border-2 border-michi-accent">
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">🛒</div>
              <h3 className="font-heading text-2xl font-bold text-michi-secondary">
                Compra Accesorios
              </h3>
              <p className="font-body text-sm text-michi-text/70 mt-2">
                Cada compra ayuda a rescatar más michis
              </p>
            </div>
            <FormPedido compacto={true} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeccionFormularios;