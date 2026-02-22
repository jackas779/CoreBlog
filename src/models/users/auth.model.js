import { generarToken } from "../../utils/generateToken.js"
import { pool } from "../database/connectionMySql.js"
import bcrypt from "bcrypt"

export default class AuthModel {

  static async #checkExistingUserOrEmail(connection, username, email) {
    const checkUserSql = 'SELECT username, email FROM `users` WHERE `username` = ? OR `email` = ?'
    const [existingUsers] = await connection.execute(checkUserSql, [username, email])

    if (existingUsers.length === 0) {
      return null // No hay conflicto
    }

    // Comprobamos qué campo causó el conflicto
    const usernameExists = existingUsers.some(user => user.username === username)
    if (usernameExists) {
      return { error: "username already exists." }
    }

    return { error: "email already exists." }
  }

  static async create(user) {

    let connection

    try {

      const connection = await pool.getConnection()

      const { username, age, email, first_name, last_name, password } = user

      // 1. Verificar si el usuario ya existe usando el método privado
      const existingUserError = await this.#checkExistingUserOrEmail(connection, username, email)
      if (existingUserError) {
        return existingUserError
      }


      // 2. hashear la contraseña

      const salt = await bcrypt.genSalt(10)
      const password_hash = await bcrypt.hash(password, salt)

      // 3. Insertar el nuevo usuario si no existe
      const insertSql = "INSERT INTO `users` (`username`,`age`,`email`,`first_name`,`last_name`,`password_hash`, `status`) VALUES (?, ?, ?, ?, ?, ?, 3)"
      const insertValues = [username, age, email, first_name, last_name, password_hash]

      const [result] = await connection.execute(insertSql, insertValues)

      // Puedes devolver el ID del nuevo usuario o un mensaje de éxito.
      return { id: result.insertId, message: "Usuario creado correctamente" }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Es importante relanzar el error o manejarlo adecuadamente.
      throw error;
    } finally {
      // Aseguramos que la conexión siempre se libere, incluso si hay un error.
      if (connection) connection.release();
    }
  }

  static async #verifiCredentials(login) {

    const { username = '', email = '', password } = login

    let connection
    try {
      connection = await pool.getConnection()
      const sql = `
      SELECT 
        u.password_hash,
        u.email,
        u.id,
        u.status AS status_id,
        s.status_name AS status
      FROM
        users AS u
      INNER JOIN status AS s
      ON 
        u.status = s.id
      WHERE 
        ( u.email = ? OR u.username = ? )`.trim();

      const values = [email, username]
      const [user] = await connection.execute(sql, values)

      if (!user || user.length === 0) {
        return { message: "username or password incorrect" }
      }



      const resultCompare = await bcrypt.compare(password, user[0].password_hash)

      if (!resultCompare) {
        return { message: 'username or password incorrect' }
      }

      if (user[0].status_id !== 1) {
        const currentStatus = user[0].status.replace(/_/g, ' ')
        return {
          message: `Your account is currently ${currentStatus}. It might be disabled or pending activation. Please contact support.`
        }
      }

      return user

    } catch (error) {
      console.error(error)
      throw error
    } finally {
      if (connection) connection.release()
    }



  }

  static async login(credentials) {

    const user = await this.#verifiCredentials(credentials)

    if (user.message) {
      return user
    }

    // --- AQUÍ GENERAS EL TOKEN ---
    const token = await generarToken(user[0]);

    return {
      message: 'Login exitoso',
      token: token
    }
  }

  static async authorization(credentials) {
    let connection
    try {
      connection = await pool.getConnection()
      const sql = 'SELECT is_active FROM status WHERE id = ? '

      const [rows] = await connection.execute(sql, [credentials.status_id])

      if (rows.length === 0 || rows[0].is_active === 0) {
        return false
      }

      return true

    } catch (error) {
      console.error(error)
      throw error
    } finally {
      if (connection) connection.release()
    }
  }

}