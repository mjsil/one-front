import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#094c6b",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 15
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function CustomizedTables(props) {
  const classes = useStyles();

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.columns.map(columnName => (
              <StyledTableCell key={columnName} align="left">
                {columnName}
              </StyledTableCell>
            ))}
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <StyledTableRow key={row.id}>
              {extractRowData(row)}
              <StyledTableCell align="left">
                <Tooltip title="Download">
                  <IconButton
                    aria-label="download"
                    onClick={() => props.onClickDownload(row.id)}
                  >
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
