import Map from "../Map/Map.jsx";
import { Grid } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./GridView.css";

function GridView() {
  return (
    <Grid container direction="row-reverse">
      <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
        <Map />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <div className="sideBarContainer">
          <Sidebar />
        </div>
      </Grid>
    </Grid>
  );
}

export default GridView;
