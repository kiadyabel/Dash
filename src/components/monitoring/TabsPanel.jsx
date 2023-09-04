import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IndexCdrs from "./cdrs/IndexCdrs";
import IndexKpis from "./kpis/IndexKpis";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
     
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const TabsPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "auto",
        marginTop: "12px",
        borderRadius: "8px",
      }}
    >
      <AppBar
        position="static"
        sx={{ bgcolor: "#F5F5F5", fontSize: "20px", marginBottom: "10px" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
          sx={{
            "& .MuiTabs-indicator": {
              height: "5px", // hauteur de l'indicator color
            },
          }}
        >
          <Tab
            label="CDRs Monitoring"
            sx={{
              backgroundColor: value === 0 ? "black" : undefined,
              "&.Mui-selected": {
                color: "white", // Texte en blanc quand l'onglet est sélectionné
              },
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="KPIs Monitoring"
            {...a11yProps(1)}
            sx={{
              backgroundColor: value === 1 ? "black" : undefined,
              "&.Mui-selected": {
                color: "white", // Texte en blanc quand l'onglet est sélectionné
              },
            }}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <IndexCdrs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IndexKpis />
      </TabPanel>
    </Box>
  );
};

export default TabsPanel;
