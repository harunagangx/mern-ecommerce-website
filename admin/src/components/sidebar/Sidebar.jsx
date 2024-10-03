import React from 'react';
import LogoBlue from '../../assets/logos/logo_blue.svg';
import {
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlineShoppingBag,
  MdOutlineCategory,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userAction';
import './Sidebar.scss';
import { toast } from 'sonner';

const NAV_VALUES = [
  {
    path: '/dashboard',
    display: 'Dashboard',
    icon: <MdOutlineGridView />,
  },
  {
    path: '/orders',
    display: 'Orders',
    icon: <MdOutlineCurrencyExchange />,
  },
  {
    path: '/categories',
    display: 'Categories',
    icon: <MdOutlineCategory />,
  },
  {
    path: '/products',
    display: 'Products',
    icon: <MdOutlineShoppingBag />,
  },
  {
    path: '/users',
    display: 'Users',
    icon: <MdOutlinePeople />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    toast.success('Logout Successfully');
  };

  return (
    <nav className="sidebar d-flex flex-column">
      <div className="sidebar-top d-flex align-items-center justify-content-between">
        <div className="logo-brand d-flex align-items-center">
          <img src={LogoBlue} alt="logo" />
          <span className="logo-brand-text text-uppercase">
            Admin Dashboard
          </span>
        </div>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {NAV_VALUES.map((nav, key) => (
              <li className="menu-item">
                <NavLink to={nav.path} className="menu-link">
                  <span className="menu-link-icon">{nav.icon}</span>
                  <span className="menu-link-text">{nav.display}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sidebar-bottom">
        <ul className="menu-list">
          <li className="menu-item">
            <button className="menu-link" onClick={handleLogoutUser}>
              <span className="menu-link-icon">
                <MdOutlineLogout />
              </span>
              <span className="menu-link-text">Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
