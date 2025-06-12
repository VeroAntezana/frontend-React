import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { OBTENER_USUARIOS } from '../graphql/queries';
import { CREAR_USUARIO } from '../graphql/mutations';

export default function UserFormRest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol_id: '1' });
  const { data, loading: loadingUsers, error: errorUsers, refetch } = useQuery(OBTENER_USUARIOS);
  const [crearUsuario, { loading: loadingSubmit, error: errorSubmit }] = useMutation(CREAR_USUARIO);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario({
        variables: {
          input: {
            nombre: form.nombre,
            email: form.email,
            password: form.password,
            rol_id: parseInt(form.rol_id, 10)
          }
        }
      });
      setForm({ nombre: '', email: '', password: '', rol_id: '1' });
      refetch();
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  };

  return (
    <div className="min-vh-100 vw-100 py-4 px-3">
      <div className="card shadow-md h-100 w-100">
        <div className="card-body">
          <h3 className="card-title mb-4">🧑‍💼 Nuevo Usuario</h3>
          {errorSubmit && <div className="alert alert-danger p-2">{errorSubmit}</div>}
          <form className="row g-3" onSubmit={handleCrearUsuario}>
            <div className="col-md-6">
              <input
                name="nombre"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                name="rol_id"
                className="form-select"
                value={form.rol_id}
                onChange={handleChange}
              >
                <option value="1">Administrador</option>
                <option value="2">Conductor</option>
              </select>
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-primary w-100" disabled={loadingSubmit}>
                {loadingSubmit ? 'Guardando...' : 'Crear'}
              </button>
            </div>
            <div className="col-md-2 d-grid">
              <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/')}>
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">👥 Usuarios Registrados</h3>
          {loadingUsers ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando usuarios...</span>
              </div>
            </div>
          ) : errorUsers ? (
            <div className="alert alert-danger p-2">Error cargando: {errorUsers.message}</div>
          ) : data.obtenerUsuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {data.obtenerUsuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.rol_id === 1 ? 'Administrador' : u.rol_id === 2 ? 'Conductor' : 'Desconocido'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
