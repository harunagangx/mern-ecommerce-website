import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaUser, FaLock } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success('Login successfully');
      navigate('/dashboard');
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  return (
    <Fragment>
      {loading && <Loader />}
      <div className="login-page__wrapper d-flex">
        <div className="form__wrapper">
          <h1 className="text-center">Sign in</h1>
          <form onSubmit={handleLogin}>
            <div className="input__wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <span>
                <FaUser size={20} />
              </span>
            </div>
            <div className="input__wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span>
                <FaLock size={20} />
              </span>
            </div>
            <div className="mb-4">
              <input type="checkbox" defaultChecked />
              <label className="ms-2">Remember me</label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
