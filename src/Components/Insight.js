import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { KeyboardArrowDown, KeyboardArrowUp, ArrowBack, ArrowForward } from '@mui/icons-material';
import { useCommodity } from '../Context/forecastContext';

const Insight = () => {
  const {selectedCommodity,setSelectedCommodity}= useCommodity()
  const [openRow, setOpenRow] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
            `http://127.0.0.1:5000/get_news_by_commodity/${selectedCommodity}`
          );
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
  }, [selectedCommodity]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <TableContainer component={Paper} sx={{maxHeight:"70%",overflow:"auto", background:"red"}}>
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
          <Box sx={{ maxHeight: "100vh",width:"200%",overflowY:"hidden", overflowX:"hidden" }}>
            {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowClick(index)}
                    >
                      {openRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell
                        style={{
                          padding: "21px",
                          textAlign: "left",
                          position: "absolute",
                          left: "3%",
                          width:"90%",
                          fontWeight:'bold'
                        }}
                      >
                      {item.title}
                        
                      </TableCell>
                  {/* <TableCell>
                    {openRow === index ? item.description : item.description.substring(0, 50) + '...'}
                  </TableCell> */}
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
                            {item.description}
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
        <div style={{padding:"5px",position:"absolute", left:"14%", right:"0%", fontWeight:'bold'}}>
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
  );
};

export default Insight;
