'use strict';
const {OrdenSchema, ORDEN_TABLE} = require('../models/orden.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDEN_TABLE, OrdenSchema);

  },

  async down (queryInterface) {
    await queryInterface.drop(ORDEN_TABLE);

  }
};
