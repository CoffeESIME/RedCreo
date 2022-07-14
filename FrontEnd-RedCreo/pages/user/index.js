import Layout from "../../components/Layout/index.js";
import Private from "../../components/Private/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import TableUser from "../../components/TableUser/index.js";
import { useState, useEffect } from "react";
import { isAuth } from "../../actions/auth.js";
import { sendImage, getUserData } from "../../actions/user.js";
import { API } from "../../config.js";
function indexUser() {
  const [openTable, setOpenTable] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [infoUser, setInfoUser] = useState();
  const dataUser = isAuth();
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    let name = e.target.files[0].name.split(".");
    setFileName(dataUser.user_name + dataUser.user_last_name_f + "." + name[1]);
  };

  const uploadFile = async (e) => {
    let formData = new FormData();
    formData.append("file", file, fileName);
    await sendImage(formData);
  };
  useEffect(() => {
    const getAllData = async () => {
      const response = await getUserData();
      setInfoUser(response.data[0]);
      console.log(response.data[0]);
    };
    getAllData();
  }, []);
  return (
    <div>
      <Layout>
        <Private>
          <>
            <Container>
              <Row className="justify-content-md-center">
                <Col md={{ span: 8 }}>
                  {infoUser && dataUser && (
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={infoUser && `${API}/images/${infoUser.user_image}`}
                      />
                      <Card.Body>
                        <Card.Title>
                          {dataUser.user_name + dataUser.user_last_name_f}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Ocupación: {infoUser.user_title}
                        </Card.Subtitle>

                        <Card.Text>Empresa: {infoUser.user_company}</Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                  <h2 className="text-white font-weight-bold text-center">
                    Bienvenido
                  </h2>
                  <p className="text-white font-weight-bold text-center h3">
                    Bienvenido a tu espacio dentro de RedCreo A.C aquí podrás
                    actualizar tu información, inscribirte a cursos así como ver
                    las certificaciones que has tomado con nosotros
                  </p>
                  <div>
                    <Form.Control
                      type="file"
                      onChange={saveFile}
                      name="recfile"
                    />
                    <Button onClick={uploadFile}>Upload</Button>
                  </div>
                  <Button onClick={() => setOpenTable(true)}>
                    Ver cursos validados{" "}
                  </Button>

                  <Modal show={openTable}>
                    <TableUser setOpenTable={setOpenTable} />
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
