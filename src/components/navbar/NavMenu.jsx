import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-start'>
        <Nav className="mr-auto" style={{fontSize:'20px'}}>
          <Link class = 'nav-link' to="/" relative="path">
                Anasayfa
          </Link>
          <Link class = 'nav-link' to="/aboutus" relative="path">
                Hakkımızda
          </Link>
          <Link class = 'nav-link' to="/products" relative="path">
                Ürünlerimiz
          </Link>
        </Nav>
    </Navbar.Collapse>
  );
};

export default NavMenu;
