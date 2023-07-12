const { models } = require('../libs/sequelize');

class UserService {
  constructor() {} 

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  };

  async find() {
    const rta = await models.User.findAll({
      // include: ['customer']
    });
    return rta;
  };

  async findOne(id) {
    const usuario = await models.User.findByPk(id);
    return usuario;
  };

  async update(id, changes) {
    const usuario = await this.findOne(id);
    const rta = await usuario.update(changes);
    return rta;
  };

  async delete(id) {
      const usuario = await this.findOne(id);
     await usuario.destroy();
     return {id};
    }
}

module.exports = UserService;


