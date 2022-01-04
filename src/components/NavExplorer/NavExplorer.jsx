import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import NavExploreItem from '../NavExploreItem/NavExploreItem';
import { useEffect } from 'react';


function NavExplorer() {
  const list = useSelector(store => store.viewReducer.listReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'SET_LIST_DEFAULT'});
  },[]);

  return (
    <>
      <Grid container spacing={2}>
        {list && list.map((item, i) => {
          return <NavExploreItem key={i} label={item}/>
        })}
      </Grid>
    </>
  );
}

export default NavExplorer;