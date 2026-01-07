import * as jose from 'jose';

async function crearLlaves() {
  console.log("Generando llaves...");

  // EL CAMBIO ESTÁ AQUÍ: Agregamos { extractable: true }
  // Esto le dice a Node: "Permite que estas llaves se puedan leer y guardar"
  const { privateKey, publicKey } = await jose.generateKeyPair('ES256', {
    // extractable: true
  });

  // Ahora sí, Node dejará exportarlas sin lanzar error
  const privateKeyJWK = await jose.exportJWK(privateKey);
  const publicKeyJWK = await jose.exportJWK(publicKey);

  console.log('\n✅ ¡Llaves generadas con éxito! \n');

  console.log('--- COPIA ESTA LÍNEA EN TU ARCHIVO .env (LLAVE PRIVADA) ---');
  // Usamos JSON.stringify dos veces o escapamos comillas para que sea un string seguro en .env
  console.log(`PRIVATE_KEY_JSON='${JSON.stringify(privateKeyJWK)}'`);

  console.log('\n--- COPIA ESTA LÍNEA (OPCIONAL, O GUÁRDALA APARTE) ---');
  console.log(`PUBLIC_KEY_JSON='${JSON.stringify(publicKeyJWK)}'`);
}

crearLlaves().catch((err) => {
    console.error("Error fatal:", err);
});