import { Navigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useGlobal();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login (Tickets page step 0) but save the current location
    return <Navigate to="/tickets" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
