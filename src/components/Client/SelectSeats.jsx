
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectSeats() {
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pasajeros = parseInt(localStorage.getItem("pasajeros")) || 1;
    setCantidadPasajeros(pasajeros);
    crearAsientos();
  }, []);

  const crearAsientos = () => {
    const mapa = document.getElementById("mapaAsientos");
    mapa.innerHTML = "";
    for (let i = 1; i <= 40; i++) {
      const btn = document.createElement("button");
      btn.className = "seat btn btn-outline-secondary btn-sm";
      btn.textContent = i;
      btn.value = i;
      btn.style.minWidth = "40px";

      btn.addEventListener("click", () => toggleSeleccion(i, btn));

      mapa.appendChild(btn);
    }
  };

  const toggleSeleccion = (i, btn) => {
    const esSeleccionado = seleccionados.includes(i);
    if (esSeleccionado) {
      setSeleccionados(prev => prev.filter(n => n !== i));
      btn.classList.remove("selected", "btn-success");
      btn.classList.add("btn-outline-secondary");
    } else if (seleccionados.length < cantidadPasajeros) {
      setSeleccionados(prev => [...prev, i]);
      btn.classList.add("selected", "btn-success");
      btn.classList.remove("btn-outline-secondary");
    }
  };

  const confirmar = () => {
    if (seleccionados.length === cantidadPasajeros) {
      localStorage.setItem("asientosSeleccionados", JSON.stringify(seleccionados));
      navigate("/payment");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Selección de Asientos</h2>

      <div id="mapaAsientos" className="d-flex flex-wrap justify-content-center mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}></div>

      <div id="indicadorPasajero" className="text-center mb-3 fw-bold text-danger">
        <span className="badge bg-info text-dark">
          Pasajeros seleccionados: {seleccionados.length} / {cantidadPasajeros}
        </span>
      </div>

      <div className="text-center">
        <button className="btn btn-primary px-5" disabled={seleccionados.length !== cantidadPasajeros} onClick={confirmar}>Confirmar Asientos</button>
      </div>
    </div>
  );
}
