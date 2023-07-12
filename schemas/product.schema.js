const Joi = require('joi');

const id = Joi.number().integer();
const producto = Joi.string().min(3).max(20);
const descripcion = Joi.string();
const precio = Joi.string();
const fabricado = Joi.string().min(3).max(50);
// const fechaVencimiento = Joi.date();
const marca = Joi.string();


const createProductSchema = Joi.object({
  producto: producto.required(),
  descripcion: descripcion.required(),
  precio: precio.required(),
  fabricado: fabricado.required(),
  // fechaVencimiento: fechaVencimiento.required(),
  marca: marca.required(),

});

const updateProductSchema = Joi.object({
  // codigo: codigo.required(),
  // nombre: nombre.required(),
  // precio: precio.required(),
  // fabricado: fabricado.required(),
  // fechaVencimiento: fechaVencimiento.required()
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
