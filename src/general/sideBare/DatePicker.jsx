import { Button } from "@mui/material";
import * as React from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { format } from "date-fns";

export default function DatePickersFilters() {
  //const todayFormatted = Date.now().format("DD-MM-YYYY");
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   const handleDateChange = (date) => {
     setSelectedDate(date);
   };

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        backgroundColor: "#F5F5F5",
        position: "absolute",
        right: "50px",
        top: "63px",
        boxShadow: "2px 6px 14px black",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Sélectionnez une date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          format="dd-MM-yyyy"
          
        />
      </LocalizationProvider>
      <Button variant="contained">Filtrer</Button>
    </div>
  );
}
