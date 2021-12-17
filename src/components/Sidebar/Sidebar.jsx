import Map from "../Map/Map";
import { Box } from "@mui/system";
import Search from "../Search/Search";
import NavInfo from "../NavInfo/NavInfo";
import { useSelector } from "react-redux";
import BottomNav from "../BottomNav/BottomNav";
import { Grid, Typography } from "@mui/material";
import NavExplorer from "../NavExplorer/NavExplorer";

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
  );
}

export default Sidebar;
