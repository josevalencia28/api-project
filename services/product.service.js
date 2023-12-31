
      const {models} = require('../libs/sequelize');


      class ProductsService {
        constructor(){}

        async create(data) {
          const newProduct = await models.Product.create(data);
          return newProduct;
        };
        async findByUserId() {
          return await models.Product.findAll();
        }

        async findOne(id) {
          const producto = await models.Product.findByPk(id);
          return producto;
        };

        async update(id, changes) {
          const producto = await this.findOne(id);
          const rta = await producto.update(changes);
          return rta;
        };


        async delete(id) {
        const producto = await this.findOne(id);
        await producto.destroy();
        return {id};
        }

      }

      module.exports = ProductsService;
