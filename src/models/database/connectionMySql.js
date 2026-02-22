import mysql from 'mysql2/promise'

export const pool = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
});

// A simple SELECT query
// try {
//   const [results, fields] = await connection.query(
//     'SELECT * FROM pruebas where age > 25 '
//   );

//   console.log(results); // results contains rows returned by server
// } catch (err) {
//   console.log(err);
// } finally {   
//   connection.end()
// }



// // Using placeholders
// try {
//   const [results] = await connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45]
//   );

//   console.log(results);
// } catch (err) {
//   console.log(err);
// }