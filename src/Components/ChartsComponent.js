import React, { useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import { createChart, ColorType } from 'lightweight-charts';
import { useCommodity } from '../Context/forecastContext';

const ChartComponent = () => {
  const { selectedCommodity } = useCommodity();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const forecastdata = async () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      try {
        const apiUrl = process.env.REACT_APP_BACKEND;
        const response = await fetch(`${apiUrl}/get-forecast/${selectedCommodity}`);
        const { actual, forecast } = await response.json();

        // Initialize the chart with padding adjustments
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: "white" },
          },
          width: chartContainerRef.current.clientWidth * 0.95, // Slightly less width to accommodate padding
          height: chartContainerRef.current.clientHeight * 0.95, // Slightly less height to accommodate padding
        });

        const actualSeries = chart.addLineSeries({
          color: "black",
        });

        const forecastSeries = chart.addLineSeries({
          color: "green",
        });

        const processData = (data) => {
          let processedData = data.map(entry => ({
            time: entry.Date,
            value: parseFloat(entry['Actual Values'] || entry['Forecast Values'])
          }));
          processedData = processedData.sort((a, b) => a.time - b.time);
          return processedData.filter((v, i, a) => i === 0 || a[i - 1].time !== v.time);
        };

        actualSeries.setData(processData(actual));
        forecastSeries.setData(processData(forecast));

        chartRef.current = chart;
        
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };

    forecastdata();

    // Resize observer to update chart dimensions on container resize
    const resizeObserver = new ResizeObserver(entries => {
      if (chartRef.current && entries[0].target) {
        const { width, height } = entries[0].target.getBoundingClientRect();
        chartRef.current.applyOptions({
          width: width * 0.95,
          height: height * 0.95
        });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, [selectedCommodity]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Box sx={{
          width: "41%", height: "230px", color: "white",
          position: "absolute", left: "0", right: "35%",
          margin: "auto", top: "71%", borderRadius: "25px", border: "1px solid black"
        }}>
          Box 1
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{
          width: "43%", height: "230px", color: "white",
          position: "absolute", left: "52%", right: "0",
          margin: "auto", top: "71%", borderRadius: "25px", border: "1px solid black"
        }}>
          Box 2
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{
          width: "86%", height: "480px", color: "white", align: "center", justify: "center",
          position: "absolute", left: "9%", right: "0", margin: "auto", top: "11%",
          border: "2px solid black", borderRadius: "50px"
        }}>
          <div ref={chartContainerRef} style={{
            width: '97%', height: '80%', 
            padding: '2%' // Adds padding inside the div to prevent the chart from touching the edges
          }}></div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartComponent;
