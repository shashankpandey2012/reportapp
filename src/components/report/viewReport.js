import React from 'react';
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination
} from '@material-ui/core';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { KeyboardArrowRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PdfDocument from './PdfDocument';
import { fetchReportAct } from '../../actions/appActions';

function createData(ridershipInMillions, avgDailyRidershipInMillions, networkLength, year, ID) {
  return {
    ridershipInMillions,
    avgDailyRidershipInMillions,
    networkLength,
    year,
    ID,
  };
}

class ViewReport extends React.Component{
  constructor( props ) {
    super( props );
    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    const { fetchReport } = this.props;
    fetchReport({ page: page+1, limit: rowsPerPage });
  }

  handleChangePage = (event, newPage) => {
    this.setState(
      {
        page: newPage,
      },
      () => {
        this.fetchList(newPage);
      },
    );
  };

  fetchList = (newPage) => {
    const { rowsPerPage } = this.state;
    const { fetchReport } = this.props;
    const data = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    fetchReport(data);
  };

  handleChangeRowsPerPage = (event) => {
    debugger;
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  handleOnClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/addreport')
  }

  render() {
    const { rowsPerPage, page } = this.state;
    const { reports } = this.props;
    const results = reports.results;
    const totalCount = reports.totalCount;
    const tableRows = [];
    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i += 1) {
        tableRows.push(
          createData(
            results[i].ridershipInMillions,
            results[i].avgDailyRidershipInMillions,
            results[i].networkLength,
            results[i].year,
            results[i].ID
          ),
        );
      }
    }
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div >
              <h2>Delhi Metro Ridership Annual Reports</h2>
              <h3>Data Source:
                <a
                  href="http://www.delhimetrorail.com/press_reldetails.aspx?id=ZlXC4jMrU00lld"
                  target="_blank"
                  rel="noopener noreferrer"
                >http://www.delhimetrorail.com/press_reldetails.aspx?id=ZlXC4jMrU00lld</a></h3>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Ridership(In Millions)</b></TableCell>
                    <TableCell><b>Avg Ridership(In Millions)</b></TableCell>
                    <TableCell><b>Network Length</b></TableCell>
                    <TableCell><b>Year</b></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map(row => (
                    <TableRow key={row.ID}>
                      <TableCell>{row.ridershipInMillions}</TableCell>
                      <TableCell>{row.avgDailyRidershipInMillions}</TableCell>
                      <TableCell>{row.networkLength}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>
                        <PDFDownloadLink
                          document={<PdfDocument data={row} />}
                          fileName="report.pdf"
                          style={{
                            textDecoration: "none",
                            padding: "10px",
                            color: "#4a4a4a",
                            backgroundColor: "#f2f2f2",
                            border: "1px solid #4a4a4a"
                          }}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download Pdf"
                          }
                        </PDFDownloadLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                component="div"
                count={totalCount || rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="ivrsProceed"
            style={{ margin: '8px 0px 0px 0px' }}
          >
            <div className="darkgreenBtnHeader alignRight">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleOnClick}
              >
                Add New Report
                <KeyboardArrowRight />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({
       app,
     }) => ({
      reports: app.reports,
    }),
    dispatch => ({
      fetchReport: (params) => dispatch(fetchReportAct(params)),
    }),
  )(ViewReport),
);


