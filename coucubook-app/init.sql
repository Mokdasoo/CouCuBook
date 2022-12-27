
use mysql;
select user, host, plugin from user;
create user 'user'@'%' identified by '1234';
grant all privileges on coucubook.* to 'user'@'%';
FLUSH PRIVILEGES;
show grants for 'user'@'%';

create database coucubook;
use coucubook;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  social_id VARCHAR(45) NOT NULL,
  social_platform VARCHAR(6) NOT NULL,
  nickname VARCHAR(10) NOT NULL,
  birth DATE NOT NULL,
  anniversary DATE NOT NULL,
  user_code CHAR(10) UNIQUE,
  lover_code CHAR(10) NULL
);

