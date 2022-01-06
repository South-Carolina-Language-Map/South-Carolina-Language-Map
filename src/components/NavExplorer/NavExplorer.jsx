import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import NavExploreItem from '../NavExploreItem/NavExploreItem';


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
    dispatch({ type: 'SET_LIST_DEFAULT' });
  }, []);

  console.log('prevState:', prevState)

  return (
    <>
      <Grid container spacing={2}>
        {list && list.map((listObj, i) => {
          return <NavExploreItem key={i} listObj={listObj}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            setPrevState={setPrevState} />
        })}
      </Grid>
    </>
  );
}

export default NavExplorer;