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


const Vignette = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedDate } = useDateContext(); // dateContext

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "001";
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
  return (
    <>
      <Grid container spacing={2} position="relative">
        {data.map((val) => (
          <Grid item xs={12} sm={6} md={3} lg={1.5} key={val.name}>
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
                    fichier
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                    {val.value}
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
        </Box>
      </Grid>
    </>
  );
};

export default Vignette;
