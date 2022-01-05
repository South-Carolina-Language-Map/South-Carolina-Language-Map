import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import NavExploreItem from '../NavExploreItem/NavExploreItem';



function NavExplorer() {
  const list = useSelector(store => store.viewReducer.listReducer);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('name');

  useEffect(() => {
    dispatch({type: 'SET_LIST_DEFAULT'});
  },[]);

  console.log(list);

  return (
    <>
      <Grid container spacing={2}>
        {list && list.map((listObj, i) => {
          return <NavExploreItem key={i} listObj={listObj} 
          activeKey={activeKey}
          setActiveKey={setActiveKey}/>
        })}
      </Grid>
    </>
  );
}

export default NavExplorer;