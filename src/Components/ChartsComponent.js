import React, { useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import { createChart, ColorType } from 'lightweight-charts';
import { useCommodity } from '../Context/forecastContext';

const ChartComponent = ({ }) => {
  const {selectedCommodity,setSelectedCommodity}= useCommodity()
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const forecastdata = async () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef = null;
      }
      try {
      const apiUrl = process.env.REACT_APP_BACKEND;
      const response = await fetch(`${apiUrl}/get-forecast/${selectedCommodity}`);
      const { actual, forecast } = await response.json();

      // Calculate the lengths of actual and forecast arrays
      const actualLength = actual.length;
      const forecastLength = forecast.length;

      
      const startSliceIndex = Math.max(0, actualLength - forecastLength);
      const slicedActual = actual.slice(startSliceIndex);
      const maxActualEntries = Math.min(140 - Math.max(120, forecastLength), slicedActual.length);
      const trimmedActual = slicedActual.slice(-maxActualEntries);
      const chartData = [];

       trimmedActual.forEach(entry => {
         chartData.push({
           time: entry.Date,
           value: parseFloat(entry['Actual Values']) 
         });
       });
 
   
       forecast.forEach(entry => {
         chartData.push({
           time: entry.Date,
           value: parseFloat(entry['Forecast Values']) 
         });
       });
 
       if (chartData.length > 140) {
         chartData.splice(0, chartData.length - 140);
       }
 

    //     // const limited_data = actual.slice(-(80-forecast.length));
    //     // console.log(limited_data);

    //     // const chartData = limited_data.map((entry) => ({
    //     //   time: entry.Date,
    //     //   value: parseFloat(entry["Actual Values"]),
    //     // }));

    //     // forecast.forEach((entry1) => {
    //     //   chartData.push({
    //     //     time: entry1.Date,
    //     //     value: parseFloat(entry1["Forecast Values"]),
    //     //   });
    //     // });

        const chart = createChart(chartContainerRef.current, {
          layout: {
            margin: "13%",
            background: { type: ColorType.Solid, color: "white" },
          },
          width: 1200,
          height: 410,
        });

        const newSeries = chart.addLineSeries({
          color: "black",
        });
        newSeries.setData(chartData);
        chartRef.current = chart;
        
      } catch (error) {
        console.log("Error in fetching data");
      }
    };

    forecastdata();
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [selectedCommodity]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Box sx={{ width: "41%", height: "230px", color: "white", position: "absolute", left: "0", right: "35%", margin: "auto", top: "71%", borderRadius: "25px", border: "1px solid black" }}>
          Box 1
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ width: "43%", height: "230px", color: "white", position: "absolute", left: "52%", right: "0", margin: "auto", top: "71%", borderRadius: "25px", border: "1px solid black" }}>
          Box 2
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ width: "86%", height: "480px", color: "white", align: "center", justify: "center", position: "absolute", left: "9%", right: "0", margin: "auto", top: "11%", border: "2px solid black", borderRadius: "50px" }}>
          <div ref={chartContainerRef} style={{ margin: "2% 11%" }}></div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartComponent;
