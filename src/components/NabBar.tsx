import React from 'react';
import Container from '../layouts/Container';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Container>
      <div className="py-4 bg-teal-600">
        <NavLink to="/">
          <h3 className="text-2xl px-4 text-gray-100 font-medium">ShowBox</h3>
        </NavLink>
      </div>
    </Container>
  );
};

export default NavBar;
