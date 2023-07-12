'use strict';

const {CategoriaSchema,CATEGORIA_TABLE } = require('../models/categoria.model');
const { ProductoSchema, PRODUCTO_TABLE } = require('../models/productos.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIA_TABLE, CategoriaSchema);
    await queryInterface.createTable(PRODUCTO_TABLE, ProductoSchema);
  }, 

  async down (queryInterface)  {
    await queryInterface.drop(CATEGORIA_TABLE);
    await queryInterface.drop(PRODUCTO_TABLE);
  }
};  
