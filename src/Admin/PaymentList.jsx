import { useQuery, gql } from '@apollo/client';

const GET_PAYMENTS = gql`
  query {
    getPayments {
      id
      passengerName
      amount
      method
      status
      confirmationCode
      timestamp
    }
  }
`;

export default function PaymentList() {
  const { data, loading, error } = useQuery(GET_PAYMENTS);

  if (loading) return <p>Cargando pagos...</p>;
  if (error) return <p>Error al cargar pagos: {error.message}</p>;

  if (data.getPayments.length === 0) {
    return <p>No hay pagos registrados.</p>;
  }

  return (
    <div>
      <h2>Pagos realizados</h2>
      <table>
        <thead>
          <tr>
            <th>Pasajero</th>
            <th>Monto</th>
            <th>Método</th>
            <th>Estado</th>
            <th>Confirmación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.getPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.passengerName}</td>
              <td>{payment.amount} Bs</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>{payment.confirmationCode}</td>
              <td>{new Date(payment.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
