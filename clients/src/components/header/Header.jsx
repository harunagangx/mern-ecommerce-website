import React, { useEffect, useRef } from 'react';
import { BiShoppingBag, BiMenu, BiUser } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoIcon from '../../assets/logo-icon.svg';
// import SearchBar from '../searchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userAction';
import { toast } from 'sonner';
import './Header.scss';

const nav_links = [
  {
    path: '',
    display: 'Home',
  },
  {
    path: 'shop',
    display: 'Shop',
  },
  {
    path: 'about-us',
    display: 'About Us',
  },
  {
    path: 'contact',
    display: 'Contact Us',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky');
      } else {
        headerRef.current.classList.remove('sticky');
      }
    });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logout successfully');
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  });

  return (
    <div
      className="header__wrapper d-flex align-items-center justify-content-between"
      ref={headerRef}
    >
      <div className="header__logo">
        <Link to="/" className="d-flex align-items-center gap-2">
          <img src={logoIcon} alt="" />
          <h5>NOVACANE</h5>
        </Link>
      </div>
      <div className="header__navigation">
        <ul className="menu d-flex align-items-center gap-4">
          {nav_links.map((item, index) => (
            <li className="menu-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? 'nav-active' : ''
                }
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="header__icons d-flex align-item-center gap-4">
        <div className="search-widget">{/* <SearchBar /> */}</div>
        <div className="cart-icon">
          <Link to="/cart">
            <BiShoppingBag size={20} />
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="user-icon">
            <Link to="/login">
              <BiUser size={20} />
            </Link>
          </div>
        ) : (
          <>
            <div className="user-icon">
              <Link to="/profile">
                <BiUser size={20} />
              </Link>
            </div>

            <div className="logout-icon">
              <span onClick={handleLogout}>
                <MdOutlineLogout size={20} />
              </span>
            </div>
          </>
        )}

        <div className="nav-mobile-icon">
          <BiMenu size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
