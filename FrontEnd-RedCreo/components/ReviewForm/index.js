import { Form, Col, Row, Button, Container, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { MdStarRate } from "react-icons/md";
import { SendReview } from "../../actions/user";
export default function ReviewForm(props) {
  const [values, setValues] = useState({
    email: "",
    name: "",
    lastNameF: "",
    lastNameM: "",
    company: "",
    stars: 0,
    submitted: false,
    loading: false,
    message: "",
    error: false,
  });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { email, name, lastNameF, lastNameM, company, error, loading, message, submitted, stars } =
    values;
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
        <h1>Calificación Enviada</h1>
        <h2>{message}</h2>
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
    if (email === "") {
      setValues({ ...values, error: true });
    } else {
      setValues({ ...values, error: false, submitted: true, loading: true });
      const user = {
        user_id: parseInt(props.userId),
        email: email,
        name: name,
        last_name_f: lastNameF,
        last_name_m: lastNameM,
        company: company,
        review: stars,
      };
      console.log(user)
      SendReview(user).then((data) => {
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
            name: "",
            lastNameF: "",
            lastNameM: "",
            company: "",
            stars: 0,
            loading: true,
            message: data.message,
            error: false,
            submitted: true,
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
              <Form.Group as={Row} className="mb-3 mt-3">
                <Form.Label column sm={4} className="">
                  Nombre
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    value={name}
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChange("name")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="">
                  Apellido Paterno
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    value={lastNameF}
                    type="text"
                    placeholder="Apellido Paterno"
                    onChange={handleChange("lastNameF")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="">
                  Apellido Materno
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    value={lastNameM}
                    type="text"
                    placeholder="Apellido Materno"
                    onChange={handleChange("lastNameM")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="">
                  Correo
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    value={email}
                    type="text"
                    placeholder="Correo"
                    onChange={handleChange("email")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className="">
                  Empresa
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    value={company}
                    type="text"
                    placeholder="Empresa"
                    onChange={handleChange("company")}
                  />
                </Col>
              </Form.Group>
              <FormGroup as={Row} className="mb-3">
                <Form.Label column sm={4} className="">
                  Calificación
                </Form.Label>
                <Col sm={8}>
                  {[...Array(5)].map((a, index) => {
                    index += 1;
                    return (
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          color: index <= (hover || stars) ? "#000" : "#ccc",
                          display: "inline-block",
                        }}
                        type="button"
                        key={index}
                        className={index <= (hover || stars) ? "on" : "off"}
                        onClick={() => setValues({...values, stars:index})}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(stars)}
                      >
                        <span style={{ display: "inline-block" }}>
                          <MdStarRate />
                        </span>
                      </button>
                    );
                  })}
                </Col>
              </FormGroup>

              <Row className="justify-content-md-center">
                <Col md={{ span: 3, offset: 0 }}>
                  <Button type="submit" className="mb-3">
                    Calificar
                  </Button>
                  <Button onClick={props.handleViewModal}> Cancelar</Button>
                  <div className="messages">{errorMessage()}</div>
                </Col>
              </Row>
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
