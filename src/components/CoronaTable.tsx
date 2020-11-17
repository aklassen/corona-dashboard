import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CoronaContext } from "./CoronaData";



function CoronaTable() {
  const data = useContext(CoronaContext);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Meldedatum</TableCell>
            <TableCell align="center">Landkreis</TableCell>
            <TableCell align="center">7-Tagesinzidenz</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.Meldedatum + data.Landkreis}>
              <TableCell align="center">{data.Meldedatum}</TableCell>
              <TableCell align="center">{data.Landkreis} </TableCell>
              <TableCell align="center">
                {data["7-Tagesinzidenz pro 100.000 Einwohner"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoronaTable;