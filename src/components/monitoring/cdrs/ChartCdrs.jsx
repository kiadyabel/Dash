import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { FetchData } from "../../../utils/FetchData";
import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box } from "@mui/material";
import { useSelectedType } from "./onClickValueCdrs";
import { useDateContext } from "../../../utils/DateContext";


const ChartCdrs = () => {
  const [dataValue, setDataValue] = useState([]); //valeur qty_files
  const [dateValue, setDateValue] = useState([]); //valeur date
  const [isLoading, setIsLoading] = useState(true); // spiner
  //const [isNull, setIsNull] = useState(false); // tester s'il n'y a pas de valeur
  const [renderChart, setRenderChart] = useState(false); // Utilisez un état pour contrôler quand le graphique doit être rendu
  const { selectedType } = useSelectedType(); // valeur dans le parametre venant de la click du table
  const { selectedDate } = useDateContext(); // dateContext

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "0022";
        const date = selectedDate.format("DD-MM-YYYY"); //date
        const params = selectedType;

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, params);
        const mappedData = fetchedData.data;

        // if (mappedData.length === 0) {
        //   // condition s'il n'y a pas de donnée pour de ne pas afficher le chart
        //   setIsNull(true);
        //   setIsLoading(false);
        // }

        setDataValue(mappedData.map((item) => item.qty_cdrs));
        setDateValue(mappedData.map((item) => item.date));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [selectedType, selectedDate]);

  useEffect(() => {
    if (!isLoading ) {
      setRenderChart(true); // Mettre à true une fois que les données ont été récupérées et n'est pas null
    }
  }, [isLoading]);

  useEffect(() => {
    if (renderChart) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "CDRs",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
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

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [renderChart, dateValue, dataValue, selectedType]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={chartRef} style={{ height: "300px" }} />
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
  );
};

export default ChartCdrs;
