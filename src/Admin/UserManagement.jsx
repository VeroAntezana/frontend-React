import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL Queries y Mutations
const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
      role
    }
  }
`;

const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $role: String!) {
    createUser(input: { name: $name, email: $email, role: $role }) {
      id
      name
      email
      role
    }
  }
`;

export default function UserManagement() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);

  const [form, setForm] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: { ...form } });
    setForm({ name: '', email: '', role: '' });
    refetch();
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧑‍💼 Gestión de Usuarios</h2>

     
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">Usuario</option>
          </select>
        </div>
        <div className="col-md-1 d-grid">
          <button type="submit" className="btn btn-primary">Añadir</button>
        </div>
      </form>

    
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {data.getUsers.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
