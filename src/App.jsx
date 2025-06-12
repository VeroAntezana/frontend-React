// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TicketList from './Admin/TicketList';
import PaymentList from './Admin/PaymentList';
import TicketForm from './components/Client/TicketForm';
import PaymentForm from './components/Client/Payment';
import PurchaseFlow from './Client/PurchaseFlow';
import SearchForm from './components/Client/SearchForm';
import SelectPassengers from './components/Client/SelectPassengers';
import SelectSeats from './components/Client/SelectSeats';
import Home from './components/Home';
import UserForm from './Admin/UserForm';
import UserManagement from './Admin/UserManagement';
import UserFormRest from './Admin/UserFormRest';
import VehiculoPage from './Admin/VehiculosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/users/new" element={<UserForm />} />

        {/* Vistas Admin */}
        <Route path="/admin/tickets" element={<TicketList />} />
        <Route path="/admin/payments" element={<PaymentList />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/users/new-rest" element={<UserFormRest />} />        

        {/* Vistas Cliente */}
        <Route path="/cliente/ticket" element={<TicketForm />} />
        <Route path="/cliente/pago" element={<PaymentForm />} />
        <Route path="/cliente/flujo" element={<PurchaseFlow />} />
        <Route path="/buscar" element={<SearchForm />} />
        <Route path="/select-passengers" element={<SelectPassengers />} />
        <Route path="/select-seats" element={<SelectSeats />} />
        <Route path="/vehiculos" element={<VehiculoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;



