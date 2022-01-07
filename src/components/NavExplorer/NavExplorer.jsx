// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Box, Grid, Typography } from "@mui/material";
import NavExploreItem from "../NavExploreItem/NavExploreItem";

// Local Imports
import NavExploreItem from "../NavExploreItem/NavExploreItem";

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

  useEffect(() => {
    dispatch({ type: "SET_LIST_DEFAULT" });
  }, []);

  console.log("prevState:", prevState);

  return (
    // {prevState[0].listType !== 'DEFAULT' && <Button>Back</Button>}
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ p: 0.5 }}>
          Explore By:
        </Typography>
      </Grid>
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
  );
}

export default NavExplorer;
