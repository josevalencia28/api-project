const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class OrderService {
constructor(){}

  async create(data) {
    const newOrden = await models.Orden.create(data);
    return data;
  }

  async find() {
    const rta = await models.Orden.findAll();
    return rta;
  }

  async findOne(id) {
    const orden = await models.Orden.findByPk(id, {
      include: [
        {
          association: 'customers',
          include: ['user']
        }
      ]
    })
    return { orden };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
