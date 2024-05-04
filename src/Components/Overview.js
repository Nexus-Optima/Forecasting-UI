import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "../Utils/Header";
import Sidebar from "../Utils/Sidebar";
import { useRef } from "react";
import { ColorType, createChart } from "lightweight-charts";
import Insight from "./Insight";
import { useCommodity } from "../Context/forecastContext";

const Overview = () => {
  const [clickedIcon, setClickedIcon] = useState("Overview");
  const {selectedCommodity,setSelectedCommodity}= useCommodity();

  // const [selectCommodity, setSelectCommodity] = useState("cotton");
  let chartContainerRef = useRef(null);
  let chartRef = useRef(null);

  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
  };

  const renderContent = () => {
    switch (clickedIcon) {
        case "Insight":
          return <Insight/>
      default:
        return (
          <Grid container spacing={2}>
            {/* First Box */}
            <Grid item xs={5}>
              <Box
                sx={{
                  width: "41%",
                  height: "230px",
                  // backgroundColor: 'red',
                  color: "white",
                  position: "absolute",
                  left: "0",
                  right: "35%",
                  margin: "auto",
                  top: "71%",
                  borderRadius: "25px",
                  border: "1px solid black",
                }}
              >
                Box 1
              </Box>
            </Grid>
            {/* Second Box */}
            <Grid item xs={5}>
              <Box
                sx={{
                  width: "43%",
                  height: "230px",
                  // backgroundColor: 'yellow',
                  color: "white",
                  position: "absolute",
                  left: "52%",
                  right: "0",
                  margin: "auto",
                  top: "71%",
                  borderRadius: "25px",
                  border: "1px solid black",
                }}
              >
                Box 2
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Box
                sx={{
                  width: "86%",
                  height: "480px",
                  // background: 'Green',
                  color: "white",
                  align: "center",
                  justify: "center",
                  position: "absolute",
                  left: "9%",
                  right: "0",
                  margin: "auto",
                  top: "11%",
                  border: "2px solid black",
                  borderRadius: "50px",
                }}
              >
                <div
                  style={{
                    //  background: blue;
                    margin: "2% 11%",
                    position: "absolute",
                  }}
                  ref={chartContainerRef}
                ></div>
                Box
              </Box>
            </Grid>
          </Grid>
        );
    }
  };

  useEffect(() => {
    const forecastdata = async () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef = null;
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-forecast/${selectedCommodity}`
        );
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
 

        // const limited_data = actual.slice(-(80-forecast.length));
        // console.log(limited_data);

        // const chartData = limited_data.map((entry) => ({
        //   time: entry.Date,
        //   value: parseFloat(entry["Actual Values"]),
        // }));

        // forecast.forEach((entry1) => {
        //   chartData.push({
        //     time: entry1.Date,
        //     value: parseFloat(entry1["Forecast Values"]),
        //   });
        // });

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
    <>
      <Header />
      <Sidebar clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />

      <FormControl
        sx={{
          position: "absolute",
          top: "10px",
          left: "40%",
          width: "20%",
          padding: "5px",
          background: "#F0F0F0",
        }}
      >
        <InputLabel sx={{ textAlign: "center" }} id="commodity-label">
          SELECT COMMODITY
        </InputLabel>
        <Select
          labelId="commodity-label"
          id="commodity"
          value={selectedCommodity}
          onChange={handleCommodityChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="cotton">Cotton</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
        </Select>
      </FormControl>
      {renderContent()}
    </>
  );
};

export default Overview;