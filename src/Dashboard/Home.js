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
import CryptoJS from "crypto-js";

const decryptData = (encryptedData, secretKey,setError) => {
  try {
    const cleanedEncryptedData = encryptedData.replace(/\s/g, "+");
    const bytes = CryptoJS.AES.decrypt(cleanedEncryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    setError("Error decrypting data");
  }
};


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
    const mainDomain = `${process.env.REACT_APP_HOME}`;
    setMainDomain(mainDomain);
    if (document.referrer.startsWith(mainDomain)) {
      const params = new URLSearchParams(window.location.search);
      const encryptedData = decodeURIComponent(params.get("data"));
      const secretKey = process.env.REACT_APP_SECRET_KEY;
      const decryptedData = decryptData(encryptedData.toString(), secretKey,setError);
      const clientEmail = decryptedData.email;
      const fetchUrl = `${process.env.REACT_APP_BACKEND_ENGINE}/get_user?userId=${encodeURIComponent(clientEmail)}`;

      const fetchData = async () => {
        try {
          const response = await fetch(fetchUrl);
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
