const express = require('express');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new OrderService();

router.get('/', 
//validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const orden = await service.find();
    res.json(orden);
  } catch (error) {
    next(error);
  }
});


router.get('/:id',
async(req, res, next) => {
  try {
    const {id} = req.params;
    const orden = await service.findOne(id);
    res.json(orden);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  // validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // res.status(201).json (await service.create(body));
      const newOrden = await service.create(body);
      res.status(201).json(newOrden);
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;
