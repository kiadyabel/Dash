import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FetchData } from "../../../utils/FetchData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  position: "sticky",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DataGrid = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "003";
        const date = "26-07-2023";

        const fetchedData = await FetchData(type, date);
        setData(fetchedData.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchDataFromApi();
  }, []);
  //const columns = Object.keys(data[0]);

  return (
    <div style={{ maxHeight: "700px" }}>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, maxHeight: "700px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Source</StyledTableCell>
              <StyledTableCell align="center">Frequency</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
              <StyledTableCell align="center">Variation</StyledTableCell>
              <StyledTableCell align="center">Slot</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <StyledTableRow
                key={row.name}
                style={
                  row.var <= 5
                    ? { backgroundColor: "white" }
                    : row.var <= 15
                    ? { backgroundColor: "orange" }
                    : row.var <= 25
                    ? { backgroundColor: "darkorange" }
                    : { backgroundColor: "red" }
                }
              >
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.source}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.frequence}
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.valeur}</StyledTableCell>
                <StyledTableCell align="center">{row.var} %</StyledTableCell>
                <StyledTableCell align="center">{row.slot}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataGrid;
