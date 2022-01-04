import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,

  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });



function NavExplorer() {

  const dispatch = useDispatch();
  const skateSpot = useSelector((store) => store.userSkateReducer);

  useEffect(() => {
    dispatch({ type: 'SET_LIST' });
  }, []);
  
  return (
    <>
      <Grid container spacing={2}>
        {[lightTheme].map((theme, index) => (
          <Grid item xs={12} key={index}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gap: 2,
                  elevation: 3
                }}
              >
                {/* this is where we would map  */}
                <Item> test </Item>

              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NavExplorer;