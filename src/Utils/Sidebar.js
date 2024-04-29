import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Sidebar = ({ clickedIcon, setClickedIcon }) => {
  return (
    <Grid
      item
      xs={2}
      style={{
        position: 'fixed',
        top: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="body1"
        style={{
          color: 'black',
          padding: '0 2% 20% 20%',
          marginRight: '60px',
          fontSize: '15px',
        }}
      >
        ABC Symbol
      </Typography>

      <Box style={{ paddingLeft: '20px', paddingBottom: '40%' }}>
        <Button
          onClick={() => setClickedIcon('summary')}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '12px',
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
          onClick={() => setClickedIcon('NewsInsight')}
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
            border: clickedIcon === 'NewsInsight' ? '2px solid black' : 'none',
          }}
        >
          <ContentPasteSearchIcon
            sx={{
              fontSize: '40px',
            }}
          />
          News & Insights
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
      <Box sx={{ paddingLeft: '20px', paddingTop: '80px' }}>
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