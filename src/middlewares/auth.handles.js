import * as jose from 'jose'
import AuthModel from '../models/users/auth.model.js';

export const auth = async (req,res, next) => {

  const publicKeyJSON = JSON.parse(process.env.PUBLIC_KEY_JSON);

  
  const publicKey = await jose.importJWK(publicKeyJSON, 'ES256');

  const jws = req.headers.authorization.split(' ')[1]

  try {
    const { payload }  = await jose.jwtVerify(jws, publicKey)
    const authorization = await AuthModel.authorization(payload);


    if(!authorization){
      return res.status(401).json({message : 'Unauthorized'})
    }


  } catch (error) {

    error.statusCode = 401

    if(error.name === 'JWSSignatureVerificationFailed' ){
      next(error)
    }
    if(error.code === 'ERR_JWS_INVALID'){
      next(error)
    }
    if(error.code === 'ERR_JWT_EXPIRED'){
      next(error)
    }
  }

  next()
}