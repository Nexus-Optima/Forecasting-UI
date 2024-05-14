import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import logo from '../Images/abc_image.png'
const Sidebar = ({ clickedIcon, setClickedIcon }) => {
  return (
    <Grid
      item
      xs={2}
      style={{
        position: 'fixed',
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          padding: '0 1% 30%',
          width: '200px', // Adjust width as needed
          height: '100px', // Adjust height as needed
        }}
      />

      <Box style={{ paddingLeft: '5%', paddingBottom: '40%' }}>
        <Button
          onClick={() => setClickedIcon('summary')}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '10%',
            width: '60%',
            textTransform: 'none',
            fontSize: '15px',
            color: 'black',
            backgroundColor: 'transparent',
            border: clickedIcon === 'summary' ? '2px solid black' : 'none',
          }}
        >
          <SummarizeIcon
            sx={{
              fontSize: '40px',
            }}
          />
          Overview
        </Button>
        
        <Button
          onClick={() => setClickedIcon('Insight')}
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '60%',
            textTransform: 'none',
            fontSize: '15px',
            backgroundColor: 'transparent',
            border: clickedIcon === 'Insight' ? '2px solid black' : 'none',
          }}
        >
          <ContentPasteSearchIcon
            sx={{
              fontSize: '40px',
            }}
          />
          Insights
        </Button>
        {/* <Button
          onClick={() => setClickedIcon('HistoricalAnalysis')}
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '60%',
            textTransform: 'none',
            fontSize: '15px',
            backgroundColor: 'transparent',
            border: clickedIcon === 'HistoricalAnalysis' ? '2px solid black' : 'none',
          }}
        >
          <QueryStatsIcon
            sx={{
              fontSize: '40px',
            }}
          />
          Historical Analysis
        </Button> */}
      </Box>
      <Box sx={{ paddingLeft: '5%', marginTop:'100%' }}>
        <Button
          onClick={() => setClickedIcon('help')}
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '12px 0',
            width: '60%',
            textTransform: 'none',
            fontSize: '15px',
            backgroundColor: 'transparent',
            border: clickedIcon === 'help' ? '2px solid black' : 'none',
          }}
        >
          <HelpOutlineIcon
            sx={{
              fontSize: '40px',
            }}
          />
          Help
        </Button>
      </Box>
    </Grid>
  );
};

export default Sidebar;