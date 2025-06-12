import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TICKETS } from '../graphql/queries';

export default function PurchaseFlow() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ origin: '', destination: '', date: '' });
  const { data, loading, error } = useQuery(GET_TICKETS);

  const handleNaturalSearch = async () => {
    try {
      const res = await fetch('http://localhost:4005/parse-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const result = await res.json();
      setFilters({
        origin: result.origin.toLowerCase(),
        destination: result.destination.toLowerCase(),
        date: result.date || '',
      });
    } catch (err) {
      alert('Error al procesar con NLP: ' + err.message);
    }
  };

  const filteredTickets = data?.getTickets.filter(ticket => {
    return (
      (!filters.origin || ticket.origin.toLowerCase() === filters.origin) &&
      (!filters.destination || ticket.destination.toLowerCase() === filters.destination) &&
      (!filters.date || ticket.date === filters.date)
    );
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Comprar Ticket con búsqueda inteligente</h2>

      <input
        type="text"
        placeholder="Ej: quiero viajar de La Paz a Sucre el 2025-06-15"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '80%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleNaturalSearch}>Buscar</button>

      {loading && <p>Cargando boletos...</p>}
      {error && <p>Error: {error.message}</p>}

      {filters.origin && (
        <>
          <h4 style={{ marginTop: '1rem' }}>Resultados:</h4>
          {filteredTickets?.length === 0 && <p>No se encontraron boletos disponibles.</p>}
          <ul>
            {filteredTickets.map(ticket => (
              <li key={ticket.id}>
                <strong>{ticket.origin} → {ticket.destination}</strong><br />
                Fecha: {ticket.date} | Asiento: {ticket.seatNumber} | Precio: {ticket.price} Bs
                <br />
                <button style={{ marginTop: '0.5rem' }}>Seleccionar asiento</button>
                <hr />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
