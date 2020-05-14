import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#094c6b",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function extractRowData(row) {
    const filteredRow = [];
    const datasToExtract = props.extractFromRows;
    for (let key of datasToExtract) {
      filteredRow.push(
        <StyledTableCell key={`${row.id} - ${key}`} align="left">
          {row[key]}
        </StyledTableCell>
      );
    }
    return filteredRow;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table
          aria-label="customized table"
          className={classes.table}
          size="small"
        >
          <TableHead>
            <TableRow>
              {props.columns.map((columnName) => (
                <StyledTableCell key={columnName} align="left">
                  {columnName}
                </StyledTableCell>
              ))}
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  {extractRowData(row)}
                  <StyledTableCell align="left">
                    <Tooltip title={props.iconTitle}>
                      <IconButton
                        aria-label="row-icon"
                        onClick={() => props.onClickedRow(row)}
                      >
                        {props.icon}
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          backIconButtonText="Página anterior"
          nextIconButtonText="Próxima página"
          labelRowsPerPage="Linhas por página:"
          // Default property from material ui docs (table-pagination)
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to === -1 ? count : to} de ${
              count !== -1 ? count : `more than ${to}`
            }`
          }
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </React.Fragment>
  );
}

export default CustomizedTables;
