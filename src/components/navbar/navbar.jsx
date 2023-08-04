import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../../resimler/logo.PNG';
import NavMenu from './NavMenu';
import UsersMenu from './UsersMenu';
import AuthMenu from './AuthMenu';

function MyNavbar() {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
  };

  return (
    <Container>
      <Navbar bg="white" variant="light" expand="lg" className='justify-content-between'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavMenu />
        <Navbar.Brand href="/" className='justify-content-center'>
          <img
            src={logo}
            className="d-inline-block align-top"
            style={{ width: '70%' }}
            alt="logo"
          />
        </Navbar.Brand>
        <UsersMenu />
        {/* {user ? <UsersMenu /> : <AuthMenu handleLogout={handleLogout} />} */}
      </Navbar>
    </Container>
  );
}

export default MyNavbar;
