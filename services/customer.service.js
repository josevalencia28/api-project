const {models} = require('../libs/sequelize');

class CustomersService {
    constructor(){}

    async create(data) {
        const newCustomer = await models.Customer.create(data, {
            include:['user']});
          return newCustomer;
    };

    async find() {
        const rta = await models.Customer.findAll({
            include:['user']});
        return rta;
    };

    async findOne(id){
        const customer = await models.Customer.findByPk(id);
        return customer;
    };

    async update(id, changes){
        const customer = await this.findOne(id);
        const rta = await customer.update(changes);
        return rta;
    };

    async delete(id){
        const customer = await this.findOne(id);
        await customer.destroy();
        return{rta: true};
    }

}

module.exports = CustomersService;