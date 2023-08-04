import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Chartkpis = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;

    let data = [[base, Math.random() * 300]];

    for (let i = 1; i < 20000; i++) {
      let now = new Date((base += oneDay));
      data.push([
        +now,
        Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
      ]);
    }

    if (chartRef.current) {
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
          text: "RECHARGE QTY",
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
          type: "time",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 20,
          },
          {
            start: 0,
            end: 20,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            data: data,
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ height: "300px" }} />;
};

export default Chartkpis;
