// React & CSS Imports
import "./Search.css";
import { useState } from "react";

// Functionality && Tools Imports
import encodeUrlStr from "../../utils/encodeUrlStr";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  Button,
  Divider,
  InputBase,
  Typography,
  IconButton,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import NavLang from "../NavLang/NavLang";
import Legend from "../Legend/Legend.jsx";
import TabContext from "@mui/lab/TabContext";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  let displayLangInfo = false;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState("language");

  const sites = useSelector((store) => store.viewReducer.sitesReducer);

  // Check if all visible sites are the same language
  if (
    sites.length === 1 ||
    (sites.length > 0 &&
      sites.filter((site) => sites[0].language === site.language).length ===
        sites.length)
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
    dispatch({ type: "SET_LIST_DEFAULT" })
    dispatch({ type: "FETCH_ALL" });
    setSearchText("");
  };

  //set active tab, and clear searchText when tab changes
  const changeTab = (e, newValue) => {
    setChecked(newValue);
    setSearchText("");
  };

  const onEnterPress = (e) => {
    if (e.charCode === 13) {
      submitSearch();
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        height: 2 / 2,
        textAlign: "center",
        backgroundColor: "background.main",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <TabContext value={checked}>
              <Grid container>
                <Grid item xs={12} textAlign="left" sx={{ pl: 3 }}>
                  <Typography>Search By:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Tabs
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    value={checked}
                    onChange={changeTab}
                    variant="scrollable"
                    orientation="vertical"
                  >
                    <Tab value="site" label="Site" sx={{ fontSize: 12 }} />
                    <Tab value="region" label="Region" sx={{ fontSize: 12 }} />
                    <Tab
                      value="language"
                      label="Language"
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      value="category"
                      label="Category"
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Grid>
                <Grid item xs={8}>
                  <TabPanel value="site">
                    <Paper
                      sx={{
                        mt: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InputBase
                        value={searchText}
                        onChange={handleChange}
                        sx={{ ml: 1, flex: 1 }}
                        onKeyPress={onEnterPress}
                        placeholder="Search Sites"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>

                  <TabPanel value="region">
                    <Paper
                      sx={{
                        mt: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InputBase
                        onChange={handleChange}
                        value={searchText}
                        sx={{ ml: 1, flex: 1 }}
                        onKeyPress={onEnterPress}
                        placeholder="Search Regions"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>

                  <TabPanel value="language">
                    <Paper
                      sx={{
                        mt: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InputBase
                        value={searchText}
                        onChange={handleChange}
                        sx={{ ml: 1, flex: 1 }}
                        onKeyPress={onEnterPress}
                        placeholder="Search Languages"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>
                  <TabPanel value="category">
                    <Paper
                      sx={{
                        mt: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InputBase
                        onChange={handleChange}
                        value={searchText}
                        sx={{ ml: 1, flex: 1 }}
                        onKeyPress={onEnterPress}
                        placeholder="Search Categories"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>
                  <Button
                    sx={{
                      p: 1,
                      mb: 2,
                      color: "primary.dark",
                    }}
                    variant="outlined"
                    onClick={clearSearch}
                  >
                    Clear Search
                  </Button>
                </Grid>
              </Grid>
            </TabContext>

            <br />
            <Divider orientation="horizontal" />
            <br />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <br />
          {
            /* Replace Legend with single language info if 
            sites all share the same language */
            displayLangInfo ? (
              <NavLang site={sites[0]}></NavLang>
            ) : (
              <Legend></Legend>
            )
          }
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
