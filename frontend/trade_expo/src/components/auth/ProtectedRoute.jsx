import { Navigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useGlobal();
  const location = useLocation();

  // Safeguard against any hydration race condition
  const hasLocalSession = (() => {
    try {
      return !!localStorage.getItem('user');
    } catch (e) {
      return false;
    }
  })();

  if (!isLoggedIn && !hasLocalSession) {
    // Redirect to login (Tickets page step 0) but save the current location
    return <Navigate to="/tickets" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
