const _ = require('lodash')
const utilities = require('../../utilities');
const reportUtilities = utilities.database.reports.reports;

var functions = require('../../functions')
const logger = functions.winston
var utils = functions.utils
const layer = 2


module.exports = {
  getReport: async (req, res, next) => {
    try {
      if (!_.isObject(req.controller)) {
        throw new Error("controller arguments are not defined");
      }
      const attributes = req.controller.args;
      const reportResponse = await reportUtilities.getReport(attributes);
      if (reportResponse.status) {
        req.data = reportResponse.data;
        next()
      } else {
        const display = reportResponse.message
        const e = display
        logger.error.log('error', e)
        req.error = reportResponse.error
        utils.errorFunction(layer, e, display, req, res)
      }
    } catch (e) {
      logger.error.log('error', e)
      const display = 'Oops Some Error Occurred'
      req.error = display
      utils.errorFunction(layer, e, display, req, res)
    }

  },

  saveReport: async (req, res, next) => {
    try {
      if (!_.isObject(req.controller)) {
        throw new Error("controller arguments are not defined");
      }
      const attributes = req.controller.args;
      const reportJSON = {
        ridership_in_millions: attributes.ridership_in_millions,
        avg_daily_ridership_in_millions: attributes.avg_daily_ridership_in_millions,
        network_length: attributes.network_length,
        year: attributes.year,
        status: true,
        created_by: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      };
      const reportResponse = await reportUtilities.createReport(reportJSON);
      if (reportResponse.status) {
        req.data = reportResponse.data;
        next();
      } else {
        const display = reportResponse.message;
        const e = reportResponse.error;
        req.error = display
        utils.errorFunction(layer, e, display, req, res)
      }
    } catch(e) {
      logger.error.log('error', e)
      const display = 'Oops Some Error Occurred'
      req.error = display
      utils.errorFunction(layer, e, display, req, res)
    }
  }
}
