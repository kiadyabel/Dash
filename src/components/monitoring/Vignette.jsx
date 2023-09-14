import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CircularIndeterminate from "../../utils/CircularProgress";

import { useState, useEffect } from "react";
import { FetchData } from "../../utils/FetchData";
import { useDateContext } from "../../utils/DateContext";
import numeral from "numeral";
import { useTranslation } from "react-i18next";

const Vignette = () => {
  const { t } = useTranslation(); // Traduction

  const [data, setData] = useState([]); // État pour stocker les données
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement
  const { selectedDate } = useDateContext(); // Utilisation du contexte de date pour obtenir la date sélectionnée

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "001";
        const date = selectedDate; // Date sélectionnée

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, null);
        // Tri des données par valeur
        const sortedData = fetchedData.data.sort((a, b) => {
          // Placer "TOTAL" toujours à la fin
          if (a.name === "TOTAL") return 1;
          if (b.name === "TOTAL") return -1;
          return a.var - b.var;
        });
        setData(sortedData); // mise à jour du data trié
        setIsLoading(false); // Mettre isLoading à false une fois les données chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchDataFromApi(); // Appel de la fonction pour récupérer les données
  }, [selectedDate]); // Exécuter lorsque la date sélectionnée change

  // Formatage du nombre en milliers
  const formatNumberMillien = (number) => {
    return numeral(number).format("0,0");
  };

  return (
    <>
      <Grid container spacing={2} position="relative">
        {/*mapping du donnée dans data */}
        {data.map((val) => (
          <Grid item xs={6} sm={6} md={3} lg={1.5} key={val.name}>
            <Card sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {val.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="#707070"
                    component="div"
                  >
                    {t("fichier")} {/** afficher le label ficher selon la langue selectionner */}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                    {formatNumberMillien(val.value)}
                  </Typography>
                </CardContent>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 3,
                  color: "green",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: val.var < 0 ? "red" : "green",
                  }}
                >
                  {val.var} %
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularIndeterminate isLoading={isLoading} />
          {/* Affichage du composant de chargement */}
        </Box>
      </Grid>
    </>
  );
};

export default Vignette;
