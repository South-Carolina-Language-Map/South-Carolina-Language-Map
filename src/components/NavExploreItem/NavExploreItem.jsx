import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import encodeUrlStr from '../../utils/encodeUrlStr';

// Render a menu item based on the object being passed
//  activeKey is used to target specifically named attributes (e.g. site_name instead of name
//  when the next list is rendered.
function NavExploreItem({listObj, activeKey, setActiveKey, setPrevState}){
    const listType = useSelector(store => store.viewReducer.listTypeReducer);
    const dispatch = useDispatch();
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    
    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      
        lineHeight: '60px',
      }));

    //Conditionally handle clicks depending on the context of
    //  What kind of items are being mapped into the list
    const handleClick = () => {
      let queryObj;
        switch(listType){
            // Handle clicks on the default submenu (categories, regions, sites, languages)
            case 'DEFAULT':
                switch(listObj[activeKey]){
                    case 'Categories':
                        dispatch({type: 'FETCH_CATEGORIES'});
                        break;
                    case 'Regions':
                        dispatch({type: 'FETCH_REGIONS'})
                        break;
                    case 'Sites':
                        setActiveKey('site_name');
                        dispatch({type: 'FETCH_EXPLORE_SITES'});
                        dispatch({type: 'SET_TYPE', payload: 'SITES'});
                        break;
                    case 'Languages':
                        setActiveKey('language');
                        dispatch({type: 'FETCH_LANGUAGES'});
                        dispatch({type: 'SET_TYPE', payload: 'LANGUAGES'})
                    default:
                        console.log('EXPLORE CLICK ERR: NOT FOUND');
                }
                break;
            case 'LANGUAGES':
                queryObj = {language: listObj.language}
                dispatch({type: 'SUBMIT_QUERY', payload: encodeUrlStr(queryObj)});
                break;
            case 'SITES':
              queryObj = {site: listObj.site_name}
              dispatch({type: 'SUBMIT_QUERY', payload: encodeUrlStr(queryObj)});
              break;
            default:
                console.log('EXPLORE CLICK ERR: NO LISTTYPE');
        }
        console.log('clicked');
        console.log('listObj', listObj);
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
                <Item> {listObj[activeKey]} </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
    </>;
}

export default NavExploreItem;