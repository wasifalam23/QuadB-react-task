import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="py-4 bg-teal-600">
      <NavLink to="/">
        <h3 className="text-2xl px-6 text-gray-100 font-medium ml-12  max-xl:ml-0">
          ShowBox
        </h3>
      </NavLink>
    </nav>
  );
};

export default NavBar;
