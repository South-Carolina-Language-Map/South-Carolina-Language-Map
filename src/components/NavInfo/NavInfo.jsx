import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

function NavInfo() {
  const history = useHistory();
  return (
    <Grid container rowSpacing={5}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={1}>
        <Box sx={{ p: 1, pt: 1 }}>
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="body2" sx={{ p: 1 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
