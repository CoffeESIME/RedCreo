import { getUserData, addUserCourse, deleteUserCourse, getUserCourses, getUsers } from "../models/user.js";
import Jwt from "jsonwebtoken";
export const getUser = async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: " No token provided" });
    const decoded = Jwt.verify(token, "datoEncriptado");
    const result = await getUserData(decoded.id);
    res.json(result);
};

export const genericUser = async (req,res)=>{
    const id = req.params.id;
    const result = await getUserData(id);
    res.json(result[0]);
};

export const addCourse  = async (req, res) =>{

    const {course_id, date, course, credential_id, user} = req.body
    const result = await addUserCourse(user,course_id, date, course, credential_id );
    res.json(result);
};

export const deleteCourse = async (req, res) => {
    const {credential_id} = req.body;
    const result = await deleteUserCourse(credential_id);
    res.json(result)
    
}
export const getCourses = async (req, res) => {
    let {id } =req.body
    if(id==undefined){
        const token = req.headers["x-access-token"];
        const decoded = Jwt.verify(token, "datoEncriptado");
        id=decoded.id
    }
    const result = await getUserCourses (id);
    res.json(result);
}

export const getAllUsers = async (req,res)=>{
    const result= await getUsers();
    res.json(result)
}