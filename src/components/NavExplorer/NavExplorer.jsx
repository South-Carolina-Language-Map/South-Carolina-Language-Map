import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Grid, Button, Typography } from "@mui/material";

// Local Imports
import NavLang from "../NavLang/NavLang.jsx";
import NavExploreItem from "../NavExploreItem/NavExploreItem";

function NavExplorer() {
  let displayLangInfo;
  const list = useSelector((store) => store.viewReducer.listReducer);
  const sites = useSelector((store) => store.viewReducer.sitesReducer);
  const listType = useSelector((store) => store.viewReducer.listTypeReducer);
  const dispatch = useDispatch();
  
  //shared amongst children to accurately retrieve list item info
  const [activeKey, setActiveKey] = useState("name");
  const [prevState, setPrevState] = useState([
    {
      list: list,
      listType: listType || "DEFAULT",
    },
  ]);

  // Check if all visible sites are the same language
  if (
    sites.length === 1 ||
    (sites.length > 0 &&
      sites.filter((site) => sites[0].language === site.language).length ===
        sites.length)
  ) {
    displayLangInfo = true;
  }

  useEffect(() => {
    dispatch({ type: "SET_LIST_DEFAULT" });
  }, []);

  console.log(list);

  return (
    // {prevState[0].listType !== 'DEFAULT' && <Button>Back</Button>}
    <Grid container sx={{ p: 1 }}>
      <Grid item xs={6}>
        <Typography variant="h5" sx={{ p: 0.5 }}>
          Explore By:
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ p: 0.69 }}
        textAlign="right"
        onClick={() => {
          dispatch({ type: "FETCH_ALL" })
          // dispatch({ type: "SET_LIST_DEFAULT" });
          dispatch({ type: "EXPLORE_TOGGLE" });
        }}
      >
        <Button color="error" size="small" variant="outlined">
          Reset
        </Button>
      </Grid>
      {displayLangInfo && <NavLang site={sites[0]}></NavLang>}
      <Grid container spacing={2}>
        {list &&
          list.map((listObj, i) => {
            return (
              <NavExploreItem
                key={i}
                listObj={listObj}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
                setPrevState={setPrevState}
              />
            );
          })}
      </Grid>
    </Grid>
  );
}

export default NavExplorer;
