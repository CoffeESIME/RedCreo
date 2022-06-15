import Layout from "../../../components/Layout/index.js";
import Admin from "../../../components/Admin/index.js";
import { Button, Table , Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../actions/admin.js";
import TableCourses from '../../../components/TableCourses/index.js';
function Views() {
  const [users, setUsers] = useState();
  const [user, setUser]= useState();
  const [modalCourses, setModalCourses] = useState(false)
  useEffect(() => {
    const getUsers = async () => {
      let usersData = await getAllUsers();
      setUsers(usersData.data);
    };
    getUsers();
  }, []);
  const handleModal=(id)=>{
    setModalCourses(!modalCourses)
    setUser(id)
  }
  return (
    <div>
      <Layout>
        <Admin>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Ver Cursos</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user.user_id}>
                      <td>{`${user.user_first_name} ${user.user_last_name_f} ${user.user_last_name_m?user.user_last_name_m:'' }`}</td>
                      <td>{user.user_company}</td>
                      <td>
                        <Button onClick={()=>handleModal(user.user_id)}>Ver</Button>
                      </td>
                    </tr>
                  );
                })}{" "}
            </tbody>
          </Table>
          <Modal show={modalCourses} >
            <TableCourses handleModal={handleModal} user={user}/>
          </Modal>
        </Admin>
      </Layout>
    </div>
  );
}
export default Views;
