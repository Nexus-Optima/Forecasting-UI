import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, AppBar, Toolbar, FormControlLabel, Switch, Stack } from "@mui/material";
import { createChart, ColorType, LineStyle } from "lightweight-charts";
import { useCommodity } from "../Context/forecastContext";
import { styled } from '@mui/material/styles';

const ChartComponent = () => {
  const { selectedCommodity } = useCommodity();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [avgPrice, setAvgPrice] = useState(null);
  const [actualmaxprice, setActualmaxprice] = useState(null);
  const [actualminprice, setActualminprice] = useState(null);
  const [actualavgprice, setActualavgprice] = useState(null);
  const [actualstartdate, setActualstartdate] = useState(null);
  const [actualenddate, setActualenddate] = useState(null);
  const [isMacro, setIsMacro] = useState(false);
  const [isPredict, setIsPredict] = useState(false);

  const handleToggle = () => { setIsMacro(!isMacro);};
  const handlePredictToggle = () => { setIsPredict(!isPredict);};

  useEffect(() => {
    const forecastdata = async () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      chartContainerRef.current.innerHTML = "";
      try {
        const apiUrl = process.env.REACT_APP_FORECAST_MANAGER;
        let response = ''
        if (isMacro) {
          response = await fetch(
            `${apiUrl}/get-forecast/${selectedCommodity}/macro`
          );
        }
        else {
          response = await fetch(
            `${apiUrl}/get-forecast/${selectedCommodity}/micro`
          );
        }
        const { actual, forecast, predictions } = await response.json();

        const last90DaysData = actual.slice(-90);
        const actualPrices = last90DaysData.map((e) => e["Actual Values"]);
        const actualmaxprice = Math.max(...actualPrices);
        const actualminprice = Math.min(...actualPrices);
        const actualavgprice = actualPrices.reduce((acc, val) => acc + val, 0) / actualPrices.length;

        setActualmaxprice(actualmaxprice);
        setActualminprice(actualminprice);
        setActualavgprice(actualavgprice);

        const actualstartdate = last90DaysData[0].Date;
        const actualenddate = last90DaysData[last90DaysData.length - 1].Date;
        setActualstartdate(actualstartdate);
        setActualenddate(actualenddate);

        const forecastPrices = forecast.map(
          (entry) => entry["Forecast Values"]
        );
        const maxPrice = Math.max(...forecastPrices);
        const minPrice = Math.min(...forecastPrices);
        const startDate = forecast[0].Date;
        const endDate = forecast[forecast.length - 1].Date;

        setMaxPrice(maxPrice);
        setMinPrice(minPrice);
        setStartDate(startDate);
        setEndDate(endDate);

        const startIndex = forecast.findIndex(
          (entry) => entry.Date === startDate
        );
        const endIndex = forecast.findIndex((entry) => entry.Date === endDate);
        const pricesInRange = forecast
          .slice(startIndex, endIndex + 1)
          .map((entry) => parseFloat(entry["Forecast Values"]));

        const avgPrice =
          pricesInRange.length > 0
            ? pricesInRange.reduce((acc, val) => acc + val, 0) /
              pricesInRange.length
            : 0;

        setAvgPrice(avgPrice);

        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: "white" },
          },
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight - 60, // Adjusted to fit within the box
        });

        const actualSeries = chart.addLineSeries({
          color: "black",
        });

        const forecastSeries = chart.addLineSeries({
          color: "green",
        });

        const predictionSeries = chart.addLineSeries({
          color: "blue",
          lineStyle: LineStyle.Dotted,
        });

        const processData = (data) => {
          let processedData = data.map((entry) => ({
            time: entry.Date,
            value: parseFloat(
              entry["Actual Values"] || entry["Forecast Values"] || entry["Test Predictions"]
            ),
          }));
          processedData = processedData.sort((a, b) => a.time - b.time);
          return processedData.filter(
            (v, i, a) => i === 0 || a[i - 1].time !== v.time
          );
        };

        actualSeries.setData(processData(actual));
        forecastSeries.setData(processData(forecast));
        if (isPredict){ predictionSeries.setData(processData(predictions));}

        chartRef.current = chart;
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };

    forecastdata();

    const resizeObserver = new ResizeObserver((entries) => {
      if (chartRef.current && entries[0].target) {
        const { width, height } = entries[0].target.getBoundingClientRect();
        chartRef.current.applyOptions({
          width: width,
          height: height - 60, // Adjusted to fit within the box
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
  }, [selectedCommodity, isMacro, isPredict]);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 22,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(16px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 4,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#000',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#ffffff',
        },
      },
      '&.MuiSwitch-switchBase': {
        color: '#000',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#ffffff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 18,
      height: 18,
      borderRadius: '50%', // Make the thumb round
      backgroundColor: '#000',
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
      boxSizing: 'border-box',
    },
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Box
          sx={{
            width: "41%",
            height: "230px",
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
           <Typography sx={{
            padding:'15px',
              color: "black",
              fontSize: "24px",
              marginBottom: "10px",
              fontWeight: "bold",
              fontStyle:'italic'
            }}>
           3 Months Summary
          </Typography>
          <Typography sx={{ color: "black", fontSize: "18px", marginBottom: "10px" , marginRight:'20px', fontStyle:'italic'}}>
            {actualmaxprice ? `Max Price: ${actualmaxprice.toFixed(2)}` : 'Max Price : No data available'}
          </Typography>
          <Typography sx={{ color: "black", fontSize: "18px", marginBottom: "10px", marginRight:'20px' ,fontStyle:'italic'}}>
            {actualminprice ? `Min Price: ${actualminprice.toFixed(2)}` : 'Min Price : No data available'}
          </Typography>
          <Typography sx={{ color: "black", fontSize: "18px", marginBottom: "10px", marginRight:'20px',fontStyle:'italic' }}>
            {actualstartdate && actualenddate ? `Date Range: ${actualstartdate} - ${actualenddate}` : 'Date Range : No data available'} 
          </Typography>
          <Typography sx={{ color: "black", fontSize: "18px", marginBottom: "10px", marginRight:'20px',fontStyle:'italic' }}>
            {actualavgprice ? `Avg Price: ${actualavgprice.toFixed(2)}` : 'Avg Price : No data available'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            width: "43%",
            height: "230px",
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
          <Typography
            sx={{
              padding:'15px',
              color: "black",
              fontSize: "24px",
              marginBottom: "10px",
              fontWeight: "bold",
              fontStyle:'italic'
            }}
          >
            Forecasting Summary
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "18px", marginBottom: "10px" , marginRight:'20px', fontStyle:'italic'}}
          >
            {maxPrice ? `Max Price: ${maxPrice.toFixed(2)}` : 'Max Price : No data available'}
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "18px", marginBottom: "10px" , marginRight:'20px', fontStyle:'italic'}}
          >
            {minPrice ? `Min Price: ${minPrice.toFixed(2)}` : 'Min Price : No data available'}
          </Typography>
          <Typography
            sx={{ color: "black", fontSize: "18px", marginBottom: "10px", marginRight:'20px', fontStyle:'italic' }}
          >
            {startDate && endDate ? `Date Range: ${startDate} - ${endDate}` : 'Date Range : No data available'}
          </Typography>
          <Typography sx={{ color: "black", fontSize: "18px" , marginRight:'20px', fontStyle:'italic'}}>
            {avgPrice ? `Avg Price: ${avgPrice.toFixed(2)}` : 'Avg Price : No data available'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box
          sx={{
            width: "86%",
            height: "57%",
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
          <AppBar position="static" sx={{ borderRadius: "50px 50px 0 0", backgroundColor: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
              </Typography>
              <FormControlLabel
                control={<AntSwitch checked={isMacro} onChange={handleToggle} />}
                label={<Typography sx={{ color: "white", marginLeft: '12px' }}>{isMacro ? 'Macro' : 'Micro'}</Typography>}
              />
              <FormControlLabel 
                control={<AntSwitch checked={isPredict} onChange={handlePredictToggle} />} 
                label={<Typography sx={{ color: "white", marginLeft: '12px' }}>{isPredict ? 'Hide predictions' : 'Show predictions'}</Typography>} 
              />
            </Toolbar>
          </AppBar>
          <div
            ref={chartContainerRef}
            style={{
              width: "97%",
              height: "93%",
              margin:'1%',
            }}
          ></div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartComponent;
