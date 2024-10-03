import React, { useEffect, useRef, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './TableAction.scss';

const TableAction = ({ DetailRoute }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button className="action-dropdown__btn" onClick={handleDropdown}>
        <HiDotsVertical size={18} />
        {showDropdown && (
          <div className="action-dropdown__menu" ref={dropdownRef}>
            <ul className="dropdown__menu-list d-flex flex-column gap-3">
              <li className="dropdown__menu-item">
                <Link to={DetailRoute} className="dropdown__menu-link">Details</Link>
              </li>
              <li className="dropdown__menu-item">
                <Link className="dropdown__menu-link">Edit</Link>
              </li>
              <li className="dropdown__menu-item">
                <Link className="dropdown__menu-link">Delete</Link>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default TableAction;
