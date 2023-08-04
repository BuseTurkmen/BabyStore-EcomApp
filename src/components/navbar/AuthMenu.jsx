import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const AuthMenu = ({ userEmail, handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <>
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className="ml-auto" style={{ fontSize: '20px' }}>
          <Nav.Link variant="success" id="dropdown-basic">
            {userEmail}
          </Nav.Link>
          <Nav.Link href="">Profil</Nav.Link>
          <Nav.Link onClick={handleLogoutClick}>Çıkış Yap</Nav.Link>
          <Nav.Link href="/favori">
            <FaHeart />
          </Nav.Link>
          <Nav.Link href="/cart">
            <FaShoppingCart />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

export default AuthMenu;
