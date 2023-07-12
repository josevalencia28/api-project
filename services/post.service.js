const {Post} = require('../db/models/post');


module.exports = {
   
   async index(req, res){ 
    let post = await Post.findAll();

    return res.json(post);
   }
}