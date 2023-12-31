//const { ConnectionAcquireTimeoutError } = require('sequelize');
const {User, UserSchema} = require('./user.model');
const { Customer, CustomerSchema} = require('./customer.model');
const { Category, CategoriaSchema} = require('./categoria.model');
const { Product,ProductoSchema } = require('./productos.model');
const {Orden, OrdenSchema} = require('./orden.model');
const {OrdenProduct, OrdenProductSchema} = require('./orden-product');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema,Customer.config(sequelize));
    Category.init(CategoriaSchema,Category.config(sequelize));
    Product.init(ProductoSchema, Product.config(sequelize));
    Orden.init(OrdenSchema, Orden.config(sequelize));
    OrdenProduct.init(OrdenProductSchema, OrdenProduct.config(sequelize));


    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Orden.associate(sequelize.models);
    OrdenProduct.associate(sequelize.models);

}

module.exports = setupModels;
