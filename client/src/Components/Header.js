// React Hooks
import React, {useState} from 'react'

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Components
import Logo from '../Images/logo.png'
import { Login } from '../Pages/Login';

// React icons
import {RiLogoutBoxFill} from 'react-icons/ri'
import {FaUser} from 'react-icons/fa'
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {BsBook} from 'react-icons/bs';

const clearLocalStorage = () => {
  window.localStorage.clear();
}

const Header = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{padding: 0}}>
        
        <Container>
          <Navbar.Brand href="/"><img src={Logo} width="120px" style={{verticalAlign: "middle"}} alt="Logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/add-courses"><AiOutlineAppstoreAdd/> Add Courses</Nav.Link>
              <Nav.Link href="/my-courses"><BsBook/> My Courses</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/Profile"><FaUser/> Profile</Nav.Link>
            <Nav.Link href="/" onClick={clearLocalStorage}><RiLogoutBoxFill/> Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;