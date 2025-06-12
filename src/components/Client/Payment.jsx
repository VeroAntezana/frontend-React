// src/components/Client/Payment.jsx
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TICKET, CREATE_PAYMENT } from '../../graphQL/mutations';

export default function Payment() {
  const [resumen, setResumen] = useState(null);
  const [estado, setEstado] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [crearTicket] = useMutation(CREATE_TICKET);
  const [crearPago] = useMutation(CREATE_PAYMENT);

  useEffect(() => {
    const salida = JSON.parse(localStorage.getItem('salidaSeleccionada'));
    const pasajeros = JSON.parse(localStorage.getItem('pasajerosData'));
    const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados'));

    if (!salida || !pasajeros || !asientos || pasajeros.length !== asientos.length) {
      setEstado('Error: Datos incompletos para procesar el pago.');
      return;
    }

    const total = salida.price * pasajeros.length;
    setResumen({ salida, pasajeros, asientos, total });
  }, []);

  const handleConfirmar = async () => {
    if (!resumen) return;
    setEstado('Procesando compra...');

    try {
      const { salida, pasajeros, asientos, total } = resumen;

      // Crear tickets
      for (let i = 0; i < pasajeros.length; i++) {
        await crearTicket({
          variables: {
            origin: salida.origin,
            destination: salida.destination,
            passengerName: pasajeros[i].nombre,
            passengerApellido: pasajeros[i].apellido,
            seatNumber: asientos[i],
            date: salida.departureTime,
            price: salida.price
          }
        });
      }

      const { data } = await crearPago({
        variables: {
          passengerName: resumen.pasajeros[0].nombre,
          amount: resumen.total,
          method: 'Efectivo'
        }
      });

      setEstado(`Compra realizada con éxito. Código: ${data.createPayment.confirmationCode}, Monto: Bs ${resumen.total}`);
      setConfirmado(true);
      localStorage.clear();
    } catch (err) {
      setEstado(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Pago de Tickets</h2>

      {resumen ? (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Ruta: {resumen.salida.origin} → {resumen.salida.destination}</h5>
            <p>Empresa: {resumen.salida.company}</p>
            <p>Fecha: {resumen.salida.departureTime}</p>
            <p>Precio por pasajero: <strong>Bs {resumen.salida.price}</strong></p>
            <p>Total a pagar: <strong className="text-success">Bs {resumen.total}</strong></p>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">Cargando datos...</div>
      )}

      {resumen && (
        <>
          <h5 className="mt-4">Pasajeros:</h5>
          <ul className="list-group mb-3">
            {resumen.pasajeros.map((p, i) => (
              <li key={i} className="list-group-item">
                {p.nombre} {p.apellido} - CI: {p.ci} - Asiento: {resumen.asientos[i]}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button className="btn btn-success px-5" onClick={handleConfirmar} disabled={confirmado}>Confirmar y Pagar</button>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        {estado && <div className={`alert ${estado.startsWith('Error') ? 'alert-danger' : 'alert-info'}`}>{estado}</div>}
      </div>
    </div>
  );
}
