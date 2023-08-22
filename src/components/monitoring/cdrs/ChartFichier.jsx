import React, { useEffect, useState } from "react";
import { FetchData } from "../../../utils/FetchData";
import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box, IconButton } from "@mui/material";
import { useSelectedType } from "./onClickValueCdrs";
import { useDateContext } from "../../../utils/DateContext";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import ReactECharts from "echarts-for-react"; // Importez ReactECharts
import ModalChart from "../../../utils/ModalChart";

import numeral from "numeral";

const ChartCdrs = () => {
  const [dataValue, setDataValue] = useState([]); //valeur qty_files
  const [dateValue, setDateValue] = useState([]); //valeur date
  const [isLoading, setIsLoading] = useState(true);
  const { selectedType } = useSelectedType(); // valeur dans le parametre venant de la click du table
  const { selectedDate } = useDateContext(); // dateContext
  const [showModal, setShowModal] = useState(false); // etat pour le modal


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "0021";
        const date = selectedDate; //date
        const params = selectedType;

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, params);
        const mappedData = fetchedData.data;

        setDataValue(mappedData.map((item) => item.qty_files));
        setDateValue(mappedData.map((item) => item.date));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [selectedType, selectedDate]);

  const shouldRenderChart = !isLoading;
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "Fichiers",
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
        name: selectedType,
        type: "line",
        data: dataValue,
      },
    ],
  };

  return (
    <div>
      <IconButton
        title="zoom"
        sx={{ cursor: "pointer", float: "left", zIndex: 12 }}
        onClick={() => setShowModal(!showModal)}
      >
        <CenterFocusWeakIcon />
      </IconButton>
      <div style={{ position: "relative" }}>
        {shouldRenderChart ? (
          <ReactECharts option={option} style={{ height: "290px" }} />
        ) : (
          <CircularIndeterminate isLoading={isLoading} />
        )}
      </div>
      {showModal && (
        <ModalChart>
          <Box>
            <ReactECharts
              option={option}
              style={{ height: "700px", minWidth: "900px" }}
            />
          </Box>
        </ModalChart>
      )}
    </div>
  );
};

export default ChartCdrs;
