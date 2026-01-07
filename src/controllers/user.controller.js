import {UserModel} from '../models/users/user.model.js'
import { userUpdate } from '../schemas/user/user.schema.js';

export class UserController {


  async update(req, res){

    const id = req.params.id

    if(!id){
      return res.json({error : "is requerid ID"})
    }

    const body = req.body
    const result = userUpdate.safeParse(body) 

    const resultModel = await UserModel.update(id,result.data)

    return res.json({status: resultModel})
  }

  async delete(req, res){
    const id = req.params.id

    if(!id){
      return res.json({error : "is requerid ID"})
    }

    const resultModel = await UserModel.delete(id)

    return res.json({resultModel})
  
  }

  async list(req, res){
    const users = await UserModel.list()
    return res.json({users, count : users.length})
  }
}