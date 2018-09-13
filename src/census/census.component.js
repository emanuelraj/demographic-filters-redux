import { connect } from 'react-redux';
import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { DemographicFilter } from './demographicFilter.component';
import config from '../config/config';


const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function DynamicColumn(props) {
  if (!props.tablecol) {
    return null;
  }

  let input = [];

  input.push(
    <TableCell key={1}> {'#'} </TableCell>);

  if (props.tablecol.length > 0) {
    props.tablecol.forEach(function (element, index) {
      let column_header_index = element + "_" + index;
      input.push(<TableCell key={column_header_index} > {element} </TableCell>);
    });
  }
  return input;
}


function DynamicRows(props) {

  if (!props.rowData.length > 0) {
    return null;
  }

  let input = [];

  props.rowData.slice(0, config.pagination).forEach(function (row, index) {
    input.push(
      <TableRow key={index} className={props.rowClass}>
        <DynamicTableColumn rowNumber={index + 1} columnData={row} />
      </TableRow>);
  });
  return input;
}

function CustomePagination(props) {

  let input = [];
  if (props.rowData.length > config.pagination) {
    let balance = props.rowData.length - config.pagination;
    input.push(
      <Typography key={10} align="left" variant="headline" component="h3">
        Balance {balance}
      </Typography>);
  }
  return input;
}

function DynamicTableColumn(props) {
  if (!props.columnData) {
    return null;
  }

  let table_cells = [];

  let columns = Object.keys(props.columnData);

  table_cells.push(
    <TableCell key={19} component="th" scope="row">
      {props.rowNumber}
    </TableCell>);
  columns.forEach(function (column, index) {
    let column_header_index = column + index;
    table_cells.push(
      <TableCell key={column_header_index} component="th" scope="row">
        {props.columnData[column]}
      </TableCell>);
  });

  return table_cells;
}


class Census extends Component {

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };



  render() {
    const { classes } = this.props;
    const { census } = this.props.census;
    const table_columns = this.props.census.table_columns;

    console.log(this.props);

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar />
          <Nav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <Typography>{'Census Records'}</Typography>
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={3} container justify="flex-end">
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <DemographicFilter />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={24}>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow >
                      <DynamicColumn tablecol={table_columns} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <DynamicRows rowData={census} rowClass={classes.row} />
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <br />
            <br />
            <CustomePagination rowData={census} />
          </main>
        </div>
      </div>
    );
  }
}


Census.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    census: state.census
  };
}

const connectedCensusPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Census)));

export { connectedCensusPage as Census };