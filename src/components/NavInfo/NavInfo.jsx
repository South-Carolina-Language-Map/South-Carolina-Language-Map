import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

function NavInfo() {
  const history = useHistory();
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={1}>
        <Box sx={{ p: 1, pt: 1 }}>
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="body1" sx={{ p: 1 }}>
            To the South Carolina Language Map, a linguistic interactive map of
            the state. This map is focused on sites for indigenous, minority,
            endangered languages and will continue to be updated. This
            application was created as a group effort from five students at
            Prime Digital Academy in conjunction with Stephen Davis who provided
            all linguistic data. We hope you enjoy exploring this application as
            much as we did creating it!
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ p: 1 }}>
          <Typography variant="h4">Site usage guide:</Typography>
          <ul>
            <li>
              Communication of thoughts and feelings through a system of
              arbitrary signals, such as voice sounds, gestures, or written
              symbols.
            </li>
            <li>
              Such a system including its rules for combining its components,
              such as words.
            </li>
            <li>
              Such a system as used by a nation, people, or other distinct
              community; often contrasted with dialect.
            </li>
          </ul>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Button
          // xs={{ pl: 100 }}
          variant="contained"
          onClick={() => history.push("/admin")}
        >
          Admin
        </Button>
      </Grid>
    </Grid>
  );
}

export default NavInfo;
