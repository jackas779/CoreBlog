import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createUserRoute } from './src/routes/user.routes.js'
import { createAuthRoute } from './src/routes/auth.routes.js'
import { auth } from './src/middlewares/auth.handles.js'
import { createPostRouter } from './src/routes/post.routes.js'


const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: '5mb' }))

app.use('/api/user', createUserRoute())
app.use('/api/auth', createAuthRoute())
app.use('/api/post', auth, createPostRouter())

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not found"
  })
})


// manejador de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.name,
    message: err.message,
    // Solo mostramos el stack (línea del error) si estamos en desarrollo
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});



app.listen(3000, () => {
  console.log("Escuchando desde el puerto 3000")
})
