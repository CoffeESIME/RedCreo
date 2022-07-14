import pool from "../database/connection.js";

export const getUserData = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_id, user_first_name, user_last_name_f, user_level, user_title, user_company,user_date_birth, user_image FROM users.data_users WHERE user_id= ?`,
      [id],
      function (error, results) {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const addUserCourse = (id, course_id, date, course, credential_id) => {
  return new Promise((resolve, reject) => {
    const data = {
      user_id: id,
      course_id: course_id,
      issue_date: date,
      course_name: course,
      credential_id: credential_id,
    };
    pool.query(
      `INSERT INTO users.data_courses set ?`,
      [data],
      function (error, results) {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const deleteUserCourse = (credential_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM users.data_courses WHERE credential_id= ?`,
      [credential_id],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const getUserCourses = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 	issue_date,	course_name,credential_id  FROM users.data_courses WHERE user_id = ?`,
      [id],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_id,	
        user_last_name_f,	
        user_last_name_m,	
        user_first_name,	
        user_company
        FROM users.data_users
        `,
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const addUserReview = ({
  user_id,
  name,
  last_name_f,
  last_name_m,
  company,
  email,
  review,
}) => {
  return new Promise((resolve, reject) => {
    const data = {
      user_id: user_id,
      client_first_name: name,
      client_last_name_f: last_name_f,
      client_last_name_m: last_name_m,
      client_company: company,
      client_mail: email,
      stars_review: review,
      review_date: new Date(),
    };
    pool.query(
      `INSERT INTO users.data_review set ?`,
      [data],
      function (error, results) {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};

export const allReviews = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT stars_review FROM users.data_review WHERE user_id=?`,
      [id],
      (error, results) => {
        if (error) reject(error);
        resolve(results);
      }
    );
  });
};


export const imagePath = (id, path)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE users.data_users SET user_image=? WHERE user_id=?`, [path, id], (error, results)=>{
            if(error) reject(error);
            resolve(results)
        })
    })
}