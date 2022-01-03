import "./Search.css";
import { useState } from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import TabContext from "@mui/lab/TabContext";
import encodeUrlStr from "../../utils/encodeUrlStr";
import SearchIcon from "@mui/icons-material/Search";
import {
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

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState('language');

  const submitSearch = () => {
    let payload = {};
    payload[checked] = searchText;
    dispatch({type: 'SUBMIT_QUERY', payload: encodeUrlStr(payload)});
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
            <TabContext value={value}>
              <Tabs value={value} onChange={handleChange}>
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
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Regions"
                  />
                  <IconButton>
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
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Languages"
                  />
                  <IconButton>
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
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Categories"
                  />
                  <IconButton>
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
            >
              Clear Search
            </Button>

            <br />
            <Divider orientation="horizontal" />
            <br />
          </Box>
        </Grid>

        <Grid item xs={12}>
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
