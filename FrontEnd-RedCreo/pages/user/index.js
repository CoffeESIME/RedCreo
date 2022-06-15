import Layout from "../../components/Layout/index.js";
import Private from "../../components/Private/index.js";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import TableUser from "../../components/TableUser/index.js";
import { useState } from "react";
function indexUser() {
  const [openTable, setOpenTable] =useState(false);
  
  return (
    <div>
      <Layout>
        <Private>
       
        <>
          <Container>
            <Row className="justify-content-md-center">
              <Col md={{ span: 8 }}>
                <h2 className="text-white font-weight-bold text-center">
                  {" "}
                  Bienvenido
                </h2>
                <p className="text-white font-weight-bold text-center h3">
                  Bienvenido a tu espacio dentro de RedCreo A.C aquí podrás
                  actualizar tu información, inscribirte a cursos así como ver
                  las certificaciones que has tomado con nosotros
                </p>
                <Button onClick={()=>setOpenTable(true)}>Ver cursos validados </Button>
               
                <Modal show={openTable}>
                  <TableUser setOpenTable={setOpenTable}/>
                </Modal>

              </Col>
            </Row>
          </Container>
        </>
        </Private>
      </Layout>
    </div>
  );
}
export default indexUser;
