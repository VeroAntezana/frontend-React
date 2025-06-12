// src/components/Client/SearchForm.jsx
import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_TICKETS, PARSE_NLP } from '../../graphql/queries.js';

export default function SearchForm({ onResults }) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });
  const [nlpText, setNlpText] = useState('');
  const [parseText, { loading: nlpLoading, error: nlpError }] = useLazyQuery(PARSE_NLP);
  const [searchTickets, { loading, error, data }] = useLazyQuery(SEARCH_TICKETS);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    searchTickets({ variables: formData });
  };

  const handleNLPSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await parseText({ variables: { text: nlpText } });
      const parsed = res.data.parseNaturalText;
      localStorage.setItem("pasajeros", parsed.passengers || 1);
      searchTickets({ variables: parsed });
    } catch (err) {
      console.error("NLP error", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Buscar Salidas de Bus</h2>

      <form onSubmit={handleNLPSubmit} className="mb-4">
        <label className="form-label fw-bold">Buscar por texto:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ej: viajar de SC a CBBA el viernes para 2 personas"
            value={nlpText}
            onChange={(e) => setNlpText(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-danger">Buscar</button>
        </div>
      </form>

      <form onSubmit={handleManualSubmit} className="border p-3 bg-light rounded">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Ciudad de origen</label>
            <select className="form-select" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })}>
              <option value="">Seleccione ciudad origen</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Cochabamba">Cochabamba</option>
              <option value="La Paz">La Paz</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Ciudad de destino</label>
            <select className="form-select" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })}>
              <option value="">Seleccione ciudad destino</option>
              <option value="La Paz">La Paz</option>
              <option value="Cochabamba">Cochabamba</option>
              <option value="Santa Cruz">Santa Cruz</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha de salida</label>
            <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Cantidad de pasajeros</label>
            <input type="number" className="form-control" min="1" value={formData.passengers} onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })} required />
          </div>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-outline-danger">Buscar salidas</button>
        </div>
      </form>

      <div className="mt-4">
        {loading && <div className="alert alert-info">Buscando salidas...</div>}
        {error && <div className="alert alert-danger">Error: {error.message}</div>}
        {data?.searchTickets?.length > 0 ? (
          data.searchTickets.map((s, i) => (
            <div key={i} className="card my-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{s.origin} → {s.destination}</h5>
                <p className="card-text">{s.departureTime} → {s.arrivalTime}</p>
                <p className="card-text">Empresa: <strong>{s.company}</strong></p>
                <p className="card-text">Precio: <strong>Bs {s.price}</strong></p>
                <button className="btn btn-primary" onClick={() => {
                  localStorage.setItem("salidaSeleccionada", JSON.stringify(s));
                  window.location.href = "/select-passengers";
                }}>Seleccionar</button>
              </div>
            </div>
          ))
        ) : data && <div className="alert alert-warning">No se encontraron salidas.</div>}
      </div>
    </div>
  );
}
