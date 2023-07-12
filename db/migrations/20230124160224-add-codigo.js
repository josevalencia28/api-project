'use strict';
const {ProductSchema, TABLA_PRODUCTOS} = require('../models/products.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(TABLA_PRODUCTOS, 'codigo', ProductSchema.codigo);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(TABLA_PRODUCTOS,'codigo');
  }
};