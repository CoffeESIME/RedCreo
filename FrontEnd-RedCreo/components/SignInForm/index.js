import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authenticate, signin, isAuth } from "../../actions/auth";
import Router from "next/router";

function SignInForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    submitted: false,
    loading: false,
    message: "",
  });

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const { email, password, error, loading, message, submitted } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h2>{values.message}</h2>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Iniciando Sesion</h1>
        <h2>{values.message}</h2>
      </div>
    );
  };

  const showLoading = () => {
    <div
      style={{
        display: loading ? "" : "none",
      }}
    >
      esta cargando perro
    </div>;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setValues({ ...values, error: true });
    } else {
      setValues({ ...values, error: false, submitted: true, loading: true });
      const user = {
        email: email,
        passwordreq: password,
      };
      signin(user).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: true,
            loading: false,
            message: data.message,
            submitted: false,
          });
        } else {
          setValues({
            ...values,
            email: "",
            password: "",
            loading: true,
            message: data.message,
            error: false,
            submitted: true,
          });
          //save data from the user in localstorage
          //save token in cookie
          //auth user
          authenticate(data, () => {
            if (isAuth() && isAuth().level === 1) {
              Router.push("/admin");
            } else {
              Router.push("/user");
            }
          });
        }
      });
    }
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mb-3">
          <Col md={{ span: 6 }} className="mb-3">
            <Form onSubmit={handleOnSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6} className="text-white">
                  Correo
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    required
                    value={values.email}
                    type="text"
                    placeholder="correo"
                    onChange={handleChange("email")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6} className="text-white">
                  Contraseña
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    required
                    value={values.password}
                    type="password"
                    placeholder="password"
                    onChange={handleChange("password")}
                  />
                </Col>
              </Form.Group>

              <Row className="justify-content-md-center">
                <Col md={{ span: 3, offset: 0 }}>
                  <Button type="submit" className="mb-3">
                    Iniciar Sesión
                  </Button>
                  <div className="messages">{errorMessage()}</div>
                </Col>
              </Row>
              <p className="text-white text-center">
                ¿No estas registrado? <Link href="/signup"> Registrate </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="">
        {errorMessage()}
        {successMessage()}
        {showLoading()}
      </div>
    </div>
  );
}

export { SignInForm };
