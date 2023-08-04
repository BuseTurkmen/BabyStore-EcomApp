import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UsersMenu = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className="ml-auto" style={{fontSize:'20px'}}>
          <Link class = 'nav-link' to="/login" relative="path">
            Giriş Yap
          </Link>
          <Link class = 'nav-link' to="/signup" relative="path">
            Kayıt Yap
          </Link>
          <Link class = 'nav-link' to="/favori" relative="path">
            <FaHeart />
          </Link>
          <Link class = 'nav-link' to="/cart" relative="path">
            <FaShoppingCart />
          </Link>
        </Nav>
    </Navbar.Collapse>
  );
};

export default UsersMenu;