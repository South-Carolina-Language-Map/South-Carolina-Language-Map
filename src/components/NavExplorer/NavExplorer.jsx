import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import NavExploreItem from '../NavExploreItem/NavExploreItem';
import { useEffect, useState } from 'react';


function NavExplorer() {
  const list = useSelector(store => store.viewReducer.listReducer);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('name');
  const [prevState, setPrevState] = useState([]);

  useEffect(() => {
    dispatch({type: 'SET_LIST_DEFAULT'});
  },[]);

  console.log('prevState:' prevState)

  return (
    <>
      {prevState.length > 0 && <Button>Back</Button>}
      <Grid container spacing={2}>
        {list && list.map((listObj, i) => {
          return <NavExploreItem key={i} listObj={listObj} 
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          setPrevState={setPrevState}/>
        })}
      </Grid>
    </>
  );
}

export default NavExplorer;