const{Model,DataTypes,Sequelize} = require('sequelize');

// const {PRODUCTO_TABLE} = require('./productos.model')

const CATEGORIA_TABLE= 'categoria';

const CategoriaSchema = {
    id: {
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
    },

    NombreCategoria:{
        allowNull:false,
        type:DataTypes.STRING,
    },

    createdAt: {
      allowNull:false,
      type:DataTypes.DATE,
      field:'created_at',
      defaultValue:Sequelize.NOW,
    },
}

class Category extends Model {

	static associate() {
	// this.hasMany(models.Product, {
  //   as:'products',
	// foreignKey:'categoryId'
	// }
  // );
}
static config(sequelize){
	return {
        sequelize,
	    tableName: CATEGORIA_TABLE,
	    modelName:'Category',
	    timestamps:false
    }
   }
}

module.exports={Category,CategoriaSchema,CATEGORIA_TABLE};
