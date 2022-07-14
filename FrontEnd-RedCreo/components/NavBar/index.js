import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col } from "react-bootstrap";
import { APP_NAME } from "../../config";
import Link from "next/link";
import { MdLogin, MdLogout, MdAccountCircle } from "react-icons/md";
import { signout, isAuth } from "../../actions/auth";
import Router from "next/router";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";

export function NavBar() {
  const [options, setOptions] = useState(false);
  const [profile, setProfile] = useState("");
  useEffect(() => {
    if (isAuth()) {
      setOptions(true);
      if (isAuth().level === 1) {
        setProfile("/admin");
      } else {
        setProfile("/user");
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
                    ¿Quiénes somos?
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
                    <div className="container">
                      <div className="row">
                        <Link href="/signin" passHref className="position-relative">
                          <Nav.Link className="text-white col-4">
                            <div className="row  ">
                              Entrar
                              <IconContext.Provider
                                value={{
                                  className: "",style:{ position:'relative'}
                                }}
                              >
                                {/* No he podido alinear este icono */}
                                <MdLogin />
                              </IconContext.Provider>
                            </div>
                          </Nav.Link>
                        </Link>
                        <Link href="/signup" passHref className="text-white">
                          <Nav.Link className="col-4">Registro</Nav.Link>
                        </Link>
                      </div>
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
                    <MdAccountCircle
                      className=""
                      style={{ width: "30px", height: "30px" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link href={profile} passHref>
                      Mi perfil
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
