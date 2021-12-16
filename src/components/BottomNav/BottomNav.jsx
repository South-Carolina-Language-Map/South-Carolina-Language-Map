import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

function BottomNav(chooseExplore, chooseInfo, chooseSearch) {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ border: 1 }}
    >
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        onClick={chooseSearch}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<ExploreIcon />}
        onClick={chooseExplore}
      />
      <BottomNavigationAction
        label="Info"
        icon={<InfoIcon />}
        onClick={chooseInfo}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
