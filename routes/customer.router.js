const express = require('express');
const CustomersService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomersService();

router.get('/', 
 async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
    //  validatorHandler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            const {id} = req.params;
            const customers = await service.findOne(id);
            res.json(customers);
        } catch (error) {
            next(error);
        }
    });

    router.post('/',
     validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newCustomer = await service.create(body);
        res.status(201).json(newCustomer);
      } catch (error) {
        next(error);
      }
    }
  );
  

router.patch('/:id',
    validatorHandler(updateCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const customers = await service.update(id, body);
            res.json(customers);
        } catch (error) {
            next(error);   
        }
    });

    router.delete('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await service.delete(id));
      } catch (error) {
        next(error);
      }
    }
  );


module.exports = router;