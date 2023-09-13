// Import des dépendances
import React, { useEffect, useState } from "react"; // Import de React et des hooks useState et useEffect
import { FetchData } from "../../../utils/FetchData"; // Import de la fonction FetchData depuis un chemin relatif
import CircularIndeterminate from "../../../utils/CircularProgress"; // Import d'un composant CircularProgress depuis un chemin relatif
import { Box, IconButton, useMediaQuery } from "@mui/material"; // Import de composants Box et IconButton depuis la bibliothèque MUI
import { useSelectedType } from "./onClickValueCdrs"; // Import d'un hook custom depuis un chemin relatif
import { useDateContext } from "../../../utils/DateContext"; // Import d'un hook custom depuis un chemin relatif
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak"; // Import de l'icône CenterFocusWeak depuis la bibliothèque MUI
import ReactECharts from "echarts-for-react"; // Import de ReactECharts depuis la bibliothèque echarts-for-react
import ModalChart from "../../../utils/ModalChart"; // Import d'un composant ModalChart depuis un chemin relatif
import numeral from "numeral"; // Import de la bibliothèque numeral pour le formatage des nombres

import { useTranslation } from "react-i18next"; // utiliser pour la translation

// Définition du composant ChartFichier
const ChartFichier = () => {
  const { t } = useTranslation(); // translation

  // Hooks d'état
  const [val, setVal] = useState([]); // données
  const [dataValue, setDataValue] = useState([]); // État pour stocker les valeurs qty_files
  const [dateValue, setDateValue] = useState([]); // État pour stocker les valeurs de date
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
  const { selectedType } = useSelectedType(); // Utilisation du hook custom useSelectedType pour obtenir la valeur sélectionnée
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
        const type = "0021"; // Type de données à récupérer
        const date = selectedDate; // Date sélectionnée
        const params = selectedType; // Type sélectionné

        setIsLoading(true); // Début du chargement

        const fetchedData = await FetchData(type, date, params); // Appel à la fonction FetchData pour récupérer les données
        const mappedData = fetchedData.data; // Données mappées

        // Mise à jour des états avec les données récupérées
        setVal(mappedData);
        setDataValue(mappedData.map((item) => item.qty_files));
        setDateValue(mappedData.map((item) => item.date));
        setIsLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false); // Fin du chargement en cas d'erreur
      }
    };

    fetchDataFromApi(); // Appel de la fonction de récupération des données
  }, [selectedType, selectedDate]); // Dépendances de l'effet, il sera déclenché lorsque selectedType ou selectedDate changent

  const shouldRenderChart = !isLoading && val && val.length > 0; // Variable booléenne pour déterminer si le graphique doit être rendu

  // Options du graphique echarts
  const option = {
    // Configuration du tooltip et de la position
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0] - 100, "10%"];
      },
    },
    // Configuration du titre
    title: {
      left: "center",
      text: `${t("fichier")}  ${selectedType}`, // Titre du graphique
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
      data: dateValue, // Données de l'axe X
    },
    // Configuration de l'axe Y
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        formatter: function (value) {
          // Utilisez la fonction format de numeral pour formater le nombre
          return numeral(value).format("0a"); // Utilisez le format abrégé (1K, 1M)
        },
      },
    },
    // Configuration du dataZoom pour le zoom interactif
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 40,
      },
      {
        start: 0,
        end: 40,
      },
    ],
    // Configuration de la série de données
    series: [
      {
        name: selectedType, // Nom de la série
        type: "line", // Type de graphique
        data: dataValue, // Données de la série
      },
    ],
  };

  // Rendu du composant
  return (
    <div>
      {/* Bouton pour ouvrir le modal */}
      {shouldRenderChart && !isTabletOrMobile && (
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

export default ChartFichier; // Export du composant
