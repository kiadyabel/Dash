import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { FetchData } from "../../../utils/FetchData";
import CircularIndeterminate from "../../../utils/CircularProgress";
import { Box } from "@mui/material";
import { useSelectedName } from "./OnClickValueKpis";

const ChartChargeQy = () => {
  const [dataValue, setDataValue] = useState([]); //valeur qty_files
  const [slotValue, setSlotValue] = useState([]); //valeur date slot
  const [isLoading, setIsLoading] = useState(true);
  const { selectedName } = useSelectedName(); // valeur dans le parametre venant de la click du table
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const type = "0032";
        const date = "26-07-2023";
        const params = selectedName;

        setIsLoading(true); // Mettre isLoading à true avant de démarrer la récupération des données

        const fetchedData = await FetchData(type, date, params);
        const mappedData = fetchedData.data;

        setDataValue(mappedData.map((item) => item.kpi_value));
        setSlotValue(mappedData.map((item) => item.slot));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [selectedName]);

  // Utilisez un état pour contrôler quand le graphique doit être rendu
  const [shouldRenderChart, setShouldRenderChart] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShouldRenderChart(true); // Mettre à true une fois que les données ont été récupérées
    }
  }, [isLoading]);

  useEffect(() => {
    if (shouldRenderChart) {
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
          text: "Recharge Qty",
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
          data: slotValue,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 60,
          },
          {
            start: 0,
            end: 60,
          },
        ],
        series: [
          {
            name: "Recharge Qty",
            type: "bar",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: dataValue,
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [shouldRenderChart, slotValue, dataValue]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={chartRef} style={{ height: "300px", marginTop: "14px" }} />
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

export default ChartChargeQy;
