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


export const SendReview = (userReview)=>{
    let datos;
    try {
        datos= axios.post(API+'/addReview', 
            {userReview}
        ,
        {headers: authHeader()}
        )
    } catch (error) {
        datos={data:''}
    }
    return datos
}

export const getStars= (id)=>{
    let datos;
    try {
        datos= axios.get(API+'/getReview/'+id)
    }catch{
        datos={data:''}
    }
    return datos
}

export const sendImage=(form)=>{
    let datos;
    try {
        datos =  fetch(`${API}/uploadImage`, {
          method: "POST",
          headers: authHeader(),
          body: form,
        });
      } catch{
        datos={data:''}
      }
      return datos
}