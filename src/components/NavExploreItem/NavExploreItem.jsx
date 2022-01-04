import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';

function NavExploreItem({listObj}){
    const listType = useSelector(store => store.viewReducer.listTypeReducer);
    const dispatch = useDispatch();
    const lightTheme = createTheme({ palette: { mode: 'light' } });

    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      
        lineHeight: '60px',
      }));

    const handleClick = () => {
        switch(listType){
            case 'DEFAULT':
                switch(listObj.name){
                    case 'Categories':
                        dispatch({type: 'FETCH_CATEGORIES'});
                        break;
                    default:
                        console.log('EXPLORE CLICK ERR: NOT FOUND');
                }
            default:
                console.log('EXPLORE CLICK ERR: NO LISTTYPE');
        }
        console.log('clicked');
    }

    const setList = () => {
        let action = {};
        dispatch({ type: "FETCH_CATEGORIES"})
    }

    console.log(listObj);
    
    return <>
        {[lightTheme].map((theme, index) => (
          <Grid item xs={12} key={index}
          onClick={handleClick}>
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
                <Item> {listObj?.name} </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
    </>;
}

export default NavExploreItem;