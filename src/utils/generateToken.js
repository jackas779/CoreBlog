import * as jose from 'jose';

export async function generarToken(usuario) {
  try {
    // 1. Leemos la llave PRIVADA del archivo .env
    // Asegúrate de que se llame igual que como la guardaste
    const privateKeyJSON = JSON.parse(process.env.PRIVATE_KEY_JSON);
    
    // 2. Importamos la llave para que 'jose' la pueda usar
    const privateKey = await jose.importJWK(privateKeyJSON, 'ES256');

    // 3. Creamos el token (Payload + Firma)
    const jwt = await new jose.SignJWT({ 
        // Payload: Los datos que viajan dentro del token
        sub: usuario.id,       // ID único del usuario
        email: usuario.email,  // Email (opcional)
        role: usuario.role     // Rol (ej: 'abogado', 'admin')
      })
      .setProtectedHeader({ alg: 'ES256' }) // Importante: Definir el algoritmo
      .setIssuedAt()                        // Fecha de creación: Ahora
      .setExpirationTime('2h')              // Expira en 2 horas
      .sign(privateKey);                    // ¡FIRMAMOS CON LA PRIVADA!

    return jwt;

  } catch (error) {
    console.error('Error al generar el token:', error);
    throw new Error('No se pudo crear el token');
  }
}
