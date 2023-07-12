'use strict';
const {User} = require('../models/user.model');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');


// /** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {

    return Promise.all([
      User.create({
          name: "Jose ",
          email: "joseluisvalencia@gmail.com",
          password: bcrypt.hashSync("Jose2808", Number.parseInt(authConfig.rounds)),
          posts: [
              {
                  title: "Title 1",
                  body: "Body 1",
              },
               {
                  title: "Title 2",
                  body: "Body 2",
              }
          ]
      }, {  
          include: "posts"
      }
      ),
      User.create({
          name: "Leonardo ",
          email: "leo1@gmail.com",
          password: bcrypt.hashSync("Leo12345",  Number.parseInt( authConfig.rounds)),
          posts: [
              {
                  title: "Title 3",
                  body: "Body 3",
              },
               {
                  title: "Title 4",
                  body: "Body 4",
              }
          ]
      }, {
          include: "posts"
      }
      ),
  ])
 
  },

   down (queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.bulkDelete('posts', null, {}),
        queryInterface.bulkDelete('users', null, {}),
      ]
        )

  }
};
