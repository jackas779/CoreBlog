import { pool } from "../database/connectionMySql.js";

export class PostModel {
  static async createPost({ userId, title, description }) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.execute(
        'INSERT INTO posts (user_id, title, description) VALUES (?, ?, ?)',
        [userId, title, description]
      );
      return { id: result.insertId, message: 'Post created successfully' };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  static async getPostById(postId) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'SELECT id, user_id, title, description, created_at FROM posts WHERE id = ?',
        [postId]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error getting post by ID:', error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  static async updatePost(postId, { title, description }) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.execute(
        'UPDATE posts SET title = ?, description = ? WHERE id = ?',
        [title, description, postId]
      );
      if (result.affectedRows === 0) {
        return { error: 'Post not found or no changes were made.' };
      }
      return { message: 'Post updated successfully' };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  static async deletePost(postId) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.execute(
        'DELETE FROM posts WHERE id = ?',
        [postId]
      );
      if (result.affectedRows === 0) {
        return { error: 'Post not found.' };
      }
      return { message: 'Post deleted successfully' };
    } catch (error) {
      console.error('Error deleting post', error)
    };
  }

}