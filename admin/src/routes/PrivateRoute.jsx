import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <>
      {loading === false &&
        (!isAuthenticated && !isAdmin ? <Navigate to="/login" /> : children)}
    </>
  );
};

export default PrivateRoute;
