import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import logo from '../../resimler/logo.PNG'

function MyNavbar() {
  return (
    <Container>
    <Navbar bg="white" variant="light" expand="lg" className='justify-content-between'>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
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
    </Navbar>
    </Container>
  );
}

export default MyNavbar;

