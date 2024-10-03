import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, clearErrors } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { IoTrashOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import './UsersList.scss';

// const TABLE_HEADS = ['#ID', 'Name', 'Username', 'Email', 'Admin', ''];

const UsersList = () => {
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.users);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUser
  );

  const deleteUserHandler = (id) => {
    if (window.confirm(`Do you want to delete User: ${id}`)) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleteError) {
      toast.error(deleteError);
      clearErrors();
    }

    if (isDeleted) {
      toast.success('Delete successfully');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="users-table__container">
          <div className="table__header">
            <h4 className="header__title">All Users</h4>
          </div>
          <div className="table__content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th className="text-center">Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {user.role === 'admin' ? (
                      <>
                        <td className="text-center">
                          <FaCheck color="#4ce13f" size={25} />
                        </td>
                        <td></td>
                      </>
                    ) : (
                      <>
                        <td className="text-center">
                          <FaTimes color="#ef0606" size={25} />
                        </td>
                        <td>
                          <span onClick={() => deleteUserHandler(user._id)}>
                            <IoTrashOutline size={25} color="#ef0606" />
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
