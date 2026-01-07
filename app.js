import express from 'express'
import cors from 'cors'
import { createUserRoute } from './src/routes/user.routes.js'
import { createAuthRoute } from './src/routes/auth.routes.js'
import { auth } from './src/middlewares/auth.handles.js'


const app = express()

app.use(cors())
app.use(express.json({limit: '5mb'}))

app.use('/api/user',createUserRoute())
app.use('/api/auth', createAuthRoute())
app.use('/api/post', auth, (req, res) => {
  res.status(200).json({status: "welcome"})
})

app.use((req, res)=>{
  res.json({status: "Not found"})
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



app.listen(3000, ()=>{
  console.log("Escuchando desde el puerto 3000")
})
