import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


function Regions() {
    const chaBra = [
        {
            "id": 1,
            "name": "Native American"
        },
        {
            "id": 2,
            "name": "European"
        },
        {
            "id": 3,
            "name": "Asian"
        },
        {
            "id": 4,
            "name": "Middle East"
        },
        {
            "id": 5,
            "name": "Latino"
        },
        {
            "id": 6,
            "name": "Varieties of English"
        },
        {
            "id": 7,
            "name": "Sign Language"
        }
    ]
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    // const lightTheme = createTheme({ palette: { mode: 'light' } });

    return (<>

        <Grid container spacing={2}>
            {[darkTheme].map((theme, index) => (
                <Grid item xs={6} key={index}>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr 1fr' },
                                gap: 4,
                            }}
                        >
                            {[80, chaBra].map((elevation) => (
                                <Item key={elevation} elevation={elevation}>
                                    {`elevation=${elevation}`}
                                </Item>
                            ))}
                        </Box>
                    </ThemeProvider>
                </Grid>
            ))}
        </Grid>
    </>
    );
}

export default Regions