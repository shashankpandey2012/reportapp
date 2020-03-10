const _ = require('lodash');
const functions = require('../../functions');
const validation= functions.validation;
const utils = functions.utils;

const layer = 1;
module.exports = {
  getReport: (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const schema = {
        forbidden: [],
        page: {
          type: 'number',
          isRequired: true,
          min: 1
        },
        limit: {
          type: 'number',
          isRequired: true,
          min: 1
        }
      };
      const validationObj = validation.validate({ page, limit }, schema);
      if(!_.isEmpty(validationObj)) {
        if(validationObj.severity === 'error') {
          throw new Error(validationObj.message);
        }
      }
      const attributes = {
        page,
        limit,
      };
      req.controller = {};
      req.controller.args = attributes;
      next()
    } catch (err) {
      const display = err.message;
      req.error = err;
      utils.errorFunction(layer, err, display,req,res);
    }
  },

  saveReport: (req, res, next) => {
    try {
      const body = req.body;
      const schema = {
        forbidden : [],
        ridership_in_millions: {
          type: 'number',
          isRequired: true
        },
        avg_daily_ridership_in_millions: {
          type: 'number',
          isRequired: true
        },
        network_length: {
          type: 'number',
          isRequired: true
        },
        year: {
          type: 'string',
          isRequired: true
        },
      };
      const validationObj = validation.validate(body, schema);
      if(!_.isEmpty(validationObj)) {
        if(validationObj.severity === 'error') {
          throw new Error(validationObj.message);
        }
      }
      const attributes = body;
      req.controller = {};
      req.controller.args = attributes;
      next();
    } catch(err) {
      const display = err.message;
      req.error = err
      utils.errorFunction(layer, err, display,req,res);
    }
  }
}
