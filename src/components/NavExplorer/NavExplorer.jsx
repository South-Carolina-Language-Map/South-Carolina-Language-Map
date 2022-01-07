import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import NavExploreItem from '../NavExploreItem/NavExploreItem';
import NavLang from '../NavLang/NavLang.jsx';


function NavExplorer() {
  const list = useSelector(store => store.viewReducer.listReducer);
  const listType = useSelector(store => store.viewReducer.listTypeReducer);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('name');
  const [prevState, setPrevState] = useState([{
    list: list,
    listType: listType || 'DEFAULT',
  }]);

  const sites = useSelector(store => store.viewReducer.sitesReducer);
  let displayLangInfo;
  // Check if all visible sites are the same language
  if (sites.length === 1
    || (sites.length > 0 && 
      sites.filter(site =>
      sites[0].language === site.language).length === sites.length)
  ) {
    displayLangInfo = true;
  }

  useEffect(() => {
    dispatch({type: 'SET_LIST_DEFAULT'});
  },[]);

  console.log('prevState:', prevState)

  return (
    <>
      {displayLangInfo &&
        <NavLang site={sites[0]}></NavLang>
      }
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