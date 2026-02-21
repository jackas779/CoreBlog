## dadatabase = api_blog

### users
```sql
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT UNIQUE, 
	username VARCHAR(50) NOT NULL UNIQUE,
	email  VARCHAR(100) NOT NULL UNIQUE ,
	password_hash VARCHAR(255) NOT NULL ,
	first_name VARCHAR(100) ,
	last_name VARCHAR (100),
	status TINYINT(2) NOT NULL DEFAULT 0 ,
	create_at TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
	CONSTRAINT PK_Users PRIMARY KEY (username,id)
);

```
### post

```sql
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `autor` int NOT NULL,
  `status` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
```
### status
```sql
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `status_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modify_by_id` int NOT NULL,
  `last_date_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `last_modify_by_id` (`last_modify_by_id`),
  CONSTRAINT `status_ibfk_1` FOREIGN KEY (`last_modify_by_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)
```