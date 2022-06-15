import { Router } from "express";
import { addCourse, deleteCourse, genericUser, getAllUsers, getCourses, getUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from '../middlewares/auth.Jwt.js';
const router = Router();

router.get('/', verifyToken, getUser);
router.get('/generic/:id',genericUser );
router.post('/addCourse', verifyToken, isAdmin, addCourse);
router.delete('/deleteCourse', verifyToken, isAdmin, deleteCourse);
router.post('/getCourses', verifyToken, getCourses);
router.get('/getUsers', verifyToken, isAdmin, getAllUsers);
export default router;