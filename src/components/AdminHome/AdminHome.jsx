import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AutoCompleteLanguage from "./AutoCompleteLanguage";
import AutoCompleteRegion from "./AutoCompleteRegion";
import Grid from "@mui/material/Grid";
import PublishIcon from "@mui/icons-material/Publish";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function AdminHome() {
  const dispatch = useDispatch();
  const sites = useSelector((store) => store.viewReducer.sitesReducer);
  const dropDownValues = useSelector((store) => store.adminReducer.newSiteReducer);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let base = {
    site_name: '',
    address: ''
  }
  let [newLocation, setLocation] = useState(base);

  const handleSubmit = (event) => {
    event.preventDefault();
    //sends over new object to saga/server to process and send to DB
    let newSite= {
      site_name: newLocation.site_name,
      address: newLocation.address,
      language_id: dropDownValues.language_id,
      region_id: dropDownValues.region_id,
    }
    console.log("newSite====================", newSite);
    dispatch({type: "ADD_SITE", payload: newSite})
  }


  useEffect(() => {
    dispatch({ type: "FETCH_ALL" });
  }, []);

  console.log("Drop down values", dropDownValues);

  return (
    <>
      <Typography>Add New Site</Typography>
      <Grid container spacing={.5}>
        <form
        onSubmit={handleSubmit}>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Site Name"
            variant="standard"
            helperText="ex. Raleigh"
            onChange={(event) => setLocation({...newLocation, site_name: event.target.value})}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="filled-required"
            label="Address"
            variant="standard"
            helperText="Address"
            onChange={(event) => setLocation({...newLocation, address: event.target.value})}
          />
        </Grid>
        <Grid item xs>
          <AutoCompleteRegion/>
        </Grid>
        <Grid item xs>
          <AutoCompleteLanguage />
          <Link>Don't see your language? Click here!</Link>
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
            Submit
          </Button>
        </Grid>
        </form>
      </Grid>
      
    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell
                  align="left"
                  style={{ minWidth: 170}}
                >
                  SiteName
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {sites.map((site) => {
                      const value = row[site.id];
                      return (
                        <TableCell key={site.id} align={site.align}>
                          {site.format && typeof value === 'number'
                            ? site.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper> */}
    </>
  );
}

export default AdminHome;

