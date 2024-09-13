import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, registerUser } from '../../actions/userAction';
import { toast } from 'sonner';
import './Register.scss';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    validatePassword: '',
  });

  const { name, username, email, password, validatePassword } = user;

  const handleRegister = (e) => {
    e.preventDefault();

    const userCheck = /^[a-z0-9_.-]{6,25}$/gim;

    if (username < 4) {
      alert('username must be as least 4 characters');
      return;
    }

    if (!userCheck.test(username)) {
      alert('Invalid Username');
      return;
    }

    if (password < 6) {
      alert('password length must be as least 6 characters');
      return;
    }

    if (password !== validatePassword) {
      alert('password doest not match');
      return;
    }

    const formData = new FormData();

    formData.set('name', name);
    formData.set('username', username);
    formData.set('email', email);
    formData.set('password', password);

    dispatch(registerUser(formData));
  };

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading && <Loader />}
      <div className="register__wrapper d-flex align-items-center justify-content-center ">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="register__box">
            <h3 className="text-center p-3">Sign up</h3>
            <form className="register__form" onSubmit={handleRegister}>
              <div className=" mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleDataChange}
                  required
                />
              </div>
              <div className=" mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleDataChange}
                  required
                />
              </div>
              <div className="">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleDataChange}
                  required
                />
              </div>
              <div className=" mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleDataChange}
                  required
                />
              </div>
              <div className=" mt-3">
                <input
                  type="password"
                  placeholder="Repeat password"
                  name="validatePassword"
                  value={validatePassword}
                  onChange={handleDataChange}
                  required
                />
              </div>
              <div className="mt-2">
                <span className="float-end mb-2">
                  Already have an account. <Link to="/login">Sign in</Link>
                </span>
              </div>
              <input type="submit" value="Register" className="submitBtn" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
