const Joi = require('joi');

const id = Joi.number().integer();
const nombre =Joi.string().min(3);
const apellido = Joi.string().min(3);
const identificacion = Joi.string().min(5);
const telefono = Joi.string().min(10);
const email = Joi.string();
const password = Joi.string().min(5);


const createUserSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  identificacion: identificacion.required(),
  telefono: telefono.required(),
  email: email.required(),
  password: password.required(),
  
});

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  identificacion: identificacion.required(),
  telefono: telefono.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const postUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),

})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, postUserSchema } 


