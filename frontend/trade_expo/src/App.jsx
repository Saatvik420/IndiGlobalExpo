import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Exhibitor from './pages/Exhibitor';
import ExhibitionLayout from './pages/ExhibitionLayout';
import Sectors from './pages/Sectors';
import Tickets from './pages/Tickets';
import Visitor from './pages/Visitor';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Legal from './pages/corporate/Legal';
import Press from './pages/corporate/Press';
import Privacy from './pages/corporate/Privacy';
import Teams from './pages/corporate/Teams';
import apiClient from './api/client';

// Main Application Component - Triggering Netlify Build with new Env Variables
function App() {
  useEffect(() => {
    // Ping the backend to wake it up (Render Free Tier cold start mitigation)
    const wakeUpServer = async () => {
      try {
        await apiClient.get('/auth/health');
        console.log("Backend is awake and healthy.");
      } catch (error) {
        console.error("Backend wake-up ping failed:", error.message);
      }
    };
    wakeUpServer();
  }, []);

  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exhibitor" element={<Exhibitor />} />
        <Route path="/exhibition-layout" element={<ExhibitionLayout />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/press" element={<Press />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/visitor" element={<Visitor />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
