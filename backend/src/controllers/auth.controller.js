import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import pool from "../database/connection.js";
import { getData } from "../models/auth.js";

export const newUser = async (req, res) => {
    const { name, last_name_f, last_name_m, company, email, passwordreq, date_birth, title } = req.body;
    let userLevel = 0;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordreq, salt);
    await pool.query('SELECT * FROM users.data_users WHERE user_mail = ?', [email], function (error, results) {
        if (error) throw error;
        if (results.length == 0) {
            const data = {
                user_last_name_m: last_name_m,
                user_last_name_f: last_name_f,
                user_first_name: name,
                user_date_birth: date_birth,
                user_company: company,
                user_level: userLevel,
                user_mail: email,
                user_password: password,
                user_image: null,
                user_title: title
            }
            pool.query(
                `INSERT INTO users.data_users set ?`, [data]
            );

            res.status(200).json({ message: "Enviado" })
        }
        else {
            res.status(200).json({ message: 'El usuario ya existe', error:true });
        }
    })
}

export const login = async (req, res) => {
    const { email, passwordreq } = req.body;
    const data = await getData(email);
    // console.log(passwordreq);
    // console.log(data[0].user_password);
    if (data[0].user_password!=undefined){
        const validation = await bcrypt.compare(passwordreq, data[0].user_password);
        //console.log(validation)
        if (validation) {
            const token = Jwt.sign({ id: data[0].user_id }, 'datoEncriptado', {
                expiresIn: 86400 //24 horas
            })
            res.status(200).json({ token: token,user:{user_name: data[0].user_first_name, user_last_name_f: data[0].user_last_name_f,user_last_name_m: data[0].user_last_name_m, level: data[0].user_level}  })
        }
        else {
            res.status(401).json({ token: null, message: "Password incorrecto",error:true })
        }
    }
    else{
        res.status(401).json({ token: null, message: "Correo Incorrecto" ,error:true})

    }
}