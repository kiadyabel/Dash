import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { FetchData } from "../../../utils/FetchData";
import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box } from "@mui/material";
import { useSelectedType } from "./onClickValueCdrs.js";
import { useDateContext } from "../../../utils/DateContext";
import { useColorContext } from "../../../utils/ColorContext";
import numeral from "numeral";
import { useSliderValues } from "../../../utils/SliderValueContext";
import { useTranslation } from "react-i18next"; // utiliser pour la traduction

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
  "&:last-child td, &:last-child th": {},
}));

const DataGrid = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]); // donner qui vien de l'api , à rendre sur la table
  const [isLoading, setIsLoading] = useState(true); // pour le circularebar
  const { setSelectedType } = useSelectedType(); // Utilisez le hook useSelectedType pour accéder aux méthodes du contexte.
  const { selectedDate } = useDateContext(); // dateContext
  const [selectedRow, setSelectedRow] = useState(null); //etat pour stocker la ligne selectionner

  const { color1, color2, color3, color4 } = useColorContext(); // Utiliser le contexte des couleurs
  const { sliderValue1, sliderValue2, sliderValue3, sliderValue4 } =
    useSliderValues(); // Utiliser le contexte des valeurs dans le slider
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la modal

  // Gestion d'etat tri
  const [order, setOrder] = useState("desc"); // État pour l'ordre de tri (asc ou desc)
  const [orderBy, setOrderBy] = useState("var_cdrs"); // État pour l'en-tête de tri par défaut

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "002";
        const date = selectedDate; //date

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, null);

        const comparator = (a, b) => {
          if (a.source === "All") return -1; // "All" toujours en haut

          if (orderBy === "var_cdrs") {
            // Tri spécifique pour la colonne var_cdrs
            const absoluteA = Math.abs(a.var_cdrs);
            const absoluteB = Math.abs(b.var_cdrs);

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

  const handleRowClick = (type) => {
    setSelectedType(type); // Mettre à jour l'état avec le type sélectionné ave le contexte dans ./onClickalueCdrs
  };

  const handleModalOpen = (row) => {
    setSelectedType(row); // Mettre à jour la ligne sélectionnée
  };

  //triage sus chaque colone de tableau
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //fonction pour le couleur de la cellule dans laste date s'il n'est pas normale
  const dateComparator = (dateString) => {
    const dateFiltre = selectedDate; //date dans le filtre
    const dateParts = dateString.split(" ");
    const dateWithoutTime = dateParts[0];
    return dateWithoutTime !== dateFiltre;
  };

  // forlat number millien
  const formatNumberMillien = (number) => {
    return numeral(number).format("0,0");
  };

  // Fonction pour générer le texte de l'info-bulle en fonction de la colonne
  const getTooltipText = (column) => {
    switch (column) {
      case "source":
        return t("source_cdr");
      case "Type":
        return t("Type_cdr");
      case "Fich Med":
        return t("Fich_Med");
      case "Fichier BIG5":
        return t("Fichier_BIG5");
      case "Fichier (traité DWH)":
        return t("Fichier_dwh");
      case "Med vs BIG5":
        return t("Med_vs_BIG5");
      case "Var fich":
        return t("Var_fich");
      case "CDR":
        return t("CDR");
      case "Var CDR":
        return t("Var_CDR");
      case "Date dernier CDR":
        return t("Date_dernier_CDR");

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
            <TableRow style={{ height: "30px" }}>
              <StyledTableCell
                align="left"
                active={orderBy === "source"}
                direction={orderBy === "source" ? order : "asc"}
                onClick={() => handleRequestSort("source")}
              >
                <Tooltip arrow title={getTooltipText("source")} placement="top">
                  {t("source_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                active={orderBy === "type"}
                direction={orderBy === "type" ? order : "asc"}
                onClick={() => handleRequestSort("type")}
              >
                <Tooltip arrow title={getTooltipText("Type")} placement="top">
                  {t("type_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "mediation"}
                direction={orderBy === "mediation" ? order : "asc"}
                onClick={() => handleRequestSort("mediation")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Fich Med")}
                  placement="top"
                >
                  {t("fich_med_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "big5"}
                direction={orderBy === "big5" ? order : "asc"}
                onClick={() => handleRequestSort("big5")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Fichier BIG5")}
                  placement="top"
                >
                  {t("fich_big5_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                active={orderBy === "fichiers"}
                direction={orderBy === "fichiers" ? order : "asc"}
                onClick={() => handleRequestSort("fichiers")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Fichier (traité DWH)")}
                  placement="top"
                >
                  {t("fich_traite_dwh_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "delta"}
                direction={orderBy === "delta" ? order : "asc"}
                onClick={() => handleRequestSort("delta")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Med vs BIG5")}
                  placement="top"
                >
                  {t("med_vs_big5_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "var_fichiers"}
                direction={orderBy === "var_fichiers" ? order : "asc"}
                onClick={() => handleRequestSort("var_fichiers")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Var fich")}
                  placement="top"
                >
                  {t("var_fich_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                active={orderBy === "cdrs"}
                direction={orderBy === "cdrs" ? order : "asc"}
                onClick={() => handleRequestSort("cdrs")}
              >
                <Tooltip arrow title={getTooltipText("CDR")} placement="top">
                  {t("cdr_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "var_cdrs"}
                direction={orderBy === "var_cdrs" ? order : "asc"}
                onClick={() => handleRequestSort("var_cdrs")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Var CDR")}
                  placement="top"
                >
                  {t("var_cdr_ttl")}
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell
                align="center"
                active={orderBy === "last_date"}
                direction={orderBy === "last_date" ? order : "asc"}
                onClick={() => handleRequestSort("last_date")}
              >
                <Tooltip
                  arrow
                  title={getTooltipText("Date dernier CDR")}
                  placement="top"
                >
                  {t("date_cdr_ttl_cdr")}
                </Tooltip>
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  handleModalOpen(row.type);
                  setSelectedRow(index); // Définir la ligne sélectionnée ici
                  setIsModalOpen(true);
                }}
                style={{
                  backgroundColor:
                    Math.abs(row.var_cdrs) >= 0 &&
                    Math.abs(row.var_cdrs) <= sliderValue1
                      ? color1
                      : Math.abs(row.var_cdrs) <= 5
                      ? "#eeeeee"
                      : Math.abs(row.var_cdrs) > 5 &&
                        Math.abs(row.var_cdrs) <= sliderValue2
                      ? color2
                      : Math.abs(row.var_cdrs) <= 15
                      ? "#f0c300"
                      : Math.abs(row.var_cdrs) > 15 &&
                        Math.abs(row.var_cdrs) <= sliderValue3
                      ? color3
                      : Math.abs(row.var_cdrs) <= 25
                      ? "#BF8013"
                      : Math.abs(row.var_cdrs) > 25 &&
                        Math.abs(row.var_cdrs) <= sliderValue4
                      ? color4
                      : Math.abs(row.var_cdrs) <= 100
                      ? "#f00020"
                      : "",
                  border: index === selectedRow ? "2px solid blue" : "none", // Ajouter une bordure si la ligne est sélectionnée
                }}
                className={row.source === "All" ? "fixed-row" : ""}
              >
                <StyledTableCell align="left">{row.source}</StyledTableCell>
                <StyledTableCell align="left">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatNumberMillien(row.mediation)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatNumberMillien(row.big5)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatNumberMillien(row.fichiers)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatNumberMillien(row.delta)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.var_fichiers} %
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatNumberMillien(row.cdrs)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.var_cdrs} %
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    color: dateComparator(row.last_date) ? "red" : "inherit",
                  }}
                >
                  {row.last_date === "00-00-0000 00:00:00" ? "" : row.last_date}
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
                <TableRow style={{ height: "30px" }}>
                  <StyledTableCell
                    align="left"
                    active={orderBy === "source"}
                    direction={orderBy === "source" ? order : "asc"}
                    onClick={() => handleRequestSort("source")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("source")}
                      placement="top"
                    >
                      {t("source_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    onClick={() => handleRequestSort("type")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Type")}
                      placement="top"
                    >
                      {t("type_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "mediation"}
                    direction={orderBy === "mediation" ? order : "asc"}
                    onClick={() => handleRequestSort("mediation")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Fich Med")}
                      placement="top"
                    >
                      {t("fich_med_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "big5"}
                    direction={orderBy === "big5" ? order : "asc"}
                    onClick={() => handleRequestSort("big5")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Fichier BIG5")}
                      placement="top"
                    >
                      {t("fich_big5_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    active={orderBy === "fichiers"}
                    direction={orderBy === "fichiers" ? order : "asc"}
                    onClick={() => handleRequestSort("fichiers")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Fichier (traité DWH)")}
                      placement="top"
                    >
                      {t("fich_traite_dwh_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "delta"}
                    direction={orderBy === "delta" ? order : "asc"}
                    onClick={() => handleRequestSort("delta")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Med vs BIG5")}
                      placement="top"
                    >
                      {t("med_vs_big5_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "var_fichiers"}
                    direction={orderBy === "var_fichiers" ? order : "asc"}
                    onClick={() => handleRequestSort("var_fichiers")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Var fich")}
                      placement="top"
                    >
                      {t("var_fich_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    active={orderBy === "cdrs"}
                    direction={orderBy === "cdrs" ? order : "asc"}
                    onClick={() => handleRequestSort("cdrs")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("CDR")}
                      placement="top"
                    >
                      {t("cdr_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "var_cdrs"}
                    direction={orderBy === "var_cdrs" ? order : "asc"}
                    onClick={() => handleRequestSort("var_cdrs")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Var CDR")}
                      placement="top"
                    >
                      {t("var_cdr_ttl")}
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    active={orderBy === "last_date"}
                    direction={orderBy === "last_date" ? order : "asc"}
                    onClick={() => handleRequestSort("last_date")}
                  >
                    <Tooltip
                      arrow
                      title={getTooltipText("Date dernier CDR")}
                      placement="top"
                    >
                      {t("date_cdr_ttl_cdr")}
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => {
                      handleRowClick(row.type);
                      setSelectedRow(index); // Définir la ligne sélectionnée ici
                    }}
                    style={{
                      backgroundColor:
                        Math.abs(row.var_cdrs) >= 0 &&
                        Math.abs(row.var_cdrs) <= sliderValue1
                          ? color1
                          : Math.abs(row.var_cdrs) <= 5
                          ? "#eeeeee"
                          : Math.abs(row.var_cdrs) > 5 &&
                            Math.abs(row.var_cdrs) <= sliderValue2
                          ? color2
                          : Math.abs(row.var_cdrs) <= 15
                          ? "#f0c300"
                          : Math.abs(row.var_cdrs) > 15 &&
                            Math.abs(row.var_cdrs) <= sliderValue3
                          ? color3
                          : Math.abs(row.var_cdrs) <= 25
                          ? "#BF8013"
                          : Math.abs(row.var_cdrs) > 25 &&
                            Math.abs(row.var_cdrs) <= sliderValue4
                          ? color4
                          : Math.abs(row.var_cdrs) <= 100
                          ? "#f00020"
                          : "",
                      // border: index === selectedRow ? "5px solid red" : "none",
                      border: "5px solid blue",
                    }}
                    className={row.source === "All" ? "fixed-row" : ""}
                  >
                    <StyledTableCell align="left">{row.source}</StyledTableCell>
                    <StyledTableCell align="left">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">
                      {formatNumberMillien(row.mediation)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {formatNumberMillien(row.big5)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatNumberMillien(row.fichiers)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {formatNumberMillien(row.delta)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var_fichiers} %
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatNumberMillien(row.cdrs)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.var_cdrs} %
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{
                        color: dateComparator(row.last_date)
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {row.last_date === "00-00-0000 00:00:00"
                        ? ""
                        : row.last_date}
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
