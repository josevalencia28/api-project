'use strict';
const {ProductoSchema, PRODUCTO_TABLE} = require('../models/productos.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCTO_TABLE, ProductoSchema);
 
  },

  async down (queryInterface) {
    await queryInterface.drop(PRODUCTO_TABLE);

  }
};
