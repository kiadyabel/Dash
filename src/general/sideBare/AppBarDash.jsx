import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DatePickersFilters from "./DatePickerFilter";
import { useDateContext } from "../../utils/DateContext";
import logoOrange from "../../utils/image/logoOrange.png";
import logoKrill from "../../utils/image/logoKrill.png";
import LanguageSwitcher from "../../utils/SelectLangue";
// Largeur du sidebar
const drawerWidth = 150;

// Style personnalisé pour la barre d'applications
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Composant AppBarDash
const AppBarDash = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [showDatePickers, setShowDatePickers] = useState(false);

  const { selectedDate } = useDateContext();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  // Menu déroulant pour le profil
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Deconnexion</MenuItem>
    </Menu>
  );

  return (
    <div>
      <CssBaseline />
      {/* Barre d'applications */}
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {/* Images des logos */}
          <img
            src={logoOrange}
            alt="logo Orange"
            style={{
              width: "45px",
              height: "45px",
              marginRight: "5px",
              marginLeft: "-10px",
            }}
          />
          <img
            src={logoKrill}
            alt="logo krill"
            style={{
              width: "45px",
              height: "45px",
              marginRight: "15px",
            }}
          />
          {/* Titre */}
          <Typography
            sx={{ fontSize: { md: "16px", xs: "10px", sm: "12px" } }}
            noWrap
            component="div"
          >
            DASHBOARD
          </Typography>
          <Box sx={{ flexGrow: { md: 1, xs: 1 } }} />
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            {/* Date */}
            <Typography
              component="div"
              sx={{
                textAlign: "center",
                marginRight: { md: "20px", xs: "5px" },
                fontSize: { md: "16px", xs: "10px", sm: "12px" },
              }}
            >
              Date: {selectedDate}
            </Typography>
            {/* Bouton de filtre */}
            <IconButton
              size="large"
              aria-label="filtre"
              color="inherit"
              sx={{ marginRight: { md: "100px", xs: "10px" } }}
              onClick={() => setShowDatePickers(!showDatePickers)}
            >
              <FilterAltIcon />
            </IconButton>
            {/* Bouton de session user */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <LanguageSwitcher/>
            {/* DatePickersFilters */}
            {showDatePickers && (
              <div style={{ position: "absolute", right: "50px", top: "63px" }}>
                <DatePickersFilters />
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default AppBarDash;
