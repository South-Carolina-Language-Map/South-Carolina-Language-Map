import "./Search.css";
import Map from "../Map/Map";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import {
  Paper,
  Radio,
  Button,
  Divider,
  TextField,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  return (
      <Box
        sx={{
          textAlign: "center",
          width: 500,
        }}
      >
        <Typography
          variant="h4"
          sx={{ backgroundColor: "primary.light", p: 2 }}
        >
          Search and Display Sites
        </Typography>
        <br />

        <FormControl sx={{ pr: 1, pl: 1 }}>
          <TextField id="search-with-sx" label="Search" variant="standard" />

          <br />

          <Typography variant="body2" className="textLeft">
            Search by:
          </Typography>

          <RadioGroup>
            <Stack direction="row" spacing={2}>
              <FormControlLabel value="Site" label="Site" control={<Radio />} />
              <FormControlLabel
                value="Language"
                label="Language"
                control={<Radio />}
              />
              <FormControlLabel
                value="Region"
                label="Region"
                control={<Radio />}
              />
              <FormControlLabel
                value="Category"
                label="Category"
                control={<Radio />}
              />
            </Stack>
          </RadioGroup>
          <br />
          <Button
            sx={{
              color: "primary.dark",
            }}
          >
            Clear Search
          </Button>

          <br />
          <Divider orientation="horizontal" />
          <br />
        </FormControl>

        <Paper elevation={8} sx={{ textAlign: "center" }}>
          <Typography variant="h5">Language Catagories</Typography>

          <br />

          <Grid container spacing={2} rowSpacing={4} sx={{ pr: 1, pl: 1 }}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <div className="lang-asian" />
                <Typography>Asian</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <div className="lang-latino" />
                <Typography>Latino</Typography>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <div className="lang-european" />
                <Typography>European</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <div className="lang-middle-east" />
                <Typography>Middle East</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <div className="lang-sign-language" />
                <Typography>Sign Language</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <div className="lang-native-american" />{" "}
                <Typography>Native American</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={5}>
              <Stack direction="row" spacing={1}>
                <div className="lang-varieties-of-english" />
                <Typography>
                  Varieties of <br /> English
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
  );
}

export default Search;
