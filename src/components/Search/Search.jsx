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
import Legend from "../Legend/Legend.jsx";

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState("language");
  let displayLangInfo = false;

  const sites = useSelector(store => store.viewReducer.sitesReducer);

  // Check if all visible sites are the same language
  if (sites.length === 1
    || (sites.length > 0 && 
      sites.filter(site =>
      sites[0].language === site.language).length === sites.length)
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

  const onEnterPress = (e) => {
    if(e.charCode === 13){
      submitSearch();
    }
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
                    onKeyPress={onEnterPress}
                  />
                  <IconButton onClick={submitSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TabPanel>

              <TabPanel value="region">
                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    onChange={handleChange}
                    value={searchText}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Regions"
                    onKeyPress={onEnterPress}
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
                    onKeyPress={onEnterPress}
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
                    value={searchText}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Categories"
                    onKeyPress={onEnterPress}
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
          {/* Replace Legend with single language info if 
            sites all share the same language
          */
          displayLangInfo ?
            <NavLang site={sites[0]}></NavLang>
            :
            <Legend></Legend>
          }

        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
