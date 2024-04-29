import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled, alpha } from "@mui/material/styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ResetTvOutlined,
} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function NewsInsight() {
  const newsData = [
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Aiuiuupoioipi damage to buildings and infrastructure. Rescue teams are currently working to assist affected a",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Aiuiuupoioipi damage to buildings and infrastructure. Rescue teams are currently working to assist affected a",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    },
    {
      title: "Breaking News: Earthquake Hits California",
      details:
        "A strong earthquake measuring 7.2 on the Richter scale struck California early this morning. The epicenter was located near San Francisco, causing widespread damage to buildings and infrastructure. Rescue teams are currently working to assist affected areas.",
    },
    {
      title: "Tech Giant Releases New Smartphone Model",
      details:
        "The highly anticipated smartphone model from TechCorp was unveiled today, boasting cutting-edge features and enhanced performance. Early reviews praise its sleek design and advanced camera capabilities.",
    },
    {
      title: "Study Finds Link Between Sleep and Mental Health",
      details:
        "A recent study published in a leading medical journal suggests a strong correlation between sleep quality and mental health. Researchers found that individuals who consistently experience poor sleep are at higher risk of developing mental health disorders.",
    }
  ];

  const [openRow, setOpenRow] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("pizza");
  const [selectCommodity, setSelectCommodity]=useState("");


  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log(search);
  };
  const handleRowClick = (index) => {
    setOpenRow(index === openRow ? null : index);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_NEWS_URL}/${selectCommodity}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //       setData(jsonData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <TableContainer component={Paper} sx={{maxHeight:"500px",overflow:"auto", background:"red"}}>
        <Table
          style={{
            tableLayout: "fixed",
            width: "100%",
            fontWeight: "bold",
            textAlign: "left",
            backgroundColor: "#F0F0F0",
            position: "absolute",
            left: "10%",
            width: "88%",
            top: "15%",
          }}
        >
          
            <TableHead>
            
              <TableRow>
                <TableCell/>
                <TableCell sx={{  fontWeight: "bold" }}>
                  NEWS AND INSIGHTS
                </TableCell>
              </TableRow>
            </TableHead>
            <Box sx={{ maxHeight: "200vh",width:"200%",overflowY:"hidden", overflowX:"hidden" }}>
            
              {newsData
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow onClick={() => handleRowClick(index)}>
                      <TableCell >
                        {openRow === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "21px",
                          textAlign: "left",
                          position: "absolute",
                          left: "3%",
                          width:"90%",
                        }}
                      >
                      {item.title}
                        
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{width:"300%", position:"relative"}}>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0, width:"100%" }}
                        colSpan={2}
                      >
                        <Collapse
                          in={openRow === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ padding: 2, textAlign: "left" , width:"100%"}}
                          >
                            {item.details}
                          </Typography>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            
          </Box>
        </Table>
      </TableContainer>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          left:"5%",
          width: "82%",
          top: "92%",
          // background:"RED"
        }}
      >
        <div style={{padding:"5px",position:"absolute", left:"14%", right:"0%"}}>
          Page {page} of {Math.ceil(newsData.length / rowsPerPage)}
        </div>
        <IconButton
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
          style={{ position: "absolute", left: "15%" }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(newsData.length / rowsPerPage)}
          onClick={() => handleChangePage(page + 1)}
          style={{ position: "absolute", right: "8.5%" }}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </>
  );
}
