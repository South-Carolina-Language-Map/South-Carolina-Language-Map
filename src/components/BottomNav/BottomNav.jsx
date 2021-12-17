import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useDispatch, useSelector } from "react-redux";

function BottomNav() {
  let value = 0;
  const dispatch = useDispatch();
  const sideBarView = useSelector((store) => store.sideBarView);
  switch (sideBarView) {
    case "search":
      value = 0;
      break;
    case "explore":
      value = 1;
      break;
    case "info":
      value = 2;
      break;
    default:
      console.log("error");
      break;
  }

  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{
        bottom: 0,
        width: 0.665 / 2,
        position: "fixed",
      }}
    >
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_VIEW", payload: "search" });
        }}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<ExploreIcon />}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_VIEW", payload: "explore" });
        }}
      />
      <BottomNavigationAction
        label="Info"
        icon={<InfoIcon />}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_VIEW", payload: "info" });
        }}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
