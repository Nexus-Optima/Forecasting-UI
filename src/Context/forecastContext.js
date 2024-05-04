import React, { createContext, useContext, useState } from 'react';


export const ForecastContext = createContext();

export const CommodityProvider = ({children}) => {
    const [selectedCommodity, setSelectedCommodity]=useState("cotton");
    return (
    <ForecastContext.Provider value={{selectedCommodity, setSelectedCommodity}}>
        {children}
    </ForecastContext.Provider>
    );
};
export const useCommodity = () => useContext(ForecastContext)