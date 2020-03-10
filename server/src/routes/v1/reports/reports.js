const express = require('express')
const app = (module.exports = require('express')())
const { Report } = require('../../../models');
const router = express.Router()
const response = require('../../../response')
const genericResponse = response.common.genericResponse
const resources = require('../../../resources')
const controllers = require('../../../controllers')
const reportResource = resources.reports.reports
const reportController = controllers.reports.reports

router
  .route('/report')
  .post(
    reportResource.saveReport,
    reportController.saveReport,
    genericResponse
  )
  .get(
    reportResource.getReport,
    reportController.getReport,
    genericResponse
  )

app.use('/', router)
