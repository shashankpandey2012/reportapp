import React from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { AddReport, ViewReport } from '../report';
// import { setMessage } from '../../actions/appActions';
// import Loader from './Loader';
// import Welcome from './welcomeGif';
import NotFound from './notFound';
import ErrorBoundary from './errorboundary';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: true };
  }

  render() {
    // const { fetching } = this.props;
    return (
      <React.Fragment>
        {/*{fetching ? <Loader /> : null}*/}
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={ViewReport} />
            <Route path="/addreport" exact component={AddReport} />
            <Route path="*" render={NotFound} />
          </Switch>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

// Just for example, later it will be removed
export default withRouter(MainPage);
