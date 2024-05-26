import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useCommodity } from "../Context/forecastContext";

const Insight = () => {
  const { selectedCommodity } = useCommodity();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_FORECAST_MANAGER;
        const response = await fetch(
          `${apiUrl}/get_news_by_commodity/${selectedCommodity}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    setSelectedNews(null)
  }, [selectedCommodity]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <div>Error: {error}</div>;

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const handleBackClick = () => {
    setSelectedNews(null);
  };

  return (
    <>
      <Container>
        {!selectedNews ? (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                position: "absolute",
                left: "10%",
                height: "fit-content",
                width: "90%",
                top: "12%",
              }}
            >
              {data
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((news) => (
                  <Grid
                    item
                    xs={12}
                    key={news.id}
                    onClick={() => handleNewsClick(news)}
                    style={{ cursor: "pointer" }}
                  >
                    <Paper
                      style={{
                        padding: 20,
                        background: "#F0F0F0",
                        position: "relative",
                        left: "0%",
                        top: "3%",
                      }}
                    >
                      <Typography>{news.title}</Typography>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                left: "5%",
                width: "82%",
                top: "92%",
              }}
            >
              <div
                style={{
                  padding: "5px",
                  position: "absolute",
                  left: "14%",
                  right: "0%",
                  fontWeight: "bold",
                }}
              >
                Page {page} of {Math.ceil(data.length / rowsPerPage)}
              </div>
              <IconButton
                disabled={page === 1}
                onClick={() => handleChangePage(page - 1)}
                style={{ position: "absolute", left: "15%" }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                disabled={page >= Math.ceil(data.length / rowsPerPage)}
                onClick={() => handleChangePage(page + 1)}
                style={{ position: "absolute", right: "8.5%" }}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </>
        ) : (
          <Box style={{ padding: 16 }}>
            <Paper
              style={{
                padding: 16,
                width: "80%",
                height: "70%",
                position: "absolute",
                top: "15%",
                left: "12%",
                background: "#F0F0F0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "inherit",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginBottom: "4%",
                }}
              >
                {selectedNews.title}
              </Typography>
              <Typography
                sx={{
                  flexGrow: 1,
                  fontWeight: "400",
                  fontSize: "1rem",
                  fontStyle: "inherit",
                  overflowY: "auto",
                  border: "1px solid black",
                  padding: "1%",
                }}
              >
                {selectedNews.description}
              </Typography>
            </Paper>
            <Button
              onClick={handleBackClick}
              style={{
                cursor: "pointer",
                color: "white",
                background: "black",
                padding: "1%",
                width: "10%",
                position: "fixed",
                bottom: "1%",
                left: "46%",
                right: "0%",
                zIndex: 1000,
              }}
            >
              Back
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Insight;
