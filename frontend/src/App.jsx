import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorPanel } from './pages/DoctorPanel';
import { Tests } from './pages/Tests';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/dashboard/tests" element={<Tests />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          
          <Route path="/doctor" element={<DoctorPanel />} />
          <Route path="/doctor/patients" element={<div className="p-6 text-slate-500 font-medium">Patients List Coming Soon</div>} />
          <Route path="/doctor/settings" element={<Settings />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
