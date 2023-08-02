/* eslint-disable no-console */
  const  {User} = require ('../db/models/user.model');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const authConfig = require('../config/authConfig');
  const nodemailer = require('nodemailer');
  const twilioService = require('./twilio.service');
  //const twilio = require('twilio');




    // Registro de Usuario
    const signUp = async (req, res) => {
      try {
        // Encriptamos la contraseña
        const password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        const usuarioxistente = await User.findOne({
          where: { email: req.body.email }, // Utiliza el campo que consideres único (en este caso, el correo electrónico)
        });

        // Si el usuario ya existe, devuelve un mensaje de error
        if (usuarioxistente) {
          console.log({ message: 'Usuario ya existe: '})
          return res.status(400).json({ message: 'El usuario ya está registrado' });

        }

        // Crear usuario
        const user = await User.create({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          identificacion: req.body.identificacion,
          telefono: req.body.telefono,
          email: req.body.email,
          password: password,
        });

        // Crear el token
        const token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: '10min', algorithm: 'HS256'
        });

        const usuario = {
          nombre: user.nombre,
          apellido: user.apellido,
          identificacion: user.identificacion,
          telefono: user.telefono,
          email: user.email
        };



        twilioService.enviarMensaje(user.telefono, user.nombre);

        // Configurar transporte de correo electrónico
        const transporter = nodemailer.createTransport({
          // Configuración del transporte de correo electrónico
          // Por ejemplo, si estás utilizando un servidor SMTP, proporciona los detalles del servidor aquí
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
          //service: 'gmail',
        proxy: 'myproxys://localhost:1234',
        auth: {
        user: 'joseluisvalencia654@gmail.com',
        pass: 'qkdiqwdotylbvkud'
          },
          tls: {
            // no falle en certificados inválidos
            rejectUnauthorized: false,
          },

        });
        transporter.set('proxy_handler_myproxys', (proxy, options, callback) => {
          console.log('Proxy host=% port=%', proxy.hostname, proxy.port);
          const socket = require('tls').connect(options.port, options.host, () => {
              callback(null, {
                  connection: socket,
                  secured: true,
              });
          });
      });

       // Firma de correo electrónico
       const signature = `
       <p style="font-size: 14px; font-weight: bold;">--</p>
       <p style="font-size: 14px; font-weight: bold;">Jose Luis Valencia</p>
       <p style="font-size: 12px;">Ingeniero de Sistemas</p>
       <p style="font-size: 12px;"> <b>Contacto: </b></p>
       <p style="font-size: 12px;"> corrreo: joseluisvalencia654@gmail.com <br> <p>Tel:</><a href= "tel:+573015189675"> (+57) 301 5189675 </a> </p>
     `;
        // Enviar correo electrónico al usuario
        const mailOptions = {
          from: ``, // Dirección de correo electrónico del remitente
          to:`${user.email}` , // Dirección de correo electrónico del destinatario
          subject: `Bienvenido ${user.nombre}`, // Asunto del correo electrónico
          text: `Hola ${user.nombre}, gracias por registrarte en nuestro sitio.`, // Cuerpo del correo electrónico en formato de texto sin formato
          html: `<p>Hola ${user.nombre},</p><p>Gracias por registrarte en nuestro sitio.</p> ${signature}`, // Cuerpo del correo electrónico en formato HTML
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json(error);
          } else {
            console.log('Correo electrónico enviado:', info.response);
            //res.json('Correo electrónico enviado:', info.response);
            res.json({
              user: usuario,
              token: token,
              message: 'Correo electrónico enviado: ' + info.response
            });
          }
        });
      } catch (err) {
        res.status(500).json(err);
      }
    };

    // Iniciar sesión
    const signIn = async (req, res) => {
      const { email, password } = req.body;

      // Buscamos el usuario
      await User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (!user) {
          console.log('Usuario no encontrado');
          res.status(404).json({ msg: "Usuario no encontrado" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            // Generar un token aleatorio de 10 caracteres
            //const token = generateRandomToken(20);
          // Generar un token JWT con la información del usuario y el secreto definido en authConfig
       const token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
        algorithm: 'HS256'
    });

            const usuario = {
              id: user.id,
              nombre: user.nombre,
              apellido: user.apellido,
              identificacion: user.identificacion,
              telefono: user.telefono,
              email: user.email,
            };

            res.json({
              user: usuario,
              token: token
            });
          } else {
            res.status(401).json({ msg: "contraseña incorrecta" })
          }
        }
      }).catch(err => {
        res.status(500).json(err);
      });
    };

    // Función para generar un token aleatorio de longitud específica

  const  updateUser = async (id, data) => {

    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const password = data.password ? bcrypt.hashSync(data.password, Number.parseInt(authConfig.rounds)) : user.password;

    const Data = user;

    if (data.nombre) {
      user.nombre = data.nombre;
    }
    if (data.apellido) {
      user.apellido = data.apellido;
    }
    if (data.identificacion) {
      user.identificacion = data.identificacion;
    }
    if (data.telefono) {
      user.telefono = data.telefono;
    }
    if (data.email) {
      user.email = data.email;
    }

    user.password = password;


    await user.save();

    const updatedUser = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      identificacion: user.identificacion,
      telefono: user.telefono,
      email: user.email
    };
    //Verifica si el correo electrónico ha sido actualizado
