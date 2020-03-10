const mongoose = require('mongoose')

// Source: > Delhi Metro Ridership Annual Reports
// http://www.delhimetrorail.com/press_reldetails.aspx?id=ZlXC4jMrU00lld
const reportSchema = new mongoose.Schema({
  ridership_in_millions: {
    type: Number,
    required: true,
  },
  avg_daily_ridership_in_millions: {
    type: Number,
    required: true
  },
  network_length: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: String,
    default: 'Admin'
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
})

const Report = mongoose.model('Report', reportSchema, 'reports');
module.exports = Report;
