
import Layout from '../components/Layout/index.js';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
 function Home() {
  return (
    <div >
     <Layout>
     <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/carrusel/1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Ayudamos a seguir creciendo. por favor</h3>
            <p>RedCrep A.C. presentes desde el 2014</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/carrusel/2.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Costruccion de Ciudadadania digital responsable</h3>
            <p>
              Desde la llegada del internet nos enfrentamos a nuevos retos en la
              red
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/carrusel/3.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Proteger a nuestros jovenes</h3>
            <p>Nativos digitalmente responsables, se parte del equipo </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Col>
      </Row>
    </Container>
     </Layout>
    </div>
  )
}
export default Home