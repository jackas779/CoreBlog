import * as jose from 'jose'
import AuthModel from '../models/users/auth.model.js';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const jws = authHeader.split(' ')[1];

  try {
    const publicKeyJSON = JSON.parse(process.env.PUBLIC_KEY_JSON);
    const publicKey = await jose.importJWK(publicKeyJSON, 'ES256');

    const { payload } = await jose.jwtVerify(jws, publicKey);
    const authorization = await AuthModel.authorization(payload);


    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    next();
  } catch (error) {

    error.statusCode = 401

    if (error.code === 'ERR_JWT_EXPIRED') {
      return res.status(401).json({ message: 'Token has expired' });
    }

    if (error.name === 'JWSSignatureVerificationFailed' ||
      error.code === 'ERR_JWS_INVALID') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    next()
  }
}