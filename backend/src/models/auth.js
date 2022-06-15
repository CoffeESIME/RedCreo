import pool from "../database/connection.js";

export const getData = (email) => {
    return new Promise((resolve, reject) => {
        pool
            .query(`SELECT user_password,user_id, user_first_name, user_last_name_f, user_level FROM users.data_users WHERE user_mail= ?`, [email], function (error, results) {
                if (error) reject(error);
                resolve(results)
            })
    })
}

export const getID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users.data_users WHERE user_id= ?`, [id], function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    })
}

export const admin = (id) =>{
    return new Promise ((resolve, reject)=>{
        pool.query(`SELECT user_level FROM users.data_users WHERE user_id=?`,[id],(error, results)=>{
            if(error) reject(error);
            resolve(results)
        })
    })
}