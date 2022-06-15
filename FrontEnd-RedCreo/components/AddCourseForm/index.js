import { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { addCourse } from "../../actions/admin";
export const AddCourseForm = (props) => {
  //course_id, date, course, credential_id

  const [data, setData] = useState({
    courseId: "",
    course: "",
    credentialId: "",
    date: null,
    submitted: false,
    error: false,
    loading: false,
    message: "",
  });
  const { courseId, course, credentialId, date, error, submitted } = data;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      course === "" ||
      courseId === "" ||
      credentialId === "" ||
      date === null
    ) {
      setData({ ...data, error: true });
    } else {
      setData({ ...data, error: false, submitted: true, loading: true });
      const courseData = {
        course_id: courseId, 
        date: date, 
        course:course, 
        credential_id:credentialId,
        user_id:props.user
      };
      addCourse(courseData).then((response) => {
        if (response.data.affectedRows == 1) {
          setData({
            ...data,
            courseId: "",
            course: "",
            credentialId: "",
            date: null,
            loading: false,
            message: "Se ha añadido el curso",
            error: false,
            submitted: true,
          });
        } else {
          setData({
            ...data,
            error: true,
            loading: false,
            message: "Fallo el registro del curso",
            submitted: false,
          });
        }
      });
    }
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, error: false, [name]: e.target.value });
  };
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>{data.message}</h1>
        
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
        <h1>{data.message}</h1>
      </div>
    );
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mb-3 mt-3">
          <Col md={{ span: 10 }} className="mb-3">
            <Form onSubmit={handleOnSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>
                  Id del Curso
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ID"
                    onChange={handleChange("courseId")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>
                  Nombre del curso
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    required
                    type="Text"
                    placeholder="text"
                    onChange={handleChange("course")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>
                  ID credencial
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    required
                    type="Text"
                    placeholder="text"
                    onChange={handleChange("credentialId")}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={6}>
                  Fecha de registro
                </Form.Label>
                <Col sm={6}>
                  <DatePicker
                    selected={date}
                    onChange={(newDate) => setData({ ...data, date: newDate })}
                  />
                </Col>
              </Form.Group>
              <div className="">
            {errorMessage()}
            {successMessage()}
          </div>
              <Row className="justify-content-md-center">
                <Col md={{ span: 3, offset: 0 }}>
                  <Button type="submit" className="mb-3">
                    Añadir Curso
                  </Button>
                  <Button
                    onClick={() => {
                      props.setShow(false);
                    }}
                    className="mb-3"
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
