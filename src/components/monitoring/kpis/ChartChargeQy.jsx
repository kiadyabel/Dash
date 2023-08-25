// Import des dépendances
import React, { useEffect, useState } from "react"; // Import de React et des hooks useState et useEffect
import * as echarts from "echarts"; // Import de la bibliothèque echarts
import { FetchData } from "../../../utils/FetchData"; // Import de la fonction FetchData depuis un chemin relatif
import CircularIndeterminate from "../../../utils/CircularProgress"; // Import d'un composant CircularProgress depuis un chemin relatif
import { Box, IconButton, useMediaQuery } from "@mui/material"; // Import de composants Box et IconButton depuis la bibliothèque MUI
import { useSelectedName } from "./OnClickValueKpis"; // Import d'un hook custom depuis un chemin relatif
import { useDateContext } from "../../../utils/DateContext"; // Import d'un hook custom depuis un chemin relatif
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak"; // Import de l'icône CenterFocusWeak depuis la bibliothèque MUI
import ReactECharts from "echarts-for-react"; // Import de ReactECharts depuis la bibliothèque echarts-for-react

import numeral from "numeral"; // Import de la bibliothèque numeral pour le formatage des nombres
import ModalChart from "../../../utils/ModalChart"; // Import d'un composant ModalChart depuis un chemin relatif

// Définition du composant ChartChargeQy
const ChartChargeQy = () => {
  // Hooks d'état
  const [val, setVal] = useState([]); // données
  const [dataValue, setDataValue] = useState([]); // État pour stocker les valeurs qty_files
  const [slotValue, setSlotValue] = useState([]); // État pour stocker les valeurs de date slot
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
  const { selectedName } = useSelectedName(); // Utilisation du hook custom useSelectedName pour obtenir la valeur sélectionnée
  const { selectedDate } = useDateContext(); // Utilisation du hook custom useDateContext pour obtenir la date sélectionnée
  const [showModal, setShowModal] = useState(false); // État pour gérer l'affichage du modal

  // Vérifiez si l'écran est une tablette ou un mobile
  const isTabletOrMobile = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

  // Effet secondaire pour charger les données
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "0032"; // Type de données à récupérer
        const date = selectedDate; // Date sélectionnée
        const params = selectedName; // Nom sélectionné

        setIsLoading(true); // Début du chargement

        const fetchedData = await FetchData(type, date, params); // Appel à la fonction FetchData pour récupérer les données
        const mappedData = fetchedData.data; // Données mappées

        // Mise à jour des états avec les données récupérées
        setVal(mappedData);
        setDataValue(mappedData.map((item) => item.kpi_value));
        setSlotValue(mappedData.map((item) => item.slot));
        setIsLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false); // Fin du chargement en cas d'erreur
      }
    };

    fetchDataFromApi(); // Appel de la fonction de récupération des données
  }, [selectedName, selectedDate]); // Dépendances de l'effet, il sera déclenché lorsque selectedName ou selectedDate changent

  const shouldRenderChart = !isLoading && val && val.length > 0; // Variable booléenne pour déterminer si le graphique doit être rendu

  // Options du graphique echarts
  const option = {
    // Configuration du tooltip et de la position
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    // Configuration du titre
    title: {
      left: "center",
      text: `Recharge QTY  ${selectedName}`,
    },
    // Configuration de la boîte à outils
    toolbox: {
      feature: {
        saveAsImage: {}, // Option pour sauvegarder l'image du graphique
      },
    },
    // Configuration de l'axe X
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: slotValue, // Données de l'axe X
    },
    // Configuration de l'axe Y
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        formatter: function (value) {
          return numeral(value).format("0a"); // Formatage des nombres sur l'axe Y
        },
      },
    },
    // Configuration du dataZoom pour le zoom interactif
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 60,
      },
      {
        start: 0,
        end: 60,
      },
    ],
    // Configuration de la série de données
    series: [
      {
        name: selectedName,
        type: "bar",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: dataValue, // Données de la série
      },
    ],
  };

  // Rendu du composant
  return (
    <div>
      {/* Bouton pour ouvrir le modal */}
      {shouldRenderChart &&
        !isTabletOrMobile &&(
          <IconButton
            title="zoom"
            sx={{ cursor: "pointer", float: "left", zIndex: 12 }}
            onClick={() => setShowModal(!showModal)} // Inversion de la valeur de showModal au clic
          >
            <CenterFocusWeakIcon /> {/* Icône */}
          </IconButton>
        )}

      <div style={{ position: "relative" }}>
        {/* Affichage du graphique si le chargement est terminé */}
        {shouldRenderChart && (
          <ReactECharts
            option={option}
            style={{ height: "290px", marginTop: "14px" }}
          />
        )}
        {/* Affichage de CircularIndeterminate au-dessus du graphique */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CircularIndeterminate isLoading={isLoading} />
          </Box>
        )}
      </div>

      {/* Modal pour afficher le graphique en grand */}
      {showModal && (
        <ModalChart>
          <Box>
            <ReactECharts
              option={option}
              style={{ height: "700px", minWidth: "900px" }}
            />
          </Box>
        </ModalChart>
      )}
    </div>
  );
};

export default ChartChargeQy; // Export du composant
