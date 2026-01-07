import { login } from "../schemas/user/login.schema.js"
import AuthModel from "../models/users/auth.model.js";
import { user } from '../schemas/user/user.schema.js';

export class AuthController {
  
  async login(req, res){
    const result = login.safeParse(req.body)

    if(!result.success){ 

      const field = result.error.issues[0].path[0];
      const message = result.error.issues[0].message;
    
      const messageError = {"field": field, "error": message}
      return res.json(messageError)

    }

    return res.json(await AuthModel.login(result.data))

  }

  async create(req, res){

    const body = req.body

    const result = user.safeParse(body)

    if(!result.success){
      const field = result.error.issues[0].path[0];
      const message = result.error.issues[0].message;
    
      const messageError = {"field": field, "error": message}
      return res.json(messageError)
    }

    return res.json(await AuthModel.create(result.data))
    
  } 
}