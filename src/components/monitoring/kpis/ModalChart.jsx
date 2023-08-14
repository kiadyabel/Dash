import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { FetchData } from "../../../utils/FetchData";
import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelectedName } from "./OnClickValueKpis";
import { useDateContext } from "../../../utils/DateContext";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import numeral from "numeral";

const ModalChart = () => {
  const [dataValue, setDataValue] = useState([]); //valeur qty_files
  const [dateValue, setDateValue] = useState([]); //valeur date
  const [isLoading, setIsLoading] = useState(true);
  const { selectedName } = useSelectedName(); // valeur dans le parametre venant de la click du table
  const { selectedDate } = useDateContext(); // dateContext
  const [isOpen, setIsOpen] = useState(false)

  const modalChartRef = useRef(null); //pour le modal

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "0031";
        const date = selectedDate; //date
        const params = selectedName;

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, params);
        const mappedData = fetchedData.data;

        setDataValue(mappedData.map((item) => item.kpi_value));
        setDateValue(mappedData.map((item) => item.date));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [selectedName, selectedDate]);

  // Utilisez un état pour contrôler quand le graphique doit être rendu
  const [shouldRenderChart, setShouldRenderChart] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShouldRenderChart(true); // Mettre à true une fois que les données ont été récupérées
    }
  }, [isLoading]);

  //pour le modal
  useEffect(() => {
    if (shouldRenderChart) {
      const chartInstanceModal = echarts.init(modalChartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "KPIs",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dateValue,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            formatter: function (value) {
              // Utilisez la fonction format de numeral pour formater le nombre
              return numeral(value).format("0a"); // Utilisez le format abrégé (1K, 1M)
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 40,
          },
          {
            start: 0,
            end: 40,
          },
        ],
        series: [
          {
            name: selectedName,
            type: "line",
            data: dataValue,
          },
        ],
      };

      chartInstanceModal.setOption(option);

      return () => {
        chartInstanceModal.dispose();
      };
    }
  }, [shouldRenderChart, dateValue, dataValue, selectedName]);
  //fin de chart dans le modal




  return (
    <>
      {!isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 800,
            backgroundColor: "white",
            boxShadow: "2px 6px 14px black",
            borderRadius: "10px",
            pt: 2,
            px: 4,
            pb: 3,
            zIndex: "12",
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
              {selectedName}
            </Typography>
            <IconButton sx={{position:"absolute",top:0 , right:0}} onClick={() =>setIsOpen(true)}>
              <FullscreenExitIcon />
            </IconButton>
            <Box>
              <div
                ref={modalChartRef}
                style={{ height: "600px", width: "900px" }}
              />
            </Box>

            {isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularIndeterminate isLoading={isLoading} />
              </Box>
            )}
          </div>
        </Box>
      )}
    </>
  );
};

export default ModalChart;