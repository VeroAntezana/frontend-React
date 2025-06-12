import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { OBTENER_USUARIOS, OBTENER_VEHICULOS } from '../graphql/queries';
import { CREAR_VEHICULO } from '../graphql/mutations';

export default function VehiculoPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ anio: '', color: '', estado: '', marca: '', modelo: '', placa: '', tipo: '', usuario_id: '1' });
    const { data: usuariosData, loading: loadingUsuarios, error: errorUsuarios } = useQuery(OBTENER_USUARIOS);
    const { data, loading: loadingVehiculos, error: errorVehiculos, refetch } = useQuery(OBTENER_VEHICULOS);
    const [crearVehiculo, { loading: loadingSubmit, error: errorSubmit }] = useMutation(CREAR_VEHICULO);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCrearVehiculo = async (e) => {
        e.preventDefault();
        try {
            await crearVehiculo({
                variables: {
                    input: {
                        anio: parseInt(form.anio, 10),
                        color: form.color,
                        estado: form.estado,
                        marca: form.marca,
                        modelo: form.modelo,
                        placa: form.placa,
                        tipo: form.tipo,
                        usuario_id: form.usuario_id.toString(),
                    }
                }
            });
            setForm({ anio: '', color: '', estado: '', marca: '', modelo: '', placa: '', tipo: '', usuario_id: '1' });
            refetch();
        } catch (err) {
            console.error('Error al crear vehiculo:', err);
        }
    };

    return (
        <div className="min-vh-100 vw-100 py-4 px-3">
            <div className="card shadow-md h-100 w-100">
                <div className="card-body">
                    <h3 className="card-title mb-4">Nuevo Vehiculo</h3>
                    {errorSubmit && <div className="alert alert-danger p-2">{errorSubmit}</div>}
                    <form className="row g-3" onSubmit={handleCrearVehiculo}>
                        <div className="col-md-6">
                            <input
                                name="anio"
                                type="text"
                                className="form-control"
                                placeholder="anio"
                                value={form.anio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                name="color"
                                type="text"
                                className="form-control"
                                placeholder="color"
                                value={form.color}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                name="estado"
                                className="form-select"
                                value={form.estado}
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                name="marca"
                                type="marca"
                                className="form-control"
                                placeholder="marca"
                                value={form.marca}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                name="modelo"
                                type="modelo"
                                className="form-control"
                                placeholder="modelo"
                                value={form.modelo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                name="placa"
                                type="placa"
                                className="form-control"
                                placeholder="placa"
                                value={form.placa}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                name="tipo"
                                className="form-select"
                                value={form.tipo}
                                onChange={handleChange}
                            >
                                <option value="Flota">Flota</option>
                                <option value="Minibus">Minibus</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="usuario_id"
                                className="form-select"
                                value={form.usuario_id}
                                onChange={handleChange}
                                disabled={loadingUsuarios || errorUsuarios}
                            >
                                <option value="">Seleccione un usuario</option>
                                {usuariosData?.obtenerUsuarios?.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nombre}
                                    </option>
                                ))}
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
                    <h3 className="card-title mb-4">Vehiculos Registrados</h3>
                    {loadingVehiculos ? (
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando vehiculos...</span>
                            </div>
                        </div>
                    ) : errorVehiculos ? (
                        <div className="alert alert-danger p-2">Error cargando: {errorVehiculos.message}</div>
                    ) : data.obtenerVehiculos.length === 0 ? (
                        <p>No hay vehiculos registrados.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Anio</th>
                                        <th>Color</th>
                                        <th>Estado</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Placa</th>
                                        <th>Tipo</th>
                                        <th>Conductor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.obtenerVehiculos.map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.anio}</td>
                                            <td>{u.color}</td>
                                            <td>{u.estado}</td>
                                            <td>{u.marca}</td>
                                            <td>{u.modelo}</td>
                                            <td>{u.placa}</td>
                                            <td>{u.tipo}</td>
                                            <td>{u.usuario_nombre}</td>
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
