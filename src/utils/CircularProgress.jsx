import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Définition d'un composant fonctionnel nommé "CircularIndeterminate" qui affiche un composant CircularProgress conditionnellement en fonction de la valeur de "isLoading".
export default function CircularIndeterminate({ isLoading }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {/* Affiche le composant CircularProgress uniquement si "isLoading" est vrai (true). */}
      {isLoading && <CircularProgress size={80} color="primary" />}
    </Box>
  );
}
