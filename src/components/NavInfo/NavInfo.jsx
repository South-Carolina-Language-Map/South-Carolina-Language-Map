// MUI imports
import { Box, Grid, Link, Typography } from "@mui/material";

function NavInfo() {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "background.main",
      }}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ p: 1, pt: 1 }}>
            <Typography variant="h4">Welcome!</Typography>
            <Typography variant="body1" sx={{ p: 1 }}>
              To the South Carolina Language Map, a linguistic interactive map
              of the state. This map is focused on sites for indigenous,
              minority, endangered languages and will continue to be updated.
              This application was created as a group effort from five students
              at Prime Digital Academy in conjunction with Stephen Davis who
              provided all linguistic data. We hope you enjoy exploring this
              application as much as we did creating it!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            If you are an administrator,{" "}
            <Link href={"/#/admin"}>Click here</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NavInfo;
