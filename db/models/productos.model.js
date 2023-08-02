const {Model, DataTypes, Sequelize} = require('sequelize');

// const {CATEGORIA_TABLE} = require('./categoria.model');
// const { ORDEN_TABLE } = require('./orden.model');


const PRODUCTO_TABLE = 'products';

const ProductoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    producto: {
        allowNull: false,
        type: DataTypes.STRING
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.STRING

    },

    marca: {
        allowNull: false,
        type: DataTypes.STRING
    },

    precio: {
        allowNull: false,
        type: DataTypes.STRING,
    },

    fabricado: {
        allowNull:false,
        type: DataTypes.STRING
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },

    //   categoryId:{
    //      field:'category_id',
    //      allowNull: false,
    //      type: DataTypes.INTEGER,
    //      references: {
    //      model: CATEGORIA_TABLE,
    //      key:'id'
    //     },
    //     onUpdate:'CASCADE',
    //     onDelete:'SET NULL'
    //     },

    //     ordenId:{
    //         field:'orden_id',
    //         allowNull: false,
    //         type: DataTypes.INTEGER,
    //         references: {
    //             model: ORDEN_TABLE,
    //             key: 'id'
    //         },
    //         onUpdate:'CASCADE',
    //         onDelete: 'SET NULL'
    //     },


    }

    class Product extends Model {

     static associate() {
        // this.belongsTo(models.Category, {
        //  as:'categoria'});
    }
        static config(sequelize){
        return{
          sequelize,
          tableName: PRODUCTO_TABLE,
          modelName:'Product',
          timestamps:false
        }
    }
}


module.exports = { Product, PRODUCTO_TABLE,ProductoSchema }
