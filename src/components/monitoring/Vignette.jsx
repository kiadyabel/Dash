import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import { FetchData } from "../../utils/FetchData";

const Vignette = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const type = "001";
        const date = "26-07-2023";

        const fetchedData = await FetchData(type, date);
        setData(fetchedData);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    getData();
  }, []);
  return (
    <Grid container spacing={2}>
      {data.map((val) => (
        <Grid item xs={1.5} key={val.name}>
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
                <Typography variant="subtitle1" color="#707070" component="div">
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
              <Typography sx={{ fontWeight: "bold" }}>{val.var}</Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Vignette;
