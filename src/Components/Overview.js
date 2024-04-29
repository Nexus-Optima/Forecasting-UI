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
import NewsInsight from "./NewsInsight";
import HistoricalAnalysis from "./HistoricalAnalysis";

const Overview = () => {
  const [clickedIcon, setClickedIcon] = useState("overview");
  const [selectCommodity, setSelectCommodity] = useState("cotton");
  // const [initialData, setInitialData]=useState([]);

  const handleCommodityChange = (e) => {
    setSelectCommodity(e.target.value);
  };

  const renderContent = () => {
    switch (clickedIcon) {
      case "NewsInsight":
        return <NewsInsight />;
      case "HistoricalAnalysis":
        return <HistoricalAnalysis />;
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
  const chartContainerRef = useRef();

  useEffect(() => {    
    const forecastdata = async () => {
      try {
        const response = await fetch(
          // `${process.env.REACT_FORECAST_URL}/${selectCommodity}`
          `http://127.0.0.1:5000/get-forecast/${selectCommodity}`
          // "http://127.0.0.1:5000/get-forecast/cotton"
        );
        const userdata =await response.json();
        console.log(userdata);

        const intialdata=userdata
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
    
        newSeries.setData(intialdata);
        return () => {
          chart.remove();
        };
        
      } catch (error){
        console.log("Error in fetching data");
      }
    };
    forecastdata();
  },[selectCommodity]);


  // useEffect(() => {
    // const initialData = [
    //   { time: "2018-12-22", values: 32.51 },
    //   { time: "2018-12-23", value: 31.11 },
    //   { time: "2018-12-24", value: 27.02 },
    //   { time: "2018-12-25", value: 27.32 },
    //   { time: "2018-12-26", value: 25.17 },
    //   { time: "2018-12-27", value: 28.89 },
    //   { time: "2018-12-28", value: 25.46 },
    //   { time: "2018-12-29", value: 23.92 },
    //   { time: "2018-12-30", value: 22.68 },
    //   { time: "2018-12-31", value: 22.67 },
    //   { time: "2019-12-22", value: 32.51 },
    //   { time: "2019-12-23", value: 31.11 },
    //   { time: "2019-12-24", value: 27.02 },
    //   { time: "2019-12-25", value: 27.32 },
    //   { time: "2019-12-26", value: 25.17 },
    //   { time: "2019-12-27", value: 28.89 },
    //   { time: "2019-12-28", value: 25.46 },
    //   { time: "2019-12-29", value: 23.92 },
    //   { time: "2019-12-30", value: 22.68 },
    //   { time: "2019-12-31", value: 22.67 },
    //   { time: "2020-12-22", value: 32.51 },
    //   { time: "2020-12-23", value: 31.11 },
    //   { time: "2020-12-24", value: 27.02 },
    //   { time: "2020-12-25", value: 27.32 },
    //   { time: "2020-12-26", value: 25.17 },
    //   { time: "2020-12-27", value: 28.89 },
    //   { time: "2020-12-28", value: 25.46 },
    //   { time: "2020-12-29", value: 23.92 },
    //   { time: "2020-12-30", value: 22.68 },
    //   { time: "2020-12-31", value: 22.67 },
    //   { time: "2021-12-02", value: 32.51 },
    //   { time: "2021-12-03", value: 31.11 },
    //   { time: "2021-12-04", value: 27.02 },
    //   { time: "2021-12-05", value: 27.32 },
    //   { time: "2021-12-06", value: 25.17 },
    //   { time: "2021-12-07", value: 28.89 },
    //   { time: "2021-12-08", value: 25.46 },
    //   { time: "2021-12-09", value: 23.92 },
    //   { time: "2021-12-10", value: 22.68 },
    //   { time: "2021-12-11", value: 22.67 },
    //   { time: "2021-12-12", value: 32.51 },
    //   { time: "2021-12-13", value: 31.11 },
    //   { time: "2021-12-14", value: 27.02 },
    //   { time: "2021-12-15", value: 27.32 },
    //   { time: "2021-12-16", value: 25.17 },
    //   { time: "2021-12-17", value: 28.89 },
    //   { time: "2021-12-18", value: 25.46 },
    //   { time: "2021-12-19", value: 23.92 },
    //   { time: "2021-12-20", value: 22.68 },
    //   { time: "2021-12-21", value: 22.67 },
    //   { time: "2021-12-22", value: 32.51 },
    //   { time: "2021-12-23", value: 31.11 },
    //   { time: "2021-12-24", value: 27.02 },
    //   { time: "2021-12-25", value: 27.32 },
    //   { time: "2021-12-26", value: 25.17 },
    //   { time: "2021-12-27", value: 28.89 },
    //   { time: "2021-12-28", value: 25.46 },
    //   { time: "2021-12-29", value: 23.92 },
    //   { time: "2021-12-30", value: 22.68 },
    //   { time: "2021-12-31", value: 22.67 },
    // ];

  //   const chart = createChart(chartContainerRef.current, {
  //     layout: {
  //       margin: "13%",
  //       background: { type: ColorType.Solid, color: "white" },
  //     },
  //     width: 1200,
  //     height: 410,
  //   });

  //   const newSeries = chart.addLineSeries({
  //     color: "black",
  //   });

  //   newSeries.setData(initialData);
  //   return () => {
  //     chart.remove();
  //   };
  // }, [selectCommodity]);

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
          value={selectCommodity}
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
