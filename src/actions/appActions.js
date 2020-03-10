// import ajax from '../functions/ajax';
import axios from 'axios';
import { config } from '../config/index';

export const setMessage = messageText => ({
  type: 'SET_MESSAGE',
  message: messageText,
});

export const fetchReportAct = params => (dispatch) => {
  axios.get(`${config.baseURL}/reports/reports/report?page=${params.page}&limit=${params.limit}`)
  .then((res) => {
    dispatch({
      type: 'FETCH_REPORT_SUCCESS',
      payload: res.data.data
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_REPORT_FAILURE',
      payload: err
    })
  })
};

export const addReportAct = params => (dispatch) => {
  console.log("DISPATCH ", params);
  dispatch({
    type: 'RESET_FORM',
    payload: null
  })
  axios.post(`${config.baseURL}/reports/reports/report`, {
    ridership_in_millions: params.ridershipInMillions,
    avg_daily_ridership_in_millions: params.avgDailyRidershipInMillions,
    network_length: params.networkLength,
    year: params.year,
  })
    .then((res) => {
      console.log("res ", res.data);
      debugger;
      if (res.data.status) {
        dispatch({
          type: 'ADD_REPORT_SUCCESS',
          payload: res.data.data
        })
      } else {
        dispatch({
          type: 'ADD_REPORT_FAILURE',
          payload: res.data.error
        })
      }
    }).catch((err) => {
      dispatch({
        type: 'ADD_REPORT_FAILURE',
        payload: err.message
      })
  })
};
