import { Box } from "@mui/system";
import Search from "../Search/Search";
import NavInfo from "../NavInfo/NavInfo";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";
import NavExplorer from "../NavExplorer/NavExplorer";

import NavLang from "../NavLang/NavLang";

function Sidebar() {
  let currentView;
  let currentViewHeaderText = "Info Page";
  const sideBarView = useSelector((store) => store.sideBarView);

  switch (sideBarView) {
    case "search":
      currentView = <Search />;
      currentViewHeaderText = "Search";
      break;
    case "explore":
      currentView = <NavExplorer />;
      currentViewHeaderText = "Explore";
      break;
    case "info":
      currentView = <NavInfo />;
      currentViewHeaderText = "About";
      break;
    default:
      currentView = <p>There was an Error, please try again later</p>;
      break;
  }

  return (
    <Box sx={{ height: 2 / 2 }}>
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
      {/* {currentView} */}
      <NavLang />
      <BottomNav />
    </Box>
  );
}

export default Sidebar;
