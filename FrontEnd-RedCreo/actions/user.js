import axios from "axios";
import authHeader from "./auth-header";
import { API } from '../config';


export const getUserData=()=>{
    let datos;
    try {
        datos=  axios.get(API, {
            headers: authHeader()
        })
    } catch (error) {
      datos={data:''}
    }
    return datos
}
export const genericUser = (id)=>{
    let datos;
    let user= "/generic/"+id;
    try {
        datos= axios.get(API+user)

    } catch (error) {
        datos={data:''}
    }
    return datos
}

export const getUserCourses = id => {
    let datos;
    try {
        datos= axios.post(API+'/getCourses',{id:id},{
        headers: authHeader(),
       
        }
        )
    } catch (error) {
        datos={data:''}
    }
    return datos
}

