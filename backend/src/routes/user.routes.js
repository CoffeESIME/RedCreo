import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getAllUsers,
  getCourses,
  getGenericUserCourses,
  getUser,
  addReview,
  getReview,
  uploadImage,
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/auth.Jwt.js";
import multer from 'multer'
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        //console.log(file) 
        callBack(null,Date.now() + '-' +file.originalname  )
    }
})
 
 var upload = multer({
    storage: storage
});
const router = Router();

router.get("/", verifyToken, getUser);
router.get("/generic/:id", getGenericUserCourses);
router.post("/addCourse", verifyToken, isAdmin, addCourse);
router.delete("/deleteCourse", verifyToken, isAdmin, deleteCourse);
router.post("/getCourses", verifyToken, getCourses);
router.get("/getUsers", verifyToken, isAdmin, getAllUsers);
router.post("/addReview", addReview);
router.get("/getReview/:id", getReview);
router.post("/uploadImage",verifyToken,upload.single('file'), uploadImage )
export default router;
