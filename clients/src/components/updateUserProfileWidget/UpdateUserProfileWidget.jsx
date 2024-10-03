import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, clearErrors, loadUser } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { toast } from 'sonner';
import './UpdateUserProfileWidget.scss';
import Loader from '../loader/Loader';

const UpdateUserProfileWidget = ({ handleCloseWidget }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { error, success } = useSelector((state) => state.userProfile);

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('username', username);
    myForm.set('email', email);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUserName(user.username);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Update profile successfully');
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, user, error, success]);

  return (
    <div className="widget__container p-3">
      <div className="widget__header d-flex align-items-center justify-content-between mb-2">
        <h4>Update Profile</h4>
        <span onClick={handleCloseWidget}>
          <IoMdCloseCircleOutline size={22} />
        </span>
      </div>
      <form onSubmit={handleUpdateSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Submit" className="submitBtn" />
      </form>
    </div>
  );
};

export default UpdateUserProfileWidget;
