import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '@/components/Sidebar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#808080',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
});

const quotes = [
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character. - Unknown",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
  // Add more quotes as needed
];

const IndexPage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Ensure the quote is only set on the client side
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />
        <Container>
          <Typography variant="h4" gutterBottom>Welcome to the TaskX</Typography>
          <Typography variant="h6" gutterBottom>
            {quote ? quote : quotes[0]}
          </Typography>
          {/* Other homepage content */}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default IndexPage;
