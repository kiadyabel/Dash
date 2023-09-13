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
import { useColorContext } from "../../../utils/ColorContext";
import { useSliderValues } from "../../../utils/SliderValueContext";
import Tooltip from "@mui/material/Tooltip";

import MobileRender from "./MobileRender";
import numeral from "numeral";

import { useTranslation } from "react-i18next"; // utiliser pour la translation

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
  const { t } = useTranslation(); // translation
  const [data, setData] = useState([]); // donner vien de l'api
  const [isLoading, setIsLoading] = useState(true); // Circleprogress
  const { setSelectedName } = useSelectedName(); // // Utilisez le hook useSelectedName pour accéder aux méthodes du contexte.
  const { selectedDate } = useDateContext(); // dateContext

  const { color1, color2, color3, color4 } = useColorContext(); // Utiliser le contexte des couleurs
  const { sliderValue1, sliderValue2, sliderValue3, sliderValue4 } =
    useSliderValues(); // Utiliser le contexte des valeurs dans le slider

  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la modal
  const [selectedRow, setSelectedRow] = useState(null); //etat pour stocker la ligne selectionner

  // Gestion d'etat tri
  const [order, setOrder] = useState("desc"); // État pour l'ordre de tri (asc ou desc)
  const [orderBy, setOrderBy] = useState("var"); // État pour l'en-tête de tri par défaut

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "003";
        const date = selectedDate; //date

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, null);

        // Triez les données en fonction de l'ordre et de l'en-tête(table) de tri
        const comparator = (a, b) => {
          if (orderBy === "var") {
            // Tri spécifique pour la colonne var_cdrs
            const absoluteA = Math.abs(a.var);
            const absoluteB = Math.abs(b.var);

            if (absoluteA < absoluteB) return order === "asc" ? -1 : 1;
            if (absoluteA > absoluteB) return order === "asc" ? 1 : -1;
          } else {
            // Tri par défaut pour les autres colonnes
            if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
          }

          return 0;
        };

        const sortedData = fetchedData.data.slice().sort(comparator);

        setData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchDataFromApi();
  }, [selectedDate, order, orderBy]);

  //triage sus chaque colone de tableau
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (name) => {
    setSelectedName(name); // Mettre à jour l'état avec le type sélectionné avec context
  };

  const handleModalOpen = (type) => {
    setSelectedName(type); // Mettre à jour la ligne sélectionnée
  };

  // forlat number millien
  const formatNumberMillien = (number) => {
    return numeral(number).format("0,0");
  };

  // Fonction pour générer le texte de l'info-bulle en fonction de la colonne
  const getTooltipText = (column) => {
    switch (column) {
      case "Source":
        return t("source_kpi");
      case "KPI":
        return t("KPI");
      case "Fréquence":
        return t("frequence");
      case "Valeur":
        return t("valeur_kpi");
      case "Variation":
        return t("variation_kpi");
      case "Last Date":
        return t("Date_dernier_kpi");
      case "Slots":
        return t("slot_kpi");

      default:
        return "";
    }
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
              <StyledTableCell
                align="left"
                active={orderBy === "source"}
                direction={orderBy === "source" ? order : "asc"}
                onClick={() => handleRequestSort("source")}
              >
                <Tooltip arrow title={getTooltipText("Source")} placement="top">
                  {t("source_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                <Tooltip arrow title={getTooltipText("KPI")} placement="top">
                  {t("kpi_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "frequence"}
                direction={orderBy === "frequence" ? order : "asc"}
                onClick={() => handleRequestSort("frequence")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Fréquence")}
                  placement="top"
                >
                  {t("frequence_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                active={orderBy === "valeur"}
                direction={orderBy === "valeur" ? order : "asc"}
                onClick={() => handleRequestSort("valeur")}
              >
                <Tooltip arrow title={getTooltipText("Valeur")} placement="top">
                  {t("valeur_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "var"}
                direction={orderBy === "var" ? order : "asc"}
                onClick={() => handleRequestSort("var")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Variation")}
                  placement="top"
                >
                  {"variation_ttl"}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleRequestSort("date")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Last Date")}
                  placement="top"
                >
                  {t("date_kpi_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "slot"}
                direction={orderBy === "slot" ? order : "asc"}
                onClick={() => handleRequestSort("slot")}
              >
                <Tooltip arrow title={getTooltipText("Slots")} placement="top">
                  {t("slot_ttl")}
                </Tooltip>
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  handleModalOpen(row.name);
                  setSelectedRow(index); // Définir la ligne sélectionnée ici
                  setIsModalOpen(true);
                }}
                style={{
                  backgroundColor:
                    Math.abs(row.var) >= 0 && Math.abs(row.var) <= sliderValue1
                      ? color1
                      : Math.abs(row.var) <= 5
                      ? "#eeeeee"
                      : Math.abs(row.var) > 5 &&
                        Math.abs(row.var) <= sliderValue2
                      ? color2
                      : Math.abs(row.var) <= 15
                      ? "#f0c300"
                      : Math.abs(row.var) > 15 &&
                        Math.abs(row.var) <= sliderValue3
                      ? color3
                      : Math.abs(row.var) <= 25
                      ? "#BF8013"
                      : Math.abs(row.var) > 25 &&
                        Math.abs(row.var) <= sliderValue4
                      ? color4
                      : Math.abs(row.var) <= 100
                      ? "#f00020"
                      : "",
                  border: index === selectedRow ? "2px solid blue" : "none", // Ajouter une bordure si la ligne est sélectionnée
                }}
              >
                <StyledTableCell align="left">{row.source}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.frequence}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatNumberMillien(row.valeur)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.var} %</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.slot}</StyledTableCell>
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
                  <StyledTableCell
                    align="left"
                    active={orderBy === "source"}
                    direction={orderBy === "source" ? order : "asc"}
                    onClick={() => handleRequestSort("source")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Source")}
                      placement="top"
                    >
                      {t("source_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("KPI")}
                      placement="top"
                    >
                      {t("kpi_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "frequence"}
                    direction={orderBy === "frequence" ? order : "asc"}
                    onClick={() => handleRequestSort("frequence")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Fréquence")}
                      placement="top"
                    >
                      {t("fequence_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    active={orderBy === "valeur"}
                    direction={orderBy === "valeur" ? order : "asc"}
                    onClick={() => handleRequestSort("valeur")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Valeur")}
                      placement="top"
                    >
                      {t("valeur_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "var"}
                    direction={orderBy === "var" ? order : "asc"}
                    onClick={() => handleRequestSort("var")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Variation")}
                      placement="top"
                    >
                      {t("variation_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : "asc"}
                    onClick={() => handleRequestSort("date")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Last Date")}
                      placement="top"
                    >
                      {t("date_kpi_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "slot"}
                    direction={orderBy === "slot" ? order : "asc"}
                    onClick={() => handleRequestSort("slot")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Slots")}
                      placement="top"
                    >
                      {t("slot_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => {
                      handleRowClick(row.name);
                      setSelectedRow(index); // Définir la ligne sélectionnée ici
                    }}
                    style={{
                      backgroundColor:
                        Math.abs(row.var) >= 0 &&
                        Math.abs(row.var) <= sliderValue1
                          ? color1
                          : Math.abs(row.var) <= 5
                          ? "#eeeeee"
                          : Math.abs(row.var) > 5 &&
                            Math.abs(row.var) <= sliderValue2
                          ? color2
                          : Math.abs(row.var) <= 15
                          ? "#f0c300"
                          : Math.abs(row.var) > 15 &&
                            Math.abs(row.var) <= sliderValue3
                          ? color3
                          : Math.abs(row.var) <= 25
                          ? "#BF8013"
                          : Math.abs(row.var) > 25 &&
                            Math.abs(row.var) <= sliderValue4
                          ? color4
                          : Math.abs(row.var) <= 100
                          ? "#f00020"
                          : "",
                      border: index === selectedRow ? "2px solid blue" : "none", // Ajouter une bordure si la ligne est sélectionnée
                    }}
                  >
                    <StyledTableCell align="left">{row.source}</StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.frequence}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatNumberMillien(row.valeur)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var} %
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
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
