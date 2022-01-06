// React & CSS
import "./Search.css";
import { useState } from "react";

// Functionality && Tools imports
import { useDispatch } from "react-redux";
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

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState("language");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const submitSearch = () => {
    let payload = {};
    payload[checked] = searchText;
    dispatch({ type: "SUBMIT_QUERY", payload: encodeUrlStr(payload) });
  };

  const clearSearch = () => {
    dispatch({ type: "FETCH_ALL" });
    setSearchText("");
  };

  //set active tab, and clear searchText when tab changes
  const changeTab = (e, newValue) => {
    setChecked(newValue);
    setSearchText("");
  };

  return (
    <Box
      sx={{
        p: 1,
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
                      component="form"
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
                        placeholder="Search Sites"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>

                  <TabPanel value="region">
                    <Paper
                      component="form"
                      sx={{
                        mt: 5,
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
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>

                  <TabPanel value="language">
                    <Paper
                      component="form"
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
                        placeholder="Search Languages"
                      />
                      <IconButton onClick={submitSearch}>
                        <SearchIcon color="primary" />
                      </IconButton>
                    </Paper>
                  </TabPanel>
                  <TabPanel value="category">
                    <Paper
                      component="form"
                      sx={{
                        mt: 5,
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
          <Paper
            elevation={8}
            backgroundcolor="background.main"
            sx={{
              pt: 2,
              height: 2 / 2,
              textAlign: "center",
            }}
          >
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
                  <Typography>Varieties of English</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Search;
