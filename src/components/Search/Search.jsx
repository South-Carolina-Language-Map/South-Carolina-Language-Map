// React & CSS
import "./Search.css";
import { useState } from "react";

// Functionality && Tools imports
import { useDispatch, useSelector } from "react-redux";
import encodeUrlStr from "../../utils/encodeUrlStr";

// MUI Imports
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Stack,
  Paper,
  Button,
  Divider,
  InputBase,
  Typography,
  IconButton,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import SearchIcon from "@mui/icons-material/Search";
import NavLang from "../NavLang/NavLang";
import { display } from "@mui/system";

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState("language");
  let displayLangInfo = false;

  const sites = useSelector(store => store.viewReducer.sitesReducer);

  // Check if all visible sites are the same language
  if (sites.length === 1
    || sites.filter(site =>
      sites[0].language === site.language).length === sites.length
  ) {
    displayLangInfo = true;
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const submitSearch = () => {
    let payload = {};
    payload[checked] = searchText;
    dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(payload) });
  };

  const clearSearch = () => {
    dispatch({ type: 'FETCH_ALL' });
    setSearchText('');
  }

  //set active tab, and clear searchText when tab changes
  const changeTab = (e, newValue) => {
    setChecked(newValue);
    setSearchText('');
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

      <Grid container>
        <Grid item xs={12}>
          <Box>
            <TabContext value={checked}>
              <Tabs
                value={checked}
                onChange={changeTab}
              >
                <Tab value="site" label="Site" />
                <Tab value="region" label="Region" />
                <Tab value="language" label="Language" />
                <Tab value="category" label="Category" />
              </Tabs>

              <TabPanel value="site">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    value={searchText}
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Sites"
                  />
                  <IconButton onClick={submitSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TabPanel>

              <TabPanel value="region">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Regions"
                  />
                  <IconButton onClick={submitSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TabPanel>

              <TabPanel value="language">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    value={searchText}
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Languages"
                  />
                  <IconButton onClick={submitSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TabPanel>
              <TabPanel value="category">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    onChange={handleChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Categories"
                  />
                  <IconButton onClick={submitSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TabPanel>
            </TabContext>

            <br />
            <Button
              sx={{
                color: "primary.dark",
              }}
              onClick={clearSearch}
            >
              Clear Search
            </Button>

            <br />
            <Divider orientation="horizontal" />
            <br />
          </Box>
        </Grid>

        <Grid item xs={12}>
          {displayLangInfo && <NavLang language={sites[0].language}></NavLang>}
          <Paper elevation={8} sx={{ textAlign: "center", height: 2 / 2 }}>
            <Typography variant="h5">Language Catagories</Typography>

            <br />

            <Grid container spacing={2} rowSpacing={6} sx={{ pr: 1, pl: 1 }}>
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
              <Grid item xs={4}>
                <Stack direction="row" spacing={1}>
                  <div className="lang-varieties-of-english" />
                  <Typography>
                    Varieties of <br /> English
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
