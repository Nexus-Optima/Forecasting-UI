import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Header from "../Utils/Header";
import Sidebar from "../Utils/Sidebar";
import Insight from "../Components/NewsComponent";
import ChartComponent from "../Components/ChartsComponent";
import { useCommodity } from "../Context/forecastContext";


const Home = () => {
  const [clickedIcon, setClickedIcon] = useState("Overview");
  const { selectedCommodity, setSelectedCommodity, forecastingCommodities, error, setError, unauthorized, setUnauthorized, mainDomain } = useCommodity();


  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
  };

  const renderContent = () => {
    switch (clickedIcon) {
      case "Insight":
        return <Insight />;
      default:
        return <ChartComponent />;
    }
  };

  return (
    <>
      {unauthorized ? (
        <>
          <Typography variant="h5" color="error" style={{ paddingTop: "5%" }}>
            {unauthorized}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "2%",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => (window.location.href = mainDomain)}
          >
            Go back to dashboard
          </Button>
        </>
      ) : (
        <>
          <Header />
          <Sidebar clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />
          <FormControl
            sx={{
              position: "absolute",
              top: "2%",
              left: "40%",
              width: "20%",
            }}
          >
            <InputLabel id="commodity-label">
              SELECT COMMODITY
            </InputLabel>
            <Select
              labelId="commodity-label"
              id="commodity"
              value={selectedCommodity}
              label="SELECT COMMODITY"
              onChange={handleCommodityChange}
            >
              {forecastingCommodities.map((commodity, index) => (
                <MenuItem key={index} value={commodity}>
                  {commodity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error ? (
            <Typography variant="h5" color="error" style={{ paddingTop: "2%" }}>
              {error}
            </Typography>
          ) : (
            renderContent()
          )}
        </>
      )}
    </>
  );
};

export default Home;
