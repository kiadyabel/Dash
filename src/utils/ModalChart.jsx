import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const ModalChart = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            height: 800,
            backgroundColor: "white",
            boxShadow: "2px 6px 14px black",
            borderRadius: "10px",
            pt: 2,
            px: 4,
            pb: 3,
            zIndex: "999",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "30px",
                color: "blue",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {/*selectedName*/}
            </Typography>
            <IconButton
              sx={{ position: "absolute", top: 0, left: 0 ,cursor:"pointer",zIndex:"125"}}
              onClick={() => setIsOpen(!isOpen)}
            >
              <FullscreenExitIcon />
            </IconButton>
            <Box>
              {children}
            </Box>
          </div>
        </Box>
      )}
    </>
  );
};

export default ModalChart;
