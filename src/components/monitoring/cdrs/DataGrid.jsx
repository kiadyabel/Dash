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
import { useSelectedType } from "./onClickValueCdrs.js";
import {useDateContext} from "../../../utils/DateContext"
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
  const [data, setData] = useState([]); // donner qui vien de l'api
  const [isLoading, setIsLoading] = useState(true); // pour le circularebar
  const { setSelectedType } = useSelectedType(); // Utilisez le hook useSelectedType pour accéder aux méthodes du contexte.
  const { selectedDate } = useDateContext(); // dateContext
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la modal

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "002";
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

  const handleRowClick = (type) => {
    setSelectedType(type); // Mettre à jour l'état avec le type sélectionné ave le contexte dans ./onClickalueCdrs
  };

  const handleModalOpen = (row) => {
    setSelectedType(row); // Mettre à jour la ligne sélectionnée
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
              <StyledTableCell align="left">type</StyledTableCell>
              <StyledTableCell align="center">source</StyledTableCell>
              <StyledTableCell align="center">big5</StyledTableCell>
              <StyledTableCell align="center">mediation</StyledTableCell>
              <StyledTableCell align="center">delta</StyledTableCell>
              <StyledTableCell align="right">fichiers</StyledTableCell>
              <StyledTableCell align="center">var_fichiers</StyledTableCell>
              <StyledTableCell align="right">cdrs</StyledTableCell>
              <StyledTableCell align="center">var_cdrs</StyledTableCell>
              <StyledTableCell align="center">last_date</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  handleModalOpen(row.type);
                  setIsModalOpen(true);
                }}
                style={
                  row.var_cdrs <= 5
                    ? { backgroundColor: "white" }
                    : row.var_cdrs <= 15
                    ? { backgroundColor: "orange" }
                    : row.var_cdrs <= 25
                    ? { backgroundColor: "#BF8013" }
                    : { backgroundColor: "red" }
                }
              >
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="center">{row.source}</StyledTableCell>
                <StyledTableCell align="center">{row.big5}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.mediation}
                </StyledTableCell>
                <StyledTableCell align="center">{row.delta}</StyledTableCell>
                <StyledTableCell align="right">{row.fichiers}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.var_fichiers}
                </StyledTableCell>
                <StyledTableCell align="right">{row.cdrs}</StyledTableCell>
                <StyledTableCell align="center">{row.var_cdrs}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.last_date}
                </StyledTableCell>
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
                  <StyledTableCell align="left">type</StyledTableCell>
                  <StyledTableCell align="center">source</StyledTableCell>
                  <StyledTableCell align="center">big5</StyledTableCell>
                  <StyledTableCell align="center">mediation</StyledTableCell>
                  <StyledTableCell align="center">delta</StyledTableCell>
                  <StyledTableCell align="right">fichiers</StyledTableCell>
                  <StyledTableCell align="center">var_fichiers</StyledTableCell>
                  <StyledTableCell align="right">cdrs</StyledTableCell>
                  <StyledTableCell align="center">var_cdrs</StyledTableCell>
                  <StyledTableCell align="center">last_date</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => handleRowClick(row.type)}
                    style={
                      row.var_cdrs <= 5
                        ? { backgroundColor: "white" }
                        : row.var_cdrs <= 15
                        ? { backgroundColor: "orange" }
                        : row.var_cdrs <= 25
                        ? { backgroundColor: "#BF8013" }
                        : { backgroundColor: "red" }
                    }
                  >
                    <StyledTableCell align="left">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.source}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.big5}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.mediation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.delta}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.fichiers}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var_fichiers}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.cdrs}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var_cdrs}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.last_date}
                    </StyledTableCell>
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
        </div>
      )}
    </>
  );
};

export default DataGrid;
