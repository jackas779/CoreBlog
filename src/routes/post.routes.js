import { Router } from "express"


export const createPostRouter =  () => {

  const postRouter = Router()

  postRouter.post('/create', (req, res) => {
    res.json({message : "se creo algo"})
  })


  return postRouter
}