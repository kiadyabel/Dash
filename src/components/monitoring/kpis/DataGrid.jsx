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

import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box } from "@mui/material";
import { useSelectedName } from "./OnClickValueKpis"; 
import { useDateContext } from "../../../utils/DateContext";

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
  const [data, setData] = useState([]); // donner vien de l'api
  const [isLoading, setIsLoading] = useState(true); // Circleprogress
  const { setSelectedName } = useSelectedName(); // // Utilisez le hook useSelectedName pour accéder aux méthodes du contexte.
  const { selectedDate } = useDateContext(); // dateContext

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "003";
        const date = selectedDate.format("DD-MM-YYYY"); //date

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, null);
        setData(fetchedData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchDataFromApi();
  }, [selectedDate]);

  const handleRowClick = (name) => {
    setSelectedName(name); // Mettre à jour l'état avec le type sélectionné avec context
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, maxHeight: "670px", cursor: "pointer" }}
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
                onClick={() => handleRowClick(row.name)}
                style={
                  row.var <= 5
                    ? { backgroundColor: "white" }
                    : row.var <= 15
                    ? { backgroundColor: "orange" }
                    : row.var <= 25
                    ? { backgroundColor: "#BF8013" }
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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularIndeterminate isLoading={isLoading} />
      </Box>
    </>
  );
};

export default DataGrid;
