// React imports
import { useSelector } from "react-redux";

// MUI Imports
import { Box, Typography } from "@mui/material";

// Local imports
import Search from "../Search/Search";
import NavInfo from "../NavInfo/NavInfo";
import BottomNav from "../BottomNav/BottomNav";
import NavExplorer from "../NavExplorer/NavExplorer";

function Sidebar() {
  let currentView;
  let currentViewHeaderText = "Info Page";
  const sideBarView = useSelector((store) => store.sideBarView);

  switch (sideBarView) {
    case "search":
      currentView = <Search />;
      currentViewHeaderText = "SEARCH";
      break;
    case "explore":
      currentView = <NavExplorer />;
      currentViewHeaderText = "EXPLORE";
      break;
    case "info":
      currentView = <NavInfo />;
      currentViewHeaderText = "ABOUT";
      break;
    default:
      currentView = <p>There was an Error, please try again later</p>;
      break;
  }

  return (
    <Box sx={{ height: 2 / 2, backgroundColor: "background.main" }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            p: 2,
            textAlign: "center",
            color: "background.main",
            backgroundColor: "primary.main",
          }}
        >
          {currentViewHeaderText}
        </Typography>
      </Box>
      <Box style={{ maxHeight: 650, overflow: "auto" }}>{currentView}</Box>
      <BottomNav />
    </Box>
  );
}

export default Sidebar;
