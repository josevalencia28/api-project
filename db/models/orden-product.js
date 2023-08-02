const {Model, DataTypes, Sequelize} = require('sequelize');


const {ORDEN_TABLE} = require('./orden.model');
const {PRODUCTO_TABLE} = require('./productos.model')
 const ORDEN_PRODCUT_TABLE = 'ordenes_products';

const OrdenProductSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    createdAt: {
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue:Sequelize.NOW,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },

      OrdenId:{
        field:'orden_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
        model: ORDEN_TABLE,
        key:'id'
       },
       onUpdate:'CASCADE',
       onDelete:'SET NULL'
       },


    productId:{
        field:'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
        model: PRODUCTO_TABLE,
        key:'id'
       },
       onUpdate:'CASCADE',
       onDelete:'SET NULL'
       },

}

class OrdenProduct extends Model {

    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDEN_PRODCUT_TABLE,
            modelName: 'OrdenProduct',
            timestamps: false
        }
    }
}

module.exports = {
    OrdenProduct, OrdenProductSchema, ORDEN_PRODCUT_TABLE
};
