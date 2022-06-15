import Layout from "../../components/Layout/index.js";
import Admin from "../../components/Admin/index.js";
import {Button} from 'react-bootstrap';
import Router from "next/router.js";
function IndexAdmin() {
  const handleView =()=>{
    Router.push('/admin/view')
  }
  return (
    <div>
      <Layout>
        <Admin>
          {" "}
          <h2>Dashboard Admin</h2>
          <Button onClick={handleView}>Ver personas y cursos</Button>
        </Admin>
      </Layout>
    </div>
  );
}
export default IndexAdmin;
