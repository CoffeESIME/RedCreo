import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col } from "react-bootstrap";
import { APP_NAME } from "../../config";
import Link from "next/link";
import { MdLogin, MdLogout,MdAccountCircle } from "react-icons/md";
import { signout, isAuth } from "../../actions/auth";
import Router from "next/router";
import { useState, useEffect } from "react";
export function NavBar() {
  const [options, setOptions] = useState(false);
  const [profile, setProfile] = useState('');
  useEffect(() => {
    if (isAuth()) {
      setOptions(true);
      if(isAuth().level===1 ){
        setProfile( '/admin')

      }
      else{
        setProfile( '/user')

      }
    } else {
      setOptions(false);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Navbar bg="black" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand as={Link} href="/">
                <img
                  src="/img/RedCreo.png"
                  width="200"
                  className="d-inline-block align-top"
                  alt="logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className="text-white">
                    ¿Quiénes somos? {APP_NAME}
                  </Nav.Link>
                  <Nav.Link className="text-white">Cursos</Nav.Link>
                  <Nav.Link className="text-white">Proyectos</Nav.Link>
                  <NavDropdown
                    className="text-white"
                    title="Espacio de consultas"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Ciberseguridad para todos
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Ciberadicciones
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Amenazas tecnologicas para menores
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">
                      Certificaciones
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link className="text-white">Donaciones</Nav.Link>
                  <Nav.Link className="text-white">Contacto</Nav.Link>
                  {!options && (
                    <div>
                      <Link href="/signin" passHref>
                        <Nav.Link className="text-white">
                          Entrar <MdLogin />
                        </Nav.Link>
                      </Link>
                      <Link href="/signup" passHref className="text-white">
                        <Nav.Link>Registro</Nav.Link>
                      </Link>
                    </div>
                  )}

                  {options && (
                    <div>
                      {" "}
                      <Nav.Link
                        className="text-white"
                        onClick={() => signout(() => Router.replace("/signin"))}
                      >
                        Salir <MdLogout />
                      </Nav.Link>
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
              {options && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                 <MdAccountCircle className="" style={{width: '30px', height:'30px'}}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#"><Link href={profile}>Mi perfil</Link></Dropdown.Item>
              
                </Dropdown.Menu>
              </Dropdown>)}
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
