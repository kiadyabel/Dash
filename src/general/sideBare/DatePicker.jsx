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

// Étendre Dayjs avec le plugin de format personnalisé
dayjs.extend(customParseFormat);

export default function DatePickersFilters() {
  const {selectedDate, updateSelectedDate } = useDateContext(); //date deja filtrer
  const [newDateValue,setNewDateValue] = useState() // nouveau date pret a filtrer 

  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleDateChange = (newValue) => {
    // Mettre à jour la date localement, mais pas dans le contexte
    setNewDateValue(newValue);
  };

  const handleFilterClick = () => {
    setIsContentVisible(false); // Masquer le contenu après avoir cliqué sur "Filtrer"

    // Mettre à jour la date dans le contexte
    updateSelectedDate(newDateValue);
  };

  return (
    <>
      {isContentVisible && (
        <div
          style={{
            width: "250px",
            height: "200px",
            backgroundColor: "#F5F5F5",
            boxShadow: "2px 6px 14px black",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "25px",
            padding: "5px 20px",
          }}
        >
          {/* Utiliser le fournisseur de localisation pour le DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              {/* DatePicker avec le TextField associé */}
              <DatePicker
                label="Sélectionner une date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField {...props} variant="outlined" />
                )}
                inputFormat="DD-MM-YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* Bouton "Filtrer" */}
          <Button variant="contained" onClick={handleFilterClick}>
            Filtrer
          </Button>
        </div>
      )}
    </>
  );
}
