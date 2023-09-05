import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDateContext } from "../../utils/DateContext";
import { useColorContext } from "../../utils/ColorContext";
import { Box, IconButton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CustomezedSliderSeuil from "../../utils/CustomezedSliderSeuil";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import { useSliderValues } from "../../utils/SliderValueContext";


// Étendre Dayjs avec le plugin de format personnalisé
dayjs.extend(customParseFormat);

export default function DatePickersFilters() {
  // Utiliser le contexte de date
  const { selectedDate, updateSelectedDate } = useDateContext();

  // État local pour la nouvelle date sélectionnée
  const [newDateValue, setNewDateValue] = useState();

  // État local pour la visibilité du contenu
  const [isContentVisible, setIsContentVisible] = useState(true);

  // Utiliser le contexte des couleurs
  const {
    color1,
    setColor1,
    color2,
    setColor2,
    color3,
    setColor3,
    color4,
    setColor4,
  } = useColorContext();

  // Utilisez le contexte des valeurs de slider
  const {
    sliderValue1,
    setSliderValue1,
    sliderValue2,
    setSliderValue2,
    sliderValue3,
    setSliderValue3,
    sliderValue4,
    setSliderValue4,
  } = useSliderValues();

  // Gérer le changement de la date sélectionnée
  const handleDateChange = (newValue) => {
    setNewDateValue(newValue); // Mettre à jour la date localement, mais pas dans le contexte
  };

  // Gérer le clic sur le bouton "Filtrer"
  const handleFilterClick = () => {
    setIsContentVisible(false); // Masquer le contenu après avoir cliqué sur "Filtrer"
    const dateConvertString = newDateValue.format("DD-MM-YYYY").toString(); // Convertir la date en format string
    updateSelectedDate(dateConvertString); // Mettre à jour la date dans le contexte après avoir cliqué sur "Filtrer"
  };


  const handleClikReinitialiseSliderValue = (event) => {
    event.preventDefault();
    setSliderValue1(5);
    setSliderValue2(15);
    setSliderValue3(25);
    setSliderValue4(100);
    setColor1("#eeeeee");
    setColor2("#f0c300");
    setColor3("#BF8013");
    setColor4("#f00020");
  };

  return (
    <>
      {isContentVisible && (
        <div
          style={{
            width: "280px",
            height: "maxContent",
            backgroundColor: "white",
            boxShadow: "2px 6px 14px black",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "25px",
            padding: "15px 20px",
          }}
        >
          {/* Utiliser le fournisseur de localisation pour le DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              {/* DatePicker avec le TextField associé */}
              <DatePicker
                label="Sélectionner une date"
                value={dayjs(selectedDate, "DD-MM-YYYY")}
                onChange={handleDateChange}
                dateFormat="DD-MM-YYYY"
                renderInput={(props) => (
                  <TextField {...props} variant="outlined" />
                )}
                inputFormat="DD-MM-YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box
            sx={{
              color: "black",
              float: "left",
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h7" color="f5f5f5" marginBottom={4}>
              Couleurs selon le Seuil{"   "}
              <Tooltip
                title="Réinitialiser la couleur et valeur du seuil"
                placement="top"
              >
                <IconButton
                  onClick={(e) => handleClikReinitialiseSliderValue(e)}
                >
                  <FormatColorResetIcon
                    style={{
                      color: "inherit",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>Min 0</Typography>
              <CustomezedSliderSeuil
                min={0}
                max={5}
                color={color1}
                value={sliderValue1}
                onChange={setSliderValue1} // Gérer le changement de la valeur du slider
              />
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>Min 5</Typography>
              <CustomezedSliderSeuil
                min={5}
                max={15}
                color={color2}
                value={sliderValue2}
                onChange={setSliderValue2} // Gérer le changement de la valeur du slider
              />
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>Min 15</Typography>
              <CustomezedSliderSeuil
                min={15}
                max={25}
                color={color3}
                value={sliderValue3}
                onChange={setSliderValue3} // Gérer le changement de la valeur du slider
              />
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>Min 25</Typography>
                <CustomezedSliderSeuil
                  min={25}
                  max={100}
                  color={color4}
                  value={sliderValue4}
                  onChange={setSliderValue4} // Gérer le changement de la valeur du slider
                />
                <input
                  type="color"
                  value={color4}
                  onChange={(e) => setColor4(e.target.value)}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              </Box>
            </Box>
          </Box>
          {/* Bouton "Filtrer" */}

          <Tooltip
            enterTouchDelay={0}
            disableHoverListener={!newDateValue}
            title="Sélectionnez d'abord une date"
            placement="top"
          >
            <Button
              variant="contained"
              onClick={handleFilterClick}
              disabled={!newDateValue}
              sx={{ cursor: !newDateValue ? "not-allowed" : "pointer" }}
            >
              Filtrer
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
}
