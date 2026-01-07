import mysql from 'mysql2/promise'

export const pool = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password : 'miclavesecreta',
  database: 'api_blog',
  port : '3306'
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