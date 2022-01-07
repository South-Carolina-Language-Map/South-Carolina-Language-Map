import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Grid, Typography } from "@mui/material";

// Local Imports
import NavLang from "../NavLang/NavLang.jsx";
import NavExploreItem from "../NavExploreItem/NavExploreItem";

// Local Imports
// import NavExploreItem from "../NavExploreItem/NavExploreItem";

function NavExplorer() {
  const list = useSelector((store) => store.viewReducer.listReducer);
  const listType = useSelector((store) => store.viewReducer.listTypeReducer);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("name");
  const [prevState, setPrevState] = useState([
    {
      list: list,
      listType: listType || "DEFAULT",
    },
  ]);

  const sites = useSelector((store) => store.viewReducer.sitesReducer);
  let displayLangInfo;
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

  console.log("prevState:", prevState);

  return (
    // {prevState[0].listType !== 'DEFAULT' && <Button>Back</Button>}
    <Grid container sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ p: 0.5 }}>
          Explore By:
        </Typography>
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
