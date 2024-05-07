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
  const { selectedCommodity, setSelectedCommodity } = useCommodity();
  const [forecastingCommodities, setForecastingCommodities] = useState([]);
  const [error, setError] = useState(null);
  const [unauthorized, setUnauthorized] = useState(null);
  const [mainDomain, setMainDomain] = useState(null);

  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
  };

  useEffect(() => {
    const mainDomain = `${process.env.REACT_APP_MAIN_DOMAIN}`;
    setMainDomain(mainDomain);
    if (document.referrer.startsWith(mainDomain)) {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const email = params.get("email");
          const response = await fetch(
            `${process.env.REACT_APP_URL}?userId=${email}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          const extractedCommodities = [];
          for (const key in data) {
            if (data[key].moduleName.includes("forecasting")) {
              const commodity = key.split("#").pop();
              extractedCommodities.push(commodity);
            }
          }
          setForecastingCommodities(extractedCommodities);
        } catch (error) {
          setError("Error fetching data. Please try again later.");
        }
      };

      fetchData();
    } else {
      setUnauthorized("Unauthorized - Access denied.");
    }
  }, []);

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
              top: "10px",
              left: "40%",
              width: "20%",
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
