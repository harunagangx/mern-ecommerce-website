import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/userAction';
import Loader from '../../components/loader/Loader';
import { toast } from 'sonner';
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
      navigate(`/`);
      toast.success('login successfully');
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading && <Loader />}
      <div className="login__wrapper d-flex align-items-center justify-content-center">
        <div className="login__box">
          <h3 className="text-center p-3">Sign in</h3>
          <form className="login__form" onSubmit={handleLogin}>
            <div className="loginEmail">
              <input
                type="text"
                placeholder="Email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="loginPassword mt-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <span className="float-end mb-2">
                Don't have an account? <Link to="/register">Sign up</Link>
              </span>
            </div>
            <input type="submit" value="Login" className="submitBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
