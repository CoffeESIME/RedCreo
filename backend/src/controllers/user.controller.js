import { getUserData, addUserCourse, deleteUserCourse, getUserCourses, getUsers, addUserReview, allReviews, imagePath } from "../models/user.js";
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

export const getGenericUserCourses =async (req,res)=>{
    const id = req.params.id;
    const resultUser = await getUserData(id);
    const resultCourses = await getUserCourses(id);
    res.json({user:resultUser[0], courses:resultCourses});
};


export const addReview = async (req, res )=>{
    const {userReview} =req.body;
    const {user_id, name, last_name_f, last_name_m, company,email, review} = userReview
    console.log({user_id, email, name, last_name_f, last_name_m, company, review})
    const results= await addUserReview({user_id, email, name, last_name_f, last_name_m, company, review});
    res.json({message: "ok", results})
}

export const getReview =async(req, res)=>{
    const id = req.params.id;
    const results = await allReviews(id);
    res.json({message:'ok', results})
}

 export const uploadImage=(req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        const token = req.headers["x-access-token"];
        const decoded = Jwt.verify(token, "datoEncriptado");
        const id=decoded.id
        console.log(decoded.id)
        console.log(req.file)
        console.log(req.data)
        let imgsrc =req.file.filename
        const results= imagePath(id, imgsrc)
        res.json({message:'ok', results})
    }
}
 