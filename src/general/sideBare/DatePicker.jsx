import { Button } from "@mui/material";
import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickersFilters() {
  //const todayFormatted = Date.now().format("DD-MM-YYYY");

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
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:"15px"
      }}
    >

        <p style={{color:"#707070"}}>DatePickers</p>
        <Button variant="contained">Filtrer</Button>
    </div>
  );
}
