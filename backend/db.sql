DROP DATABASE users;
CREATE DATABASE users;
USE users;
CREATE TABLE data_users  (
    user_id int NOT NULL AUTO_INCREMENT,
    user_last_name_m varchar(50) NULL,
    user_last_name_f varchar(50) NOT NULL,
    user_first_name varchar(50) NOT NULL,
    user_date_birth DATE NULL,
    user_company varchar(50) NOT NULL,
	user_level tinyint NOT NULL,
	user_mail varchar(50) NOT NULL,
	user_password varchar(255) NOT NULL,
    user_image varchar(255) NULL,
    user_title varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE data_courses (
    course_id int NOT NULL,
    user_id int NOT NULL,
    issue_date date NOT NULL,
    course_name varchar(255) NOT NULL,
    credential_id varchar(255) NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (user_id) REFERENCES data_users(user_id)
);
CREATE TABLE data_review(
    review_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    client_last_name_m varchar(50)  NULL,
    client_last_name_f varchar(50) NOT NULL,
    client_first_name varchar(50) NOT NULL,
    client_company varchar(255) NOT NULL,
	client_mail varchar(255) NULL,
    stars_review tinyint NOT NULL,
    review_date date NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES data_users(user_id)

);