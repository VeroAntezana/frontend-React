import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Mutation para crear usuario
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

export default function UserForm() {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await createUser({ variables: { ...form } });
    setForm({ name: '', email: '', role: '' });
   
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧑‍💼 Nuevo Usuario</h2>
      {error && <p className="text-danger">Error: {error.message}</p>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="col-md-3">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Rol</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">Usuario</option>
          </select>
        </div>
        <div className="col-md-1 d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '…Guardando' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
}
