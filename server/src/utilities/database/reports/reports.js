const _ = require('lodash')
var logger = require('../../../functions/winston')
const { Report } = require('../../../models')

const createReport = async function (reportJSON) {
  try {
    const reportDoc = new Report(reportJSON)
    const newReport = await reportDoc.save()
    if (newReport) {
      return {
        data: newReport,
        status: true,
        message: 'Success'
      }
    } else {
      return {
        data: {},
        status: false,
        message: 'Failed',
        error: 'Failed'
      }
    }
  } catch (e) {
    logger.error.log('error', e)
    return {
      data: {},
      status: false,
      message: 'Oops Some Error Occurred',
      error: 'Failed'
    }
  }
}

const getReport = async function (queryParams) {
  try {
    const { page, limit } = queryParams;
    console.log("Page ", page, limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const docCount = await Report.countDocuments().exec();
    if (endIndex < docCount) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    results.totalCount = docCount;
    results.results = await Report
                            .find({ status: true })
                            .limit(limit)
                            .skip(startIndex)
                            .sort({ updated_at: -1 })
                            .lean()
                            .exec();
    return {
      data: results,
      status: true,
      message: 'Success'
    }
  } catch (e) {
    logger.error.log('error', e)
    return {
      data: {},
      status: false,
      message: 'Failed'
    }
  }
}

module.exports = {
  createReport,
  getReport,
}
