import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../Utils/Header';
import Sidebar from '../Utils/Sidebar';
import Insight from '../Components/NewsComponent';
import ChartComponent from '../Components/ChartsComponent';
import { useCommodity } from '../Context/forecastContext';

const Home = () => {
  const [clickedIcon, setClickedIcon] = useState("Overview");
  const { selectedCommodity, setSelectedCommodity } = useCommodity();

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
      <Header />
      <Sidebar clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />
      <FormControl sx={{ position: "absolute", top: "10px", left: "40%", width: "20%" }}>
        <InputLabel sx={{ textAlign: "center" }} id="commodity-label">SELECT COMMODITY</InputLabel>
        <Select labelId="commodity-label" id="commodity" value={selectedCommodity} onChange={handleCommodityChange}>
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

export default Home;
