import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


// Route placed inside the private route will trigger the execution of this function first.
export default function PrivateRoute() {
  const { user: currentUser } = useUser();
  return currentUser ? <Outlet /> : <Navigate to='/signin' />;
}