import { Router } from "express"
import { PostModel } from "../models/post/post.model.js"


export const createPostRouter = () => {

  const postRouter = Router()

  postRouter.post('/create', PostModel.createPost)


  return postRouter
}