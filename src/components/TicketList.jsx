import { useQuery, gql } from '@apollo/client';

const GET_TICKETS = gql`
  query {
    getTickets {
      id
      origin
      destination
      passengerName
      seatNumber
      date
      qrCode
    }
  }
`;

export default function TicketList() {
  const { loading, error, data } = useQuery(GET_TICKETS);

  if (loading) return <p>Cargando boletos...</p>;
  if (error) return <p>Error al cargar boletos: {error.message}</p>;

  return (
    <div>
      <h2>Boletos registrados</h2>
      <ul>
        {data.getTickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.passengerName}</strong> viaja de <em>{ticket.origin}</em> a <em>{ticket.destination}</em> el <strong>{ticket.date}</strong>
            <br />
            Asiento: {ticket.seatNumber}
            <br />
            {ticket.qrCode && <img src={ticket.qrCode} alt="QR" width="100" />}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

