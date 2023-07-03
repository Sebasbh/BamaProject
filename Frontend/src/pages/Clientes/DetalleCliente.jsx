import React from 'react';
import '../../Styles/DetalleCliente.css';

const DetalleCliente = () => {
  const [perfilCliente, setPerfilCliente] = React.useState({
    nombreEmpresa: '',
    cifNif: '',
    codigoPostal: '',
    formaPago: '',
    personaContacto: '',
    email: '',
    movil: '',
    direccion: ''
  });

  const handleChange = (event) => {
    setPerfilCliente({
      ...perfilCliente,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      
      <div className="detalle-cliente">

      <div className="imagenes">

      <img
          src="https://tse4.mm.bing.net/th?id=OIP.gaInIGLRaOjETjvVoAOtqgAAAA&pid=Api&P=0&h=180"
          className="empresa"
          alt="empresa"
        />

        <img
          src="https://tse3.mm.bing.net/th?id=OIP.NqdGP69dNGSYxBiTSQiQdQHaHa&pid=Api&P=0&h=180"
          className="usuario"
          alt="usuario"
        />
        
      </div>


        <div className="contenido">
          <div className="botonesArriba">
            <button className="botonFacturas">Facturas</button>
            <button className="botonPedidos">Pedidos</button>
          </div>

          <div>
            <h2>Información de la Empresa</h2>
            <label>
              Nombre de la empresa:
              <input
                type="text"
                name="nombreEmpresa"
                value={perfilCliente.nombreEmpresa}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              CIF/NIF:
              <input
                type="text"
                name="cifNif"
                value={perfilCliente.cifNif}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Código Postal:
              <input
                type="text"
                name="codigoPostal"
                value={perfilCliente.codigoPostal}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Forma de Pago:
              <input
                type="text"
                name="formaPago"
                value={perfilCliente.formaPago}
                onChange={handleChange}
              />
            </label>
          </div>
          <hr />
          <div>
            <h2>Información de Contacto</h2>
            <label>
              Persona de contacto:
              <input
                type="text"
                name="personaContacto"
                value={perfilCliente.personaContacto}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={perfilCliente.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Móvil:
              <input
                type="text"
                name="movil"
                value={perfilCliente.movil}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Dirección:
              <input
                type="text"
                name="direccion"
                value={perfilCliente.direccion}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="botonesAbajo">
            <button className="botonEditar">Editar Cliente</button>
            <button className="botonEliminar">Eliminar Cliente</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleCliente;