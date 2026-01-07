
import { pool } from "../database/connectionMySql.js"

export class UserModel {

  static async update(id,user){
    let connection; // La definimos aquí para que sea accesible en el bloque finally
    try{

      const fieldsToUpdate = Object.keys(user);

      // Si el objeto 'user' está vacío, no hay nada que actualizar.
      if (fieldsToUpdate.length === 0) {
        return { message: "No fields to update." };
      }

      const setClause = fieldsToUpdate.map(key => `\`${key}\` = ?`).join(', ');
      const sqlUpdate = `UPDATE \`users\` SET ${setClause} WHERE \`id\` = ?`;

      const updateValues = [...Object.values(user), id];

      connection = await pool.getConnection()
      const [result] = await connection.execute(sqlUpdate, updateValues);

      // Verificamos si alguna fila fue afectada para saber si el usuario existía.
      if (result.affectedRows === 0) {
        return { error: "User not found or no changes were made." };
      }

      return { message: "User updated successfully." };
    } catch(error){
      console.error("Error al actualizar el usuario:", error);
      // Es importante relanzar el error o manejarlo adecuadamente.
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  static async delete(id){
    let connection;
    try{
      connection = await pool.getConnection()
      const deleteSql = "UPDATE `users` SET status = 6  WHERE `id` = ?"
      const [result] = await connection.execute(deleteSql, [id])

      if(result.affectedRows === 0){
        return { error: "User not found." }
      }
      return {message: "user deleted successfully"}

    }catch(error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  static async list(){
    let connection;
    try{ 
      connection = await pool.getConnection()
      const sql = "SELECT username,email,first_name,last_name,age,status FROM users"
      const [rows] = await connection.execute(sql)
      return rows;
    }catch(error){
      console.error("Error al listar los usuarios:", error);
      throw error;
    } finally {
      if (connection) connection.release();
    }

  }
}