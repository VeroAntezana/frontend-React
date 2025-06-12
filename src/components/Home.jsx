import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <>
      <style>{`.hover-shadow:hover { box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important; transform: translateY(-2px); }`}</style>

      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src="/images/flota.jpg"
          alt="Flota de vehículos"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      
      <div className="container mt-4">
        <div className="row">
          
          <div className="col-md-3 mb-4">
            <Link to="/admin/tickets" className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: '2rem' }}>🎫</span>
                  <h5 className="card-title mt-2">Gestión de Tickets</h5>
                </div>
              </div>
            </Link>
          </div>

          
          <div className="col-md-3 mb-4">
            <Link to="/admin/payments" className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: '2rem' }}>💵</span>
                  <h5 className="card-title mt-2">Gestión de Pagos</h5>
                </div>
              </div>
            </Link>
          </div>

         
          <div className="col-md-3 mb-4">
             <Link to="/admin/users/new-rest" className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: '2rem' }}>👥</span>
                  <h5 className="card-title mt-2">Gestión de Usuarios</h5>
                </div>
              </div>
            </Link>
          </div>

          {/** Gestión de Vehículos **/}
          <div className="col-md-3 mb-4">
            <Link to="/vehiculos" className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: '2rem' }}>🚗</span>
                  <h5 className="card-title mt-2">Gestión de Vehículos</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
