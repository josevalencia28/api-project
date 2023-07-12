const { DataTypes, Sequelize, Model} = require('sequelize');
const { USER_TABLE } = require('./user.model');

const POST_TABLE = 'post';

const PostSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
        type:Sequelize.STRING
    },
    body: {
        type: Sequelize.TEXT
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references:{
            model: USER_TABLE,
            Key: "id"
        },
        onDelete: "CASCADE"
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,  
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
}

class Post extends Model{
    static associate(models){
        this.belongsTo(models.User, {
            as: 'user'
        })
    }

    static config(sequelize) {
        return {
          sequelize,
          tableName: POST_TABLE,
          modelName: 'Post',
          timestamps: false
        }
      }

}

module.exports = {POST_TABLE, PostSchema, Post }