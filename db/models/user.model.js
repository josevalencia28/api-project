const { Model, DataTypes, Sequelize} = require('sequelize');


// const {POST_TABLE} = require('./post');

const USER_TABLE = 'usuario';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type:DataTypes.STRING,
    },

    apellido: {
        allowNull:false,
        type:DataTypes.STRING,
    },

    identificacion:{
        allowNull:false,
        type:DataTypes.STRING,
        unique:true,

    },

    telefono: {
        allowNull:false,
        type:DataTypes.STRING,
        unique: false
    },

    email: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail:{
                msg: "El email tiene que ser un correo valido"
            }
        }
    },

    password:{
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [5, 200],
                msg: "La contraseña debe tenener minimo 5 caracteres"
            }
        }
    },

    createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },

    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    static associate() {

    }

    static config(sequelize){
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
};

module.exports = { USER_TABLE,UserSchema, User}
