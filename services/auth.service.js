/* eslint-disable no-console */
const  {User} = require ('../db/models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const nodemailer = require('nodemailer');

  
    // Registro de Usuario
    const signUp = async (req, res) => {
      try {
        // Encriptamos la contraseña
        const password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    
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
          expiresIn: authConfig.expires,
        });
    
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
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
       
        });
        transporter.set('proxy_handler_myproxys', (proxy, options, callback) => {
          console.log('Proxy host=% port=%', proxy.hostname, proxy.port);
          let socket = require('tls').connect(options.port, options.host, () => {
              callback(null, {
                  connection: socket,
                  secured: true
              });
          });
      });
    
        // Enviar correo electrónico al usuario
        const mailOptions = {
          from: 'joseluisvalencia654@gmail.com', // Dirección de correo electrónico del remitente
          to: user.email, // Dirección de correo electrónico del destinatario
          subject: '¡Bienvenido!', // Asunto del correo electrónico
          text: 'Hola, gracias por registrarte en nuestro sitio.', // Cuerpo del correo electrónico en formato de texto sin formato
          html: '<p>Hola,</p><p>Gracias por registrarte en nuestro sitio.</p>', // Cuerpo del correo electrónico en formato HTML
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json(error);
          } else {
            console.log('Correo electrónico enviado:', info.response);
            res.json({
              user: user,
              token: token
            });
          }
        });
      } catch (err) {
        res.status(500).json(err);
      }
    };

     // Inicio de Sesión
     const signIn = async (req, res) => {

      const {email, password} = req.body;

      //Buscamos el usuario
    await  User.findOne({
          where:{
              email: email
          }   
      }).then(user => {

          if(!user) {
              
              res.status(404).json({ msg: "Usuario no encontrado"});
          } else {

              if (bcrypt.compareSync(password, user.password)) {

                    //creamos el token 
          const token = jwt.sign({ user: user}, authConfig.secret, {
              expiresIn: authConfig.expires,

          });

               res.json({
                  user: user,
                  token: token
               })

              } else { 

                      //acceso no autorizado
                  res.status(401).json({ msg: "contraseña incorrecta" })
              }

          }
      }).catch(err => {

          res.status(500).json(err);

      });
      
  }
    
    const  updateUser = async (id, data) => {
        
      
          const user = await User.findByPk(id);
      
          if (!id) {
            throw new Error('Usuario no encontrado');
          }

          const password = bcrypt.hashSync(data.password, Number.parseInt(authConfig.rounds));
         
          const Data = user;

          user.nombre = data.nombre;
          user.apellido = data.apellido;
          user.identificacion = data.identificacion;
          user.telefono = data.telefono;
          user.email = data.email;
          user.password = password;

          
         
          await user.save();
          

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
        let socket = require('tls').connect(options.port, options.host, () => {
            callback(null, {
                connection: socket,
                secured: true
            });
        });
    });
      //transporter.set('proxy_socks_module', require('socks'));
      // Enviar correo electrónico al usuario
      const mailOptions = {
        from: 'joseluisvalencia654@gmail.com', // Dirección de correo electrónico del remitente
        to: user.email, // Dirección de correo electrónico del destinatario
        subject: 'Actualización de datos', // Asunto del correo electrónico
        text: 'Hola,tu contraseña ha sido actualizada correctamente.', // Cuerpo del correo electrónico en formato de texto sin formato
        html: '<p>Hola,</p><p>El dato ha sido actualizada correctamente.</p>', // Cuerpo del correo electrónico en formato HTML
        dsn: {
          id: 'some random message specific id',
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
        }
      });
    }

    return user;
  }

      async function deleteUser(id) {
        try {
          const user = await User.findByPk(id);
      
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
      
          await user.destroy();
      
          return user;
        } catch (error) {
          throw new Error('Error al eliminar el usuario');
        }
      }      
          
    module.exports = {
        signIn,
        signUp,
        updateUser,
        deleteUser
    }