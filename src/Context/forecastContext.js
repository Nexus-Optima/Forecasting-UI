import React, { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from "crypto-js";


export const ForecastContext = createContext();

export const CommodityProvider = ({children}) => {
    const [selectedCommodity, setSelectedCommodity]=useState('');
    const [mainDomain, setMainDomain] = useState(null);
    const [forecastingCommodities, setForecastingCommodities]= useState([])
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(null);

    const decryptData = (encryptedData, secretKey) => {
        try {
          const cleanedEncryptedData = encryptedData.replace(/\s/g, "+");
          const bytes = CryptoJS.AES.decrypt(cleanedEncryptedData, secretKey);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          return JSON.parse(decryptedData);
        } catch (error) {
            setError("Error decrypting data");
        }
      };

    useEffect(() => {
        const mainDomain = `${process.env.REACT_APP_HOME}`;
        setMainDomain(mainDomain);
        if (document.referrer.startsWith(mainDomain)) {
          const params = new URLSearchParams(window.location.search);
          const encryptedData = decodeURIComponent(params.get("data"));
          const secretKey = process.env.REACT_APP_SECRET_KEY;
          const decryptedData = decryptData(encryptedData.toString(), secretKey);
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
              setSelectedCommodity(extractedCommodities[0]);
              setForecastingCommodities(extractedCommodities)
            } catch (error) {
                setError("Error fetching data. Please try again later.");
            }
          };
          fetchData();
        } else {
          setUnauthorized("Unauthorized - Access denied.");
        }
      }, []);


    return (
    <ForecastContext.Provider value={{selectedCommodity, setSelectedCommodity, forecastingCommodities, error, setError, unauthorized, setUnauthorized, mainDomain}}>
        {children}
    </ForecastContext.Provider>
    );
};
export const useCommodity = () => useContext(ForecastContext)