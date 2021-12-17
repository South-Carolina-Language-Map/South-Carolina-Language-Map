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
import { useDispatch } from "react-redux";
import encodeUrlStr from "../../utils/encodeUrlStr";
import { useState } from "react";

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const submitSearch = () => {
    dispatch({type: 'SUBMIT_QUERY', payload: encodeUrlStr({region: 'upstate', language: 'Cherokee'})})
  }
  return (
    <Box
      sx={{
        pr: 1,
        pl: 1,
        textAlign: "center",
      }}
    >
      <br />

      <FormControl sx={{ width: 2 / 2 }}>
        <TextField 
          id="search-with-sx" 
          label="Search" 
          variant="standard" 
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}/>
        <br />

        <Typography variant="body2" className="textLeft">
          Search by:
        </Typography>

        <RadioGroup>
          <Grid container>
            <Grid item xs={6}>
              <FormControlLabel value="Site" label="Site" control={<Radio />} />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="Language"
                label="Language"
                control={<Radio />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="Region"
                label="Region"
                control={<Radio />}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value="Category"
                label="Category"
                control={<Radio />}
              />
            </Grid>
          </Grid>
        </RadioGroup>
        <button onClick={submitSearch}>Search</button>
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

      <Paper elevation={8} sx={{ textAlign: "center", height:0.8/2 }}>
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
