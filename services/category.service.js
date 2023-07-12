const  {models} = require('../libs/sequelize')

class CategoryService {
  constructor(){}

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async create(data) {
    const newCategoria = await models.Categoria.create((data,{include:['product']}));
    return newCategoria;
  };

  async findOne(id) {
    const categoria = await models.Categoria.findByPk(id)
    return categoria;
  };

  async update(id, changes) {
    const categoria = await this.findOne(id);
    const rta = await categoria.update(changes);
    return rta;
  };

  async delete(id) {
    const categoria = await this.findOne(id);
    await categoria.destroy();
    return {rta: true };
  }

}

module.exports = CategoryService;
