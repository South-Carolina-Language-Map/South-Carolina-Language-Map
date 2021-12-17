import Map from "../Map/Map";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Search from "../Search/Search";
import NavInfo from "../NavInfo/NavInfo";
import BottomNav from "../BottomNav/BottomNav";
import NavExplorer from "../NavExplorer/NavExplorer";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Sidebar() {
  //   const [currentView, setCurrentView] = useState(<Search />);
  let currentView;
  let currentViewHeaderText = "Info Page";
  const sideBarView = useSelector((store) => store.sideBarView);

  switch (sideBarView) {
    case "search":
      currentView = <Search />;
      break;
    case "explore":
      currentView = <NavExplorer />;
      break;
    case "info":
      currentView = <NavInfo />;
      break;
    default:
        currentView = <p>nick error</p>
    break;
  }

  function chooseSearch() {
    setCurrentView(<Search />);
    currentViewHeaderText = "Search Page";
  }

  function chooseInfo() {
    return (
      (setCurrentView = <NavInfo />), (currentViewHeaderText = "Info Page")
    );
  }

  function chooseExplore() {
    return (
      (setCurrentView = <NavExplorer />),
      (currentViewHeaderText = "Explore Page")
    );
  }

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Box label="componentsContainer">
            <Box>
              <Typography
                variant="h4"
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "primary.light",
                }}
              >
                {currentViewHeaderText}
              </Typography>
            </Box>
            {currentView}
            <BottomNav />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}

export default Sidebar;
