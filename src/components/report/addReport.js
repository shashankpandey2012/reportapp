import React from 'react';
import {
  Grid,
  TextField,
  // FormControl,
  // InputLabel,
  // FormControlLabel,
  Button,
} from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addReportAct } from '../../actions/appActions';

class AddReport extends React.Component{
  constructor( props ) {
    super(props);
    this.state = {
      ridershipInMillions: '',
      avgDailyRidershipInMillions: '',
      networkLength: '',
      year: '',
      error_ridershipInMillions: '',
      error_avgDailyRidershipInMillions: '',
      error_networkLength: '',
      error_year: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { reportAdded, history } = this.props;
    if (!prevProps.reportAdded && reportAdded) {
      this.resetState();
      history.push('/');
    }
  }

  resetState = () => {
    this.setState({
      ridershipInMillions: 0,
      avgDailyRidershipInMillions: 0,
      networkLength: 0,
      year: ''
    });
  }

  handleOnClick = (e) => {
    e.preventDefault();
    const { addReport } = this.props;
    const {
      ridershipInMillions,
      avgDailyRidershipInMillions,
      networkLength,
      year,
    } = this.state;
    let error_ridershipInMillions = '';
    let error_avgDailyRidershipInMillions = '';
    let error_networkLength = '';
    let error_year = '';
    if (_.isEmpty(ridershipInMillions)) {
      error_ridershipInMillions = 'Missing'
    }
    if (_.isEmpty(avgDailyRidershipInMillions)) {
      error_avgDailyRidershipInMillions = 'Missing'
    }
    if (_.isEmpty(networkLength)) {
      error_networkLength = 'Missing'
    }
    if (_.isEmpty(year)) {
      error_year = 'Missing'
    }
    if (!error_ridershipInMillions
      || !error_avgDailyRidershipInMillions
      || !error_networkLength
      || !error_year) {
        addReport({
          ridershipInMillions: parseFloat(ridershipInMillions),
          avgDailyRidershipInMillions: parseFloat(avgDailyRidershipInMillions),
          networkLength: parseFloat(networkLength),
          year,
        });
    } else {
      this.setState({
        error_ridershipInMillions,
        error_avgDailyRidershipInMillions,
        error_networkLength,
        error_year,
      });
    }
  };

  handleOnChange = (key, value) => {
    this.setState({
      [key]: value,
      [`error_${key}`]: false,
    })
  };

  render() {
    const {
      ridershipInMillions,
      avgDailyRidershipInMillions,
      networkLength,
      year,
      error_ridershipInMillions,
      error_avgDailyRidershipInMillions,
      error_networkLength,
      error_year,
    } = this.state;
    const { formError } = this.props;
    return (
      <React.Fragment>
        <Grid container className="root gis-main" justify="center">
          <Grid item xs={8}>
            <div className="card-section">
              <p>Enter Delhi Metro Ridership Report</p>
              <Grid container className="custom-space form-section">
                <Grid item xs={12} sm={6} className="custom-padding">
                  <TextField
                    disableUnderline
                    error={error_ridershipInMillions}
                    helperText={''}
                    label="Ridership(In Millions)"
                    className="textField inputHead"
                    type={'number'}
                    value={ridershipInMillions}
                    onChange={(e) => this.handleOnChange('ridershipInMillions', e.target.value)}
                  />
                  <TextField
                    disableUnderline
                    error={error_avgDailyRidershipInMillions}
                    helperText={''}
                    label="Avg Daily Ridership(In Millions)"
                    className="textField inputHead"
                    type={'number'}
                    value={avgDailyRidershipInMillions}
                    onChange={(e) => this.handleOnChange('avgDailyRidershipInMillions', e.target.value)}
                  />
                  <TextField
                    disableUnderline
                    error={error_networkLength}
                    helperText={''}
                    label="Network Length"
                    className="textField inputHead"
                    type={'number'}
                    value={networkLength}
                    onChange={(e) => this.handleOnChange('networkLength', e.target.value)}
                  />
                  <TextField
                    disableUnderline
                    error={error_year}
                    helperText={''}
                    label="Year"
                    className="textField inputHead"
                    value={year}
                    onChange={(e) => this.handleOnChange('year', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} className="custom-padding">
                <div className="submit-btn">
                  <Button variant="contained" onClick={this.handleOnClick}>
                    Add Report
                  </Button>
                </div>
                <div>
                  {formError && <p>{formError}</p>}
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(
  ({ app }) => ({
    fetching: app.fetching,
    formError: app.formError,
    reportAdded: app.reportAdded,
  }),
  dispatch => ({
    addReport: (params) => dispatch(addReportAct(params)),
  }),
)(AddReport)
