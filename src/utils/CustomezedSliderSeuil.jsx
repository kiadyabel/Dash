import * as React from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Modifiez la couleur et la taille ici
const PrettoSlider = styled(Slider)(({ theme, colored }) => ({
  color: colored || theme.palette.primary.main, // Utilisez la couleur primaire de votre thème
  height: 4, // Réduisez la taille ici
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 16, // Réduisez la taille ici
    width: 16, // Réduisez la taille ici
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10, // Réduisez la taille ici
    background: "unset",
    padding: 0,
    width: 20, // Réduisez la taille ici
    height: 20, // Réduisez la taille ici
    borderRadius: "50% 50% 50% 0",
    backgroundColor: colored || theme.palette.primary.main, // Utilisez la couleur primaire de votre thème
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

function CustomezedSliderSeuil({ min, max, color, value, onChange }) {
  
  // Fonction de gestion du changement de valeur du slider
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 150 }}>
      <PrettoSlider
        aria-label="ios slider"
        defaultValue={min}
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        colored={color}
        valueLabelDisplay="on"
      />
    </Box>
  );
}


// type de parametre
CustomezedSliderSeuil.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default CustomezedSliderSeuil;
