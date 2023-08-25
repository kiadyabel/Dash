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

import MobileRender from "./MobileRender";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la modal

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "003";
        const date = selectedDate; //date

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

  const handleModalOpen = (type) => {
    setSelectedName(type); // Mettre à jour la ligne sélectionnée
  };



  //pour le table en taille mobile et tablette
  const dataGridMobile = (
    <div>
      <TableContainer
        component={Paper}
        sx={{ width: "auto", maxHeight: "670px", cursor: "pointer" }}
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
            {data.map((tr, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  handleModalOpen(tr.name);
                  setIsModalOpen(true);
                }}
                style={
                  tr.var <= 5
                    ? { backgroundColor: "white" }
                    : tr.var <= 15
                    ? { backgroundColor: "orange" }
                    : tr.var <= 25
                    ? { backgroundColor: "#BF8013" }
                    : { backgroundColor: "red" }
                }
              >
                <StyledTableCell align="left">{tr.name}</StyledTableCell>
                <StyledTableCell align="center">{tr.source}</StyledTableCell>
                <StyledTableCell align="center">{tr.frequence}</StyledTableCell>
                <StyledTableCell align="center">{tr.date}</StyledTableCell>
                <StyledTableCell align="right">{tr.valeur}</StyledTableCell>
                <StyledTableCell align="right">{tr.var}</StyledTableCell>
                <StyledTableCell align="center">{tr.slot}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component="div"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularIndeterminate isLoading={isLoading} />
      </Box>
      {isModalOpen && (
        <MobileRender
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );

  return (
    <>
      {window.innerWidth <= 960 ? (
        dataGridMobile
      ) : (
        <div>
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
                {data.map((row, index) => (
                  <StyledTableRow
                    key={index}
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
                    <StyledTableCell align="center">
                      {row.source}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.frequence}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.valeur}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var} %
                    </StyledTableCell>
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
        </div>
      )}
    </>
  );
};

export default DataGrid;
