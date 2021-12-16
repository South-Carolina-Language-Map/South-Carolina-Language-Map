import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useDispatch, useSelector } from "react-redux";

function BottomNav() {
  const dispatch = useDispatch();
  //   const [value, setValue] = React.useState(0);
  let value = 0;
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
      //   onChange={(event, newValue) => {
      //     setValue(newValue);
      //   }}
      sx={{ border: 1 }}
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
