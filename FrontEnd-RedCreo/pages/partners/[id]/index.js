import Layout from "../../../components/Layout/index.js";
import { useRouter } from "next/router";
import {genericUser} from '../../../actions/user';
import {useState, useEffect} from 'react'
function GenericUser() {
  const Router = useRouter();
  const { id } = Router.query;
  const [data, setData] = useState();
  useEffect(() => {
      const getData =async ()=>{
          const dataPartner = await genericUser(id);
          setData(dataPartner)
      }
      if(id){
        getData();

      }
  }, [id])
  console.log(data)
  return (
    <div>
      <Layout>
          {id}
          </Layout>
    </div>
  );
}

export default GenericUser;
