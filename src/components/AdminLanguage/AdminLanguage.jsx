// React-related Imports
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";

//components
import AdminLanguageRow from "./AdminLanguageRow";
import LanguageDialog from "./LanguageDialog";
import LanguageForm from "./LanguageForm";

function AdminLanguage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Grabbing the Languages data to parse through
  const languages = useSelector(
    (store) => store.adminReducer.adminLanguagesReducer
  );
  // The below 2 functions allow there to be multiple pages on the table.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

  //state and functions for form toggle view
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <Grid container sx={{ pt: 3 }}>
      <Grid item>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled'}}
        />
      {checked === true ? 
      <LanguageForm/> 
      :
      <Typography>ADD A NEW LANGUAGE </Typography>}
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <TableContainer sx={{ maxHeight: 675 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Glottocode</TableCell>
                <TableCell>Global Speakers</TableCell>
                <TableCell>SC Speakers</TableCell>
                <TableCell>Endonym</TableCell>
                <TableCell>Edit/Delete</TableCell>
              </TableRow>
            </TableHead>

            {languages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((language) => {
                return (
                  <TableBody key={language.id}>
                    <AdminLanguageRow language={language} />
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={languages.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default AdminLanguage;
