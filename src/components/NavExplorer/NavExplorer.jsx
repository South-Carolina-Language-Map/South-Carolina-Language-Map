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
  const listType = useSelector(store => store.viewReducer.listTypeReducer);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('name');
  const [prevState, setPrevState] = useState([{
    list: list,
    listType: listType || 'DEFAULT',
  }]);

  useEffect(() => {
    dispatch({type: 'SET_LIST_DEFAULT'});
  },[]);

  console.log('prevState:', prevState)

  return (
    <>
      {/* {prevState[0].listType !== 'DEFAULT' && <Button>Back</Button>} */}
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