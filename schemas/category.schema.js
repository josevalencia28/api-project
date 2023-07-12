const Joi = require('joi');

const id = Joi.number().integer();
const nombreCategoria = Joi.string().min(3).max(15);


const createCategorySchema = Joi.object({
  nombreCategoria: nombreCategoria.required(),
});

const updateCategorySchema = Joi.object({
  nombreCategoria: nombreCategoria,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
