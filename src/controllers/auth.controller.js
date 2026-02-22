import { login } from "../schemas/user/login.schema.js"
import AuthModel from "../models/users/auth.model.js";
import { user } from '../schemas/user/user.schema.js';
import * as jose from 'jose';

export class AuthController {

  async login(req, res) {
    // Check if user is already logged in with a valid cookie
    const existingToken = req.cookies?.token;

    if (existingToken) {
      try {
        const publicKeyJSON = JSON.parse(process.env.PUBLIC_KEY_JSON);
        const publicKey = await jose.importJWK(publicKeyJSON, 'ES256');
        await jose.jwtVerify(existingToken, publicKey);

        return res.status(200).json({ message: 'Already logged in' });
      } catch (error) {
        // Token invalid or expired, continue to login process
      }
    }

    const result = login.safeParse(req.body)

    if (!result.success) {

      const field = result.error.issues[0].path[0];
      const message = result.error.issues[0].message;

      const messageError = { "field": field, "error": message }
      return res.json(messageError)

    }

    const resultAuth = await AuthModel.login(result.data)

    if (resultAuth.token) {
      res.cookie('token', resultAuth.token, {
        httpOnly: true, // Only accessible by the server
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })

      // Remove token from body for security
      delete resultAuth.token
    }

    return res.json(resultAuth)

  }

  async create(req, res) {

    const body = req.body

    const result = user.safeParse(body)

    if (!result.success) {
      const field = result.error.issues[0].path[0];
      const message = result.error.issues[0].message;

      const messageError = { "field": field, "error": message }
      return res.json(messageError)
    }

    return res.json(await AuthModel.create(result.data))

  }
}