import { useQuery, gql } from '@apollo/client';

const GET_TICKETS = gql`
  query {
    getTickets {
      id
      origin
      destination
      passengerName
      passengerApellido
      date
      seatNumber
      price
    }
  }
`;

export default function TicketList() {
  const { data, loading, error } = useQuery(GET_TICKETS);

  if (loading) return <p>Cargando boletos...</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  if (data.getTickets.length === 0) {
    return <p>No hay boletos registrados.</p>;
  }

  return (
    <div>
      <h2>🧾 Lista de Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>Pasajero</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Asiento</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data.getTickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.passengerName} {ticket.passengerApellido}</td>
              <td>{ticket.origin}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.date}</td>
              <td>{ticket.seatNumber}</td>
              <td>{ticket.price} Bs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// Este componente muestra una lista de tickets obtenidos desde la API GraphQL.