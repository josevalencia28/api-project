// Importa el módulo de Twilio
const twilio = require('twilio');

// Usuario en twilio
const accountSid = 'AC3594bb1fe1c307027365d0fdb4068a46';
const authToken = 'd7e85def406feff1e9e2af022fe74d1d';
const client = twilio(accountSid, authToken);



// Función para enviar el mensaje
async function enviarMensaje(telefono, nombre) {
  try {
    const message = await client.messages.create({
      body: `\n Bienvenido ${nombre}.\n\n Hola ${nombre}.\n\nGracias por registrarte en nuestro sitio.`,
      from: '+14708022544',
      to: telefono
    });
    console.log(`Mensaje enviado: ${message.sid}`);
  } catch (error) {
    console.error(`Error al enviar el mensaje: ${error.message}`);
  }
}
// Llama a la función para enviar el mensaje
//enviarMensaje('NUMERO_DESTINATARIO', 'Hola, este es un mensaje enviado desde Twilio en Node.js!');


module.exports = {
  enviarMensaje
}
