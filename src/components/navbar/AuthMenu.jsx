import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {saveUser} from '../../redux/slice/loginSlice'
import { Link } from 'react-router-dom';
import AdminPanelLayout from '../../pages/AdminPanel/AdminPanel'
const AuthMenu = ({ userEmail }) => {
  const storeUser = useSelector((state) => state?.login?.user)
  const [user, setUser] = useState(storeUser); 
  const dispatch = useDispatch()
  useEffect(()=>{
    debugger
    console.log('%cAuthMenu.jsx line:18 saveUser', 'color: #007acc;', user);
  },[user] )
  const handleLogoutClick = () => {
    dispatch(saveUser(null))
  };

  return (
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
      <Nav className="ml-auto" style={{ fontSize: '20px' }}>

        <>
          {user && user?.name === 'admin@gmail.com' ? (
            <AdminPanelLayout handleLogout={handleLogoutClick} />
          ) : (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link class='nav-link' to="/profile" relative="path">
                    Profil
                  </Link></Dropdown.Item>
                  <Dropdown.Item onClick={handleLogoutClick}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </>
        <Link class='nav-link' to="/favori" relative="path">
          <FaHeart />
        </Link>
        <Link class='nav-link' to="/cart" relative="path">
          <FaShoppingCart />
        </Link>
      </Nav>
    </Navbar.Collapse>

  )
};

export default AuthMenu;
