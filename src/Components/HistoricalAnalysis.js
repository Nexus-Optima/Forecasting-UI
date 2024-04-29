import React, { useEffect } from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import { useRef } from "react";
import { ColorType, createChart } from "lightweight-charts";

const HistoricalAnalysis = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const initialData = [
      { time: "2018-12-22", value: 32.51 },
      { time: "2018-12-23", value: 31.11 },
      { time: "2018-12-24", value: 27.02 },
      { time: "2018-12-25", value: 27.32 },
      { time: "2018-12-26", value: 25.17 },
      { time: "2018-12-27", value: 28.89 },
      { time: "2018-12-28", value: 25.46 },
      { time: "2018-12-29", value: 23.92 },
      { time: "2018-12-30", value: 22.68 },
      { time: "2018-12-31", value: 22.67 },
      { time: "2019-12-22", value: 32.51 },
      { time: "2019-12-23", value: 31.11 },
      { time: "2019-12-24", value: 27.02 },
      { time: "2019-12-25", value: 27.32 },
      { time: "2019-12-26", value: 25.17 },
      { time: "2019-12-27", value: 28.89 },
      { time: "2019-12-28", value: 25.46 },
      { time: "2019-12-29", value: 23.92 },
      { time: "2019-12-30", value: 22.68 },
      { time: "2019-12-31", value: 22.67 },
      { time: "2020-12-22", value: 32.51 },
      { time: "2020-12-23", value: 31.11 },
      { time: "2020-12-24", value: 27.02 },
      { time: "2020-12-25", value: 27.32 },
      { time: "2020-12-26", value: 25.17 },
      { time: "2020-12-27", value: 28.89 },
      { time: "2020-12-28", value: 25.46 },
      { time: "2020-12-29", value: 23.92 },
      { time: "2020-12-30", value: 22.68 },
      { time: "2020-12-31", value: 22.67 },
      { time: "2021-12-02", value: 32.51 },
      { time: "2021-12-03", value: 31.11 },
      { time: "2021-12-04", value: 27.02 },
      { time: "2021-12-05", value: 27.32 },
      { time: "2021-12-06", value: 25.17 },
      { time: "2021-12-07", value: 28.89 },
      { time: "2021-12-08", value: 25.46 },
      { time: "2021-12-09", value: 23.92 },
      { time: "2021-12-10", value: 22.68 },
      { time: "2021-12-11", value: 22.67 },
      { time: "2021-12-12", value: 32.51 },
      { time: "2021-12-13", value: 31.11 },
      { time: "2021-12-14", value: 27.02 },
      { time: "2021-12-15", value: 27.32 },
      { time: "2021-12-16", value: 25.17 },
      { time: "2021-12-17", value: 28.89 },
      { time: "2021-12-18", value: 25.46 },
      { time: "2021-12-19", value: 23.92 },
      { time: "2021-12-20", value: 22.68 },
      { time: "2021-12-21", value: 22.67 },
      { time: "2021-12-22", value: 32.51 },
      { time: "2021-12-23", value: 31.11 },
      { time: "2021-12-24", value: 27.02 },
      { time: "2021-12-25", value: 27.32 },
      { time: "2021-12-26", value: 25.17 },
      { time: "2021-12-27", value: 28.89 },
      { time: "2021-12-28", value: 25.46 },
      { time: "2021-12-29", value: 23.92 },
      { time: "2021-12-30", value: 22.68 },
      { time: "2021-12-31", value: 22.67 },
    ];

    const chart = createChart(chartContainerRef.current, {
      layout: {
        margin: "13%",
        background: { type: ColorType.Solid, color: "white" },
      },
      width: 500,
      height: 450,
    });

    const newSeries = chart.addLineSeries({
      color: "black",
    });

    newSeries.setData(initialData);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <>
      <Container
        maxWidth={false}
        style={{
          // background: "green",
          height: "751px",
          width: "80%",
        }}
      >
        <Grid container spacing={2}>
          {/* 3 Month Summary */}
          <Grid item xs={5}>
            <Box
              sx={{
                // background: "red",
                top:"10%",
                border:"2px solid black",
                borderRadius:"50px",
                height: "500px",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: "12%",
                width: "34%",
              }}
              ref={chartContainerRef}
            >
              <Typography variant="h6">3 Month Summary</Typography>
            </Box>
          </Grid>
          {/* Forecasting Summary */}
          <Grid item xs={5}>
            <Box
              sx={{
                // background: "blue",
                top:"10%",
                border:"2px solid black",
                borderRadius:"50px",
                height: "500px",
                justifyContent: "center",
                position: "absolute",
                width: "41%",
                left: "47%",
              }}
              ref={chartContainerRef}
            >
              <Typography variant="h6">Forecasting Summary</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ marginBottom: "20px" }}>
          <Grid item xs={10} style={{ overflowX: "hidden" }}>
            <Box
              sx={{
                // background: "yellow",
                border:"2px solid black",
                borderRadius:"50px",
                height: "200px",
                justifyContent: "center",
                width: "76%",
                position: "absolute",
                top: "72%",
              }}
            >
              <Typography variant="h5">Cotton Price Prediction</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HistoricalAnalysis;
