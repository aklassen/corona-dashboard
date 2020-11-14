import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class CoronaTable extends React.Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const classes = makeStyles({
      table: {
        minWidth: 650,
      },
    });

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Meldedatum</TableCell>
              <TableCell align="center">Landkreis</TableCell>
              <TableCell align="center">7-Tagesinzidenz</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((data, index) => (
              <TableRow key={index}>
                <TableCell align="center">{data.Meldedatum}</TableCell>
                <TableCell align="center">{data.Landkreis} </TableCell>
                <TableCell align="center">
                  {data['7-Tagesinzidenz pro 100.000 Einwohner']}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
