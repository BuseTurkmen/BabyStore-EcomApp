import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';

const NavMenu = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-start'>
        <Nav className="mr-auto" style={{fontSize:'20px'}}>
          <Nav.Link href="/">Anasayfa</Nav.Link>
          <Nav.Link href="/aboutus">Hakkımızda</Nav.Link>
          <Nav.Link href="/products">Ürünlerimiz</Nav.Link>
        </Nav>
    </Navbar.Collapse>
  );
};

export default NavMenu;
