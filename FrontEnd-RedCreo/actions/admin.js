import axios from "axios";
import authHeader from "./auth-header";
import { API } from '../config';

export const deleteCourse = course_id =>{
    let datos;
    try {
        datos= axios.delete(API+'/deleteCourse', {
            headers: authHeader(),
            data:{credential_id:course_id}
        })
    } catch (error) {
        datos={data:''}
    }
    return datos
}

export const addCourse = ({course_id, date, course, credential_id, user_id})=>{
    let datos;
    try {
        datos= axios.post(API+'/addCourse', 
            {user:user_id,course_id: course_id, date: date, course:course, credential_id:credential_id}
        ,
        {headers: authHeader()}
        )
    } catch (error) {
        datos={data:''}
    }
    return datos
}

export const getAllUsers = ()=>{
    let datos;
    try{
        datos= axios.get(API+'/getUsers',
        {headers: authHeader()}
        );
    }
    catch (error) {
        datos={data:''}
    }
    return datos
}