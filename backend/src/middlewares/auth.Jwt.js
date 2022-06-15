import Jwt from "jsonwebtoken";
import { admin, getID } from "../models/auth.js";
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        console.log(req.headers)
        if (!token) return res.status(403).json({ message: " No token provided, unauthorized", error:true });
        const decoded = Jwt.verify(token, "datoEncriptado");
        req.user_id = decoded.id;
        await getID(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: "unauthorize" , error:true});
    }
};

export const isAdmin = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: " No token provided, unauthorized", error:true });
    const decoded = Jwt.verify(token, "datoEncriptado");
    const request = await admin(decoded.id)
    if (request[0].user_level == 1) {
        next()
        return;
    }
    return res.status(403).json({ message: "Requiere un rol mas alto" });
};
export const isUser = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: " No token provided, unauthorized", error:true });
    const decoded = Jwt.verify(token, "datoEncriptado");
    const request = await admin(decoded.id)
    if (request[0].user_level == 0) {
        next()
        return;
    }
    return res.status(403).json({ message: "Restringido, usuario no encontrado" , error:true});
 };
