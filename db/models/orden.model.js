const {Model, DataTypes, Sequelize} = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');
const ORDEN_TABLE = 'orden';

const OrdenSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    customerId:{
        field:'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
        model: CUSTOMER_TABLE,
        key:'id'
       },
       onUpdate:'CASCADE',
       onDelete:'SET NULL'
       },

       createdAt: {
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue:Sequelize.NOW,
      },


}

class Orden extends Model {

    static associate(models) {
        this.belongsTo(models.Customer, {
            as:'customers',
            // foreignKey: 'ordenId'
        });
        this.belongsToMany(models.Product,{
            as: 'items',
            through: models.OrdenProduct,
            foreignKey: 'ordenId',
            otherKey: 'productId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDEN_TABLE,
            modelName: 'Orden',
            timestamps: false
        }
    }
}

module.exports = {
Orden, OrdenSchema, ORDEN_TABLE
};