if (Data !== data.user) {
// Configurar transporte de correo electrónico
const transporter = nodemailer.createTransport({
  // Configuración del transporte de correo electrónico
  // Por ejemplo, si estás utilizando un servidor SMTP, proporciona los detalles del servidor aquí
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  proxy: 'myproxys://localhost:1234',
 // service: 'gmail',
  auth: {
    user: 'joseluisvalencia654@gmail.com',
    pass: 'qkdiqwdotylbvkud'
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
transporter.set('proxy_handler_myproxys', (proxy, options, callback) => {
  console.log('Proxy host=% port=%', proxy.hostname, proxy.port);
  const socket = require('tls').connect(options.port, options.host, () => {
      callback(null, {
          connection: socket,
          secured: true
      });
  });
});


       // Firma de correo electrónico
       const signature = `
       <p style="font-size: 14px; font-weight: bold;">--</p>
       <p style="font-size: 14px; font-weight: bold;">Jose Luis Valencia</p>
       <p style="font-size: 12px;">Ingeniero de Sistemas</p>
       <p style="font-size: 12px;">Services Software</p>
       <p style="font-size: 12px;">joseluisvalencia654@gmail.com</p>`;

// Enviar correo electrónico al usuario
const mailOptions = {
  from: 'joseluisvalencia654@gmail.com', // Dirección de correo electrónico del remitente
  to: `${user.email}`, // Dirección de correo electrónico del destinatario
  subject: `${user.nombre} su actualización fue correcta `, // Asunto del correo electrónico
  text: `Hola ${user.nombre},Su perfil fue actualizado.`, // Cuerpo del correo electrónico en formato de texto sin formato
  html: `<p>Hola ${user.nombre},</p><p>Su perfil fue actulizado correctamente.</p> ${signature}`, // Cuerpo del correo electrónico en formato HTML
  dsn: {
    id: 'alguna identificación específica de mensaje aleatorio',
    return: 'headers',
    notify: ['failure', 'delay'],
    recipient: 'joseluisvalencia654@gmail.com'
}
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error al enviar el correo electrónico:', error);
  } else {
    console.log('Correo electrónico enviado:', info.response);
    //res.json('Correo electrónico enviado:', info.response);
  }
});
}
return updatedUser;
}
      const  deleteUser = async (id)  => {
        try {
          const user = await User.findByPk(id);

          if (!user) {
            throw new Error('Usuario no encontrado');
          }
          await user.destroy();
          console.log('Usuario eliminado con exito')
          return user;
        } catch (error) {
          throw new Error('Error al eliminar el usuario');
        }
      }

    module.exports = {
        signIn,
        signUp,
        updateUser,
        deleteUser,



    }
