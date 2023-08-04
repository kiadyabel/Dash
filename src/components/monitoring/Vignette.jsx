import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Vignette = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                Total
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                20.15 k
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                CCN
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                130.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                OCC
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                7000.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                MSC
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                870.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                AIR
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                579
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                SDP
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                804.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                ZEBRA
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                90.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={1.5}>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                TANGO
              </Typography>
              <Typography variant="subtitle1" color="#707070" component="div">
                fichier
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "blue" }}>
                5.0
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
            <Typography sx={{ fontWeight: "bold" }}>100 %</Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Vignette;
