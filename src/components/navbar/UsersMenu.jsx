import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { Navbar, Nav } from 'react-bootstrap';

const UsersMenu = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className="ml-auto" style={{fontSize:'20px'}}>
          <Nav.Link href="/login">Giriş Yap</Nav.Link>
          <Nav.Link href="/signup">Kayıt Ol</Nav.Link>
          <Nav.Link href="/favori">
            <FaHeart />
          </Nav.Link>
          <Nav.Link href="/cart">
            <FaShoppingCart />
          </Nav.Link>
        </Nav>
    </Navbar.Collapse>
  );
};

export default UsersMenu;