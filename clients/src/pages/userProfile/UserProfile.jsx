import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import UpdateUserProfileWidget from '../../components/updateUserProfileWidget/UpdateUserProfileWidget';
import './UserProfile.scss';

const UserProfile = () => {
  const { loading, user } = useSelector((state) => state.user);

  const [showWidget, setShowWidget] = useState(false);

  const handleToggleWidget = () => {
    setShowWidget(!showWidget);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="profile__section">
            <div className="container d-flex align-items-center">
              <div>
                <h1>My Profile</h1>

                <div>
                  <div>
                    <h4>Full name: </h4>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h4>Username: </h4>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <h4>Email: </h4>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h4>Create At: </h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
                </div>
                <button onClick={handleToggleWidget}>Edit Profile</button>
              </div>

              <div>
                <Link to="/my-orders">My Orders</Link>
              </div>
            </div>
          </section>
          {showWidget && (
            <>
              <div className="overlay__container"></div>
              <UpdateUserProfileWidget handleCloseWidget={handleToggleWidget} />
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfile;
