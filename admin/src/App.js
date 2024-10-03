import './App.scss';
import Dashboard from './pages/dashboard/Dashboard';
import CategoryList from './pages/categoryList/CategoryList';
import OrderList from './pages/orderList/OrderList';
import ProductList from './pages/productList/ProductList';
import ProductDetails from './pages/productDetails/ProductDetails';
import CreateProduct from './pages/createProduct/CreateProduct';
import UpdateProduct from './pages/updateProduct/UpdateProduct';
import OrderDetails from './pages/orderDetails/OrderDetails';
import UsersList from './pages/usersList/UsersList';
import Login from './pages/login/Login';
import BaseLayout from './layout/BaseLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import PrivateRoute from './routes/PrivateRoute';
function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />

        <Route path="/login" element={<Login />} />

        <Route element={<BaseLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/update/:id"
            element={
              <PrivateRoute>
                <UpdateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
