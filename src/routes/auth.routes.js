import { Router } from "express"
import { AuthController } from "../controllers/auth.controller.js"

export const createAuthRoute = () =>{
  const authRouter = Router()

  const authController = new AuthController()

  authRouter.post('/login' , authController.login)
  authRouter.post('/create', authController.create)

  return authRouter
}