import React, { useState, useEffect } from "react";
import { signup } from "../../actions/auth";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
function SignUpForm() {
  const [values, setValues] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    empresa: "",
    email: "",
    password: "",
    titulo: "",
    BirthDate: null,
    submitted: false,
    error: false,
    loading: false,
    message: "",
  });
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    empresa,
    email,
    password,
    titulo,
    BirthDate,
    submitted,
    error,
  } = values;

  useEffect(()=>{
    isAuth() && Router.push('/')
  },[])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nombre === "" ||
      email === "" ||
      password === "" ||
      empresa === "" ||
      apellidoPaterno === "" ||
      apellidoMaterno === "" ||
      titulo === "" ||
      BirthDate === ""
    ) {
      setValues({ ...values, error: true });
    } else {
      setValues({ ...values, error: false, submitted: true, loading: true });
      const user = {
        name: nombre,
        last_name_f: apellidoPaterno,
        last_name_m: apellidoMaterno,
        company: empresa,
        email: email,
        passwordreq: password,
        date_birth: BirthDate,
        title: titulo,
      };

      signup(user).then((data) => {
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
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            empresa: "",
            email: "",
            password: "",
            titulo: "",
            BirthDate: null,
            loading: false,
            message: data.message,
            error: false,
            submitted: true,
          });
        }
      });
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1> Te has registrado correctamente</h1>
        Por favor accede con tu nueva cuenta
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="text-danger"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>{values.message}</h1>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
          <div>
            <h1 className="text-center text-white">Registro de usuarios</h1>
          </div>

          <div className="">
            {errorMessage()}
            {successMessage()}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                {" "}
                Nombre
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  required
                  value={values.nombre}
                  type="text"
                  placeholder="nombre"
                  onChange={handleChange("nombre")}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                {" "}
                Apellido Paterno
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  required
                  value={values.apellidoPaterno}
                  type="text"
                  placeholder="Apellido P"
                  onChange={handleChange("apellidoPaterno")}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                {" "}
                Apellido Materno
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  required
                  value={values.apellidoMaterno}
                  type="text"
                  placeholder="Apellido "
                  onChange={handleChange("apellidoMaterno")}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                {" "}
                Empresa
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  required
                  value={values.empresa}
                  type="text"
                  placeholder="Empresa"
                  onChange={handleChange("empresa")}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                Titulo
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  required
                  value={values.titulo}
                  type="text"
                  placeholder="Titulo"
                  onChange={handleChange("titulo")}
                />
              </Col>
            </Form.Group>
            <FormGroup as={Row} className="mb-3">
              <Form.Label column sm={6} className="text-white">
                Fecha Nacimiento
              </Form.Label>
              <Col sm={6}>
                <DatePicker
                  selected={BirthDate}
                  onChange={(date) =>
                    setValues({ ...values, error: false, BirthDate: date })
                  }
                />
              </Col>
            </FormGroup>
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
                <Button className="mt-0" type="submit">
                  Registrarse
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export { SignUpForm };
