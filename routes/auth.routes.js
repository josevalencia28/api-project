const express = require ('express');
const {signIn, signUp, updateUser,deleteUser} = require('../services/auth.service');
const { postUserSchema, createUserSchema,  } = require('./../schemas/user.schema');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
//Home


router.post('/login',validatorHandler(postUserSchema), signIn);
router.post('/',validatorHandler(createUserSchema, 'body'),
signUp);

//Actulizar
router.patch('/usuario/:id', async (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    try {
      const updatedUser = await updateUser(userId, data, { attributes: { exclude: ['password'] } });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Usuario no encontrado' });
    }
  });

  //Eliminar usuario
    router.delete('/usuario/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const deletedUser = await deleteUser(id);
        return res.status(200).json(deletedUser);
      } catch (error) {
        return res.status(500).json({ error: 'Usuario no encontrado' });
      }
    });


//Registro
// router.post('/', AuthController.signUp);

//Rutas Post


module.exports = router;
