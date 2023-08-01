// AuthenticatedNavbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import logo from '../../resimler/logo.PNG'
const AuthenticatedNavbar = ({ userEmail, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-nav">
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-start'>
        <Nav className="mr-auto" style={{fontSize:'20px'}}>
          <Nav.Link href="/">Anasayfa</Nav.Link>
          <Nav.Link href="">Hakkımızda</Nav.Link>
          <Nav.Link href="/products">Ürünlerimiz</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand href="/" className='justify-content-center'>
        <img
          src={logo}
          className="d-inline-block align-top"
          style={{width:'70%'}}
          alt="logo"
        />
      </Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {userEmail}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Link href="/favori">
            <FaHeart />
        </Nav.Link>
        <Nav.Link href="/cart">
            <FaShoppingCart />
        </Nav.Link>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
