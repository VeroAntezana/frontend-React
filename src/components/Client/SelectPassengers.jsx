
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectPassengers() {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [datosPasajeros, setDatosPasajeros] = useState([]);

  useEffect(() => {
    const cant = parseInt(localStorage.getItem("pasajeros")) || 1;
    setCantidad(cant);
    setDatosPasajeros(Array.from({ length: cant }, () => ({ nombre: '', apellido: '', ci: '', nacimiento: '', genero: '', correo: '', telefono: '' })));
  }, []);

  const handleChange = (i, field, value) => {
    const updated = [...datosPasajeros];
    updated[i][field] = value;
    setDatosPasajeros(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("pasajerosData", JSON.stringify(datosPasajeros));
    navigate("/select-seats");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Datos de los Pasajeros</h2>
      <form onSubmit={handleSubmit} className="border rounded p-4 bg-light shadow-sm">
        <div className="row g-4">
          {datosPasajeros.map((p, i) => (
            <div key={i} className="col-md-12 border rounded p-3 bg-white shadow-sm">
              <h5 className="mb-3">Pasajero {i + 1} {i === 0 && '(Principal)'}</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" value={p.nombre} onChange={(e) => handleChange(i, 'nombre', e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido</label>
                  <input type="text" className="form-control" value={p.apellido} onChange={(e) => handleChange(i, 'apellido', e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nro. de Identidad</label>
                  <input type="text" className="form-control" value={p.ci} onChange={(e) => handleChange(i, 'ci', e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Fecha de nacimiento</label>
                  <input type="date" className="form-control" value={p.nacimiento} onChange={(e) => handleChange(i, 'nacimiento', e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Género</label>
                  <select className="form-select" value={p.genero} onChange={(e) => handleChange(i, 'genero', e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                  </select>
                </div>
                {i === 0 && (
                  <>
                    <div className="col-md-6">
                      <label className="form-label">Correo electrónico</label>
                      <input type="email" className="form-control" value={p.correo} onChange={(e) => handleChange(i, 'correo', e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Teléfono</label>
                      <input type="tel" className="form-control" value={p.telefono} onChange={(e) => handleChange(i, 'telefono', e.target.value)} required />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-success px-5">Continuar</button>
        </div>
      </form>
    </div>
  );
}
