import { useState, useEffect } from 'react';

const AdminPanel = ({ onLogout }) => {
  const [pestañaActiva, setPestañaActiva] = useState('dashboard');
  const [estadisticas, setEstadisticas] = useState(null);
  
  // Estados para gatos
  const [gatos, setGatos] = useState([]);
  const [formGato, setFormGato] = useState({
    nombre: '', edad: '', raza: '', sexo: 'Macho',
    personalidad: '', descripcion: '', foto: '', estado: 'Disponible'
  });
  const [editandoGato, setEditandoGato] = useState(null);
  const [modoFotoGato, setModoFotoGato] = useState('url'); // 'url' o 'archivo'

  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [formProducto, setFormProducto] = useState({
    nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen: ''
  });
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [modoImagenProducto, setModoImagenProducto] = useState('url');

  const [solicitudes, setSolicitudes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarEstadisticas();
    cargarGatos();
    cargarProductos();
    cargarSolicitudes();
    cargarPedidos();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/estadisticas');
      const datos = await res.json();
      setEstadisticas(datos);
    } catch (error) { console.error('Error:', error); }
  };

  const cargarGatos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/gatos');
      const datos = await res.json();
      setGatos(datos);
    } catch (error) { console.error('Error:', error); }
  };

  const cargarProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/productos');
      const datos = await res.json();
      setProductos(datos);
    } catch (error) { console.error('Error:', error); }
  };

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/solicitudes');
      const datos = await res.json();
      setSolicitudes(datos);
    } catch (error) { console.error('Error:', error); }
  };

  const cargarPedidos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/pedidos');
      const datos = await res.json();
      setPedidos(datos);
    } catch (error) { console.error('Error:', error); }
  };

  // =============================================
  // FUNCIÓN PARA CONVERTIR IMAGEN A BASE64
  // =============================================
  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // =============================================
  // FUNCIONES PARA GATOS
  // =============================================
  const handleGatoChange = (e) => {
    setFormGato({ ...formGato, [e.target.name]: e.target.value });
  };

  const handleArchivoGato = async (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      try {
        const base64 = await convertirArchivoABase64(archivo);
        setFormGato({ ...formGato, foto: base64 });
        setMensaje('✅ Imagen cargada correctamente');
        setTimeout(() => setMensaje(''), 2000);
      } catch (error) {
        setMensaje('❌ Error al cargar la imagen');
      }
    }
  };

  const handleGatoSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editandoGato 
        ? `http://localhost:3001/api/admin/gatos/${editandoGato}`
        : 'http://localhost:3001/api/admin/gatos';
      const method = editandoGato ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formGato)
      });
      const datos = await res.json();
      setMensaje(datos.mensaje);
      setFormGato({ nombre: '', edad: '', raza: '', sexo: 'Macho', personalidad: '', descripcion: '', foto: '', estado: 'Disponible' });
      setEditandoGato(null);
      cargarGatos();
      cargarEstadisticas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Error al guardar gato');
    }
  };

  const editarGato = (gato) => {
    setFormGato(gato);
    setEditandoGato(gato.id);
    setModoFotoGato(gato.foto?.startsWith('data:') ? 'archivo' : 'url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarGato = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este gato?')) return;
    try {
      await fetch(`http://localhost:3001/api/admin/gatos/${id}`, { method: 'DELETE' });
      setMensaje('Gato eliminado 🗑️');
      cargarGatos();
      cargarEstadisticas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Error al eliminar');
    }
  };

  // =============================================
  // FUNCIONES PARA PRODUCTOS
  // =============================================
  const handleProductoChange = (e) => {
    setFormProducto({ ...formProducto, [e.target.name]: e.target.value });
  };

  const handleArchivoProducto = async (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      try {
        const base64 = await convertirArchivoABase64(archivo);
        setFormProducto({ ...formProducto, imagen: base64 });
        setMensaje('✅ Imagen cargada correctamente');
        setTimeout(() => setMensaje(''), 2000);
      } catch (error) {
        setMensaje('❌ Error al cargar la imagen');
      }
    }
  };

  const handleProductoSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editandoProducto 
        ? `http://localhost:3001/api/admin/productos/${editandoProducto}`
        : 'http://localhost:3001/api/admin/productos';
      const method = editandoProducto ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formProducto,
          precio: parseFloat(formProducto.precio),
          stock: parseInt(formProducto.stock)
        })
      });
      const datos = await res.json();
      setMensaje(datos.mensaje);
      setFormProducto({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen: '' });
      setEditandoProducto(null);
      cargarProductos();
      cargarEstadisticas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Error al guardar producto');
    }
  };

  const editarProducto = (producto) => {
    setFormProducto(producto);
    setEditandoProducto(producto.id);
    setModoImagenProducto(producto.imagen?.startsWith('data:') ? 'archivo' : 'url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarProducto = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await fetch(`http://localhost:3001/api/admin/productos/${id}`, { method: 'DELETE' });
      setMensaje('Producto eliminado 🗑️');
      cargarProductos();
      cargarEstadisticas();
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Error al eliminar');
    }
  };

  const actualizarEstadoSolicitud = async (id, estado) => {
    try {
      await fetch(`http://localhost:3001/api/admin/solicitudes/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });
      cargarSolicitudes();
    } catch (error) { console.error('Error:', error); }
  };

  const actualizarEstadoPedido = async (id, estado) => {
    try {
      await fetch(`http://localhost:3001/api/admin/pedidos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });
      cargarPedidos();
    } catch (error) { console.error('Error:', error); }
  };

  const pestañas = [
    { id: 'dashboard', nombre: '📊 Dashboard' },
    { id: 'gatos', nombre: '🐱 Gatos' },
    { id: 'productos', nombre: '🛒 Productos' },
    { id: 'solicitudes', nombre: '📋 Solicitudes' },
    { id: 'pedidos', nombre: '📦 Pedidos' },
  ];

  return (
    <div className="min-h-screen bg-michi-bg">
      <div className="bg-michi-primary text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold">🐱 Panel de Administración</h1>
            <p className="font-body text-sm opacity-90">MichiAdopta Shop</p>
          </div>
          <button onClick={onLogout} className="bg-white text-michi-primary font-heading font-bold px-6 py-2 rounded-full hover:bg-michi-bg transition-colors">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="bg-michi-card border-b-2 border-michi-accent sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {pestañas.map((p) => (
            <button key={p.id} onClick={() => setPestañaActiva(p.id)}
              className={`px-6 py-4 font-heading font-bold whitespace-nowrap transition-colors ${
                pestañaActiva === p.id ? 'text-michi-primary border-b-4 border-michi-primary' : 'text-michi-text hover:text-michi-primary'
              }`}>
              {p.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {mensaje && (
          <div className="bg-michi-secondary text-white p-4 rounded-xl mb-6 text-center font-heading">{mensaje}</div>
        )}

        {/* DASHBOARD */}
        {pestañaActiva === 'dashboard' && estadisticas && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-michi-primary mb-6">Resumen General</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent text-center">
                <div className="text-4xl mb-2">🐱</div>
                <p className="font-heading text-3xl font-bold text-michi-primary">{estadisticas.gatos}</p>
                <p className="font-body text-sm text-michi-text/70">Gatos registrados</p>
              </div>
              <div className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent text-center">
                <div className="text-4xl mb-2">💚</div>
                <p className="font-heading text-3xl font-bold text-michi-secondary">{estadisticas.disponibles}</p>
                <p className="font-body text-sm text-michi-text/70">Disponibles</p>
              </div>
              <div className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent text-center">
                <div className="text-4xl mb-2">🛒</div>
                <p className="font-heading text-3xl font-bold text-michi-primary">{estadisticas.productos}</p>
                <p className="font-body text-sm text-michi-text/70">Productos</p>
              </div>
              <div className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent text-center">
                <div className="text-4xl mb-2">📋</div>
                <p className="font-heading text-3xl font-bold text-michi-primary">{estadisticas.solicitudes}</p>
                <p className="font-body text-sm text-michi-text/70">Solicitudes</p>
              </div>
              <div className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent text-center">
                <div className="text-4xl mb-2">📦</div>
                <p className="font-heading text-3xl font-bold text-michi-primary">{estadisticas.pedidos}</p>
                <p className="font-body text-sm text-michi-text/70">Pedidos</p>
              </div>
            </div>
          </div>
        )}

        {/* GATOS */}
        {pestañaActiva === 'gatos' && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-michi-primary mb-6">
              {editandoGato ? '✏️ Editar Gato' : '➕ Agregar Nuevo Gato'}
            </h2>
            <form onSubmit={handleGatoSubmit} className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="nombre" value={formGato.nombre} onChange={handleGatoChange} placeholder="Nombre *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                <input name="edad" type="number" value={formGato.edad} onChange={handleGatoChange} placeholder="Edad *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                <input name="raza" value={formGato.raza} onChange={handleGatoChange} placeholder="Raza"
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                <select name="sexo" value={formGato.sexo} onChange={handleGatoChange}
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary">
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
                <input name="personalidad" value={formGato.personalidad} onChange={handleGatoChange} placeholder="Personalidad"
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary md:col-span-2" />
                <textarea name="descripcion" value={formGato.descripcion} onChange={handleGatoChange} placeholder="Descripción *" required rows="3"
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary md:col-span-2" />
                
                {/* SELECTOR DE MODO DE IMAGEN */}
                <div className="md:col-span-2">
                  <label className="block font-heading text-michi-text mb-2">Imagen del gato *</label>
                  <div className="flex gap-4 mb-3">
                    <button type="button" onClick={() => setModoFotoGato('url')}
                      className={`flex-1 py-2 rounded-xl font-heading font-bold transition-colors ${
                        modoFotoGato === 'url' ? 'bg-michi-primary text-white' : 'bg-michi-bg text-michi-text border-2 border-michi-accent'
                      }`}>
                      🌐 Usar URL
                    </button>
                    <button type="button" onClick={() => setModoFotoGato('archivo')}
                      className={`flex-1 py-2 rounded-xl font-heading font-bold transition-colors ${
                        modoFotoGato === 'archivo' ? 'bg-michi-primary text-white' : 'bg-michi-bg text-michi-text border-2 border-michi-accent'
                      }`}>
                      📁 Subir archivo local
                    </button>
                  </div>

                  {modoFotoGato === 'url' ? (
                    <input name="foto" value={formGato.foto} onChange={handleGatoChange} placeholder="https://ejemplo.com/foto.jpg" required
                      className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                  ) : (
                    <div>
                      <input type="file" accept="image/*" onChange={handleArchivoGato}
                        className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                      <p className="text-xs text-michi-text/70 mt-2">
                        💡 La imagen se convertirá a Base64 y se guardará en la base de datos
                      </p>
                    </div>
                  )}

                  {/* Vista previa de la imagen */}
                  {formGato.foto && (
                    <div className="mt-3">
                      <p className="text-sm font-heading text-michi-text mb-2">Vista previa:</p>
                      <img src={formGato.foto} alt="Vista previa" className="w-32 h-32 object-cover rounded-xl border-2 border-michi-accent" />
                    </div>
                  )}
                </div>

                <select name="estado" value={formGato.estado} onChange={handleGatoChange}
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary md:col-span-2">
                  <option value="Disponible">Disponible</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Adoptado">Adoptado</option>
                </select>
              </div>
              <div className="flex gap-4 mt-4">
                <button type="submit" className="flex-1 bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90">
                  {editandoGato ? '💾 Guardar Cambios' : '➕ Agregar Gato'}
                </button>
                {editandoGato && (
                  <button type="button" onClick={() => { setEditandoGato(null); setFormGato({ nombre: '', edad: '', raza: '', sexo: 'Macho', personalidad: '', descripcion: '', foto: '', estado: 'Disponible' }); }}
                    className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500">
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <h3 className="font-heading text-xl font-bold text-michi-text mb-4">Gatos Registrados ({gatos.length})</h3>
            <div className="space-y-3">
              {gatos.map((gato) => (
                <div key={gato.id} className="bg-michi-card p-4 rounded-xl shadow border border-michi-accent flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <img src={gato.foto} alt={gato.nombre} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-michi-text">{gato.nombre} - {gato.raza}</h4>
                    <p className="text-sm text-michi-text/70">{gato.edad} años • {gato.sexo} • {gato.personalidad}</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                      gato.estado === 'Disponible' ? 'bg-michi-secondary text-white' :
                      gato.estado === 'Adoptado' ? 'bg-gray-400 text-white' : 'bg-michi-accent text-michi-text'
                    }`}>{gato.estado}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editarGato(gato)} className="bg-michi-primary text-white px-4 py-2 rounded-lg font-heading text-sm hover:bg-michi-primary/90">✏️ Editar</button>
                    <button onClick={() => eliminarGato(gato.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-heading text-sm hover:bg-red-600">🗑️ Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTOS */}
        {pestañaActiva === 'productos' && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-michi-primary mb-6">
              {editandoProducto ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
            </h2>
            <form onSubmit={handleProductoSubmit} className="bg-michi-card p-6 rounded-2xl shadow-lg border-2 border-michi-accent mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="nombre" value={formProducto.nombre} onChange={handleProductoChange} placeholder="Nombre del producto *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary md:col-span-2" />
                <textarea name="descripcion" value={formProducto.descripcion} onChange={handleProductoChange} placeholder="Descripción *" required rows="2"
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary md:col-span-2" />
                <input name="precio" type="number" value={formProducto.precio} onChange={handleProductoChange} placeholder="Precio *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                <input name="stock" type="number" value={formProducto.stock} onChange={handleProductoChange} placeholder="Stock *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                <input name="categoria" value={formProducto.categoria} onChange={handleProductoChange} placeholder="Categoría *" required
                  className="px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                
                {/* SELECTOR DE MODO DE IMAGEN PARA PRODUCTOS */}
                <div className="md:col-span-2">
                  <label className="block font-heading text-michi-text mb-2">Imagen del producto *</label>
                  <div className="flex gap-4 mb-3">
                    <button type="button" onClick={() => setModoImagenProducto('url')}
                      className={`flex-1 py-2 rounded-xl font-heading font-bold transition-colors ${
                        modoImagenProducto === 'url' ? 'bg-michi-secondary text-white' : 'bg-michi-bg text-michi-text border-2 border-michi-accent'
                      }`}>
                      🌐 Usar URL
                    </button>
                    <button type="button" onClick={() => setModoImagenProducto('archivo')}
                      className={`flex-1 py-2 rounded-xl font-heading font-bold transition-colors ${
                        modoImagenProducto === 'archivo' ? 'bg-michi-secondary text-white' : 'bg-michi-bg text-michi-text border-2 border-michi-accent'
                      }`}>
                      📁 Subir archivo local
                    </button>
                  </div>

                  {modoImagenProducto === 'url' ? (
                    <input name="imagen" value={formProducto.imagen} onChange={handleProductoChange} placeholder="https://ejemplo.com/imagen.jpg" required
                      className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                  ) : (
                    <div>
                      <input type="file" accept="image/*" onChange={handleArchivoProducto}
                        className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" />
                      <p className="text-xs text-michi-text/70 mt-2">
                        💡 La imagen se convertirá a Base64 y se guardará en la base de datos
                      </p>
                    </div>
                  )}

                  {formProducto.imagen && (
                    <div className="mt-3">
                      <p className="text-sm font-heading text-michi-text mb-2">Vista previa:</p>
                      <img src={formProducto.imagen} alt="Vista previa" className="w-32 h-32 object-cover rounded-xl border-2 border-michi-accent" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button type="submit" className="flex-1 bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90">
                  {editandoProducto ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
                </button>
                {editandoProducto && (
                  <button type="button" onClick={() => { setEditandoProducto(null); setFormProducto({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen: '' }); }}
                    className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500">
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <h3 className="font-heading text-xl font-bold text-michi-text mb-4">Productos Registrados ({productos.length})</h3>
            <div className="space-y-3">
              {productos.map((prod) => (
                <div key={prod.id} className="bg-michi-card p-4 rounded-xl shadow border border-michi-accent flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <img src={prod.imagen} alt={prod.nombre} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-michi-text">{prod.nombre}</h4>
                    <p className="text-sm text-michi-text/70">{prod.categoria} • ${prod.precio} • Stock: {prod.stock}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editarProducto(prod)} className="bg-michi-secondary text-white px-4 py-2 rounded-lg font-heading text-sm hover:bg-michi-secondary/90">✏️ Editar</button>
                    <button onClick={() => eliminarProducto(prod.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-heading text-sm hover:bg-red-600">🗑️ Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOLICITUDES */}
        {pestañaActiva === 'solicitudes' && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-michi-primary mb-6">Solicitudes de Adopción ({solicitudes.length})</h2>
            <div className="space-y-3">
              {solicitudes.length === 0 ? (
                <p className="text-center text-michi-text/70 font-body py-8">No hay solicitudes aún</p>
              ) : solicitudes.map((s) => (
                <div key={s.id} className="bg-michi-card p-6 rounded-xl shadow border-2 border-michi-accent">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-michi-primary text-lg">{s.usuario_nombre} <span className="text-sm text-michi-text/70">({s.usuario_email})</span></h4>
                      <p className="text-sm text-michi-text/70">📱 {s.usuario_telefono || 'Sin teléfono'}</p>
                      <p className="mt-2 font-body text-michi-text"><strong>Quiere adoptar a:</strong> {s.gato_nombre || `Gato ID ${s.gato_id}`}</p>
                      <p className="mt-2 font-body text-michi-text/80 italic">"{s.motivo}"</p>
                      <p className="text-xs text-michi-text/50 mt-2">📅 {s.fecha_solicitud}</p>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[150px]">
                      <span className={`px-3 py-2 rounded-full text-xs font-bold text-center ${
                        s.estado === 'Pendiente' ? 'bg-yellow-400 text-michi-text' :
                        s.estado === 'Aprobada' ? 'bg-michi-secondary text-white' :
                        s.estado === 'Rechazada' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
                      }`}>{s.estado}</span>
                      <select value={s.estado} onChange={(e) => actualizarEstadoSolicitud(s.id, e.target.value)}
                        className="px-3 py-2 rounded-lg border-2 border-michi-accent bg-michi-bg text-sm font-body">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobada">Aprobada</option>
                        <option value="Rechazada">Rechazada</option>
                        <option value="En proceso">En proceso</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PEDIDOS */}
        {pestañaActiva === 'pedidos' && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-michi-primary mb-6">Pedidos Realizados ({pedidos.length})</h2>
            <div className="space-y-3">
              {pedidos.length === 0 ? (
                <p className="text-center text-michi-text/70 font-body py-8">No hay pedidos aún</p>
              ) : pedidos.map((p) => (
                <div key={p.id} className="bg-michi-card p-6 rounded-xl shadow border-2 border-michi-accent">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-michi-primary text-lg">{p.cliente_nombre} <span className="text-sm text-michi-text/70">({p.cliente_email})</span></h4>
                      <p className="mt-2 font-body text-michi-text"><strong>Producto:</strong> {p.producto_nombre || `Producto ID ${p.producto_id}`}</p>
                      <p className="font-body text-michi-text"><strong>Cantidad:</strong> {p.cantidad} • <strong>Total:</strong> ${p.total}</p>
                      <p className="text-xs text-michi-text/50 mt-2">📅 {p.fecha_pedido}</p>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[150px]">
                      <span className={`px-3 py-2 rounded-full text-xs font-bold text-center ${
                        p.estado === 'Pendiente' ? 'bg-yellow-400 text-michi-text' :
                        p.estado === 'Completado' ? 'bg-michi-secondary text-white' :
                        p.estado === 'Cancelado' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
                      }`}>{p.estado}</span>
                      <select value={p.estado} onChange={(e) => actualizarEstadoPedido(p.id, e.target.value)}
                        className="px-3 py-2 rounded-lg border-2 border-michi-accent bg-michi-bg text-sm font-body">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Enviado">Enviado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;