import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  
  const navigate = useNavigate(); 

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); 
  };

  return (
    <Navbar expand="lg" className="bg-primary text-white">
      <Container fluid>
        <Navbar.Brand href="#"><><b>Travel Journal App</b></></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/"><><b>Home</b></></Nav.Link>
            <Nav.Link href="/journals"><><b>Journals</b></></Nav.Link>
           <NavDropdown title={<b>Profile</b>} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/Profile"><b>My Profile</b></NavDropdown.Item>
              <NavDropdown.Item href="/Login">
                <b>Login</b>
              </NavDropdown.Item>
              <NavDropdown.Item href="/Sign-up">
                <b>Sign-up</b>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}><b>Logout</b></NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;