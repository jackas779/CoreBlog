import express from 'express';
import { UserController } from '../controllers/user.controller.js';


export const createUserRoute = () =>{

  const userController = new UserController()

  
  const userRouter = express.Router()

  userRouter.get('/list', userController.list)
  userRouter.put('/update/:id', userController.update)
  userRouter.delete('/delete/:id', userController.delete)

  return userRouter
}