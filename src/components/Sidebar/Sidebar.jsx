import { Box } from "@mui/system";
import Search from "../Search/Search";
import NavInfo from "../NavInfo/NavInfo";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";
import NavExplorer from "../NavExplorer/NavExplorer";

function Sidebar() {
  let currentView;
  let currentViewHeaderText = "Info Page";
  const sideBarView = useSelector((store) => store.sideBarView);


  // Render the sidebar contents based on selected lower nav tab
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
      <Box  style={{ maxHeight: 650, overflow: "auto" }}>
        {currentView}
      </Box>
      <BottomNav />
    </Box>
  );
}

export default Sidebar;

// className="scroll"