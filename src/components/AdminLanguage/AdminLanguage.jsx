// React-related Imports
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Box,
  Grid,
  Table,
  Switch,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from "@mui/material";

//components
import AdminLanguageRow from "./AdminLanguageRow";
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
    <Grid container sx={{ p: 3 }}>
      {/*  */}
      {checked ? (
        <Grid item xs={12} sx={{ pb: 2 }}>
          {checked && (
            <Box textAlign="right">
              <Button
                sx={{ mb: 2 }}
                variant="outlined"
                onClick={() => {
                  setChecked(!checked);
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
          <LanguageForm />
        </Grid>
      ) : (
        <Grid item xs={7} sx={{ pb: 2 }}>
          <Typography variant="h3" textAlign="right">
            All Languages
          </Typography>
        </Grid>
      )}
      {/*  */}
      <Grid item xs={5} sx={{ textAlign: "right" }}>
        {!checked && (
          <Button
            variant="contained"
            onClick={() => {
              setChecked(!checked);
            }}
          >
            Add Language
          </Button>
        )}
      </Grid>
      {/*  */}
      <Grid item xs={12} textAlign="center">
        {checked ? <Typography variant="h3">All Languages</Typography> : <></>}
      </Grid>
      {/*  */}
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: 675 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Glottocode</TableCell>
                <TableCell>Global Speakers</TableCell>
                <TableCell>SC Speakers</TableCell>
                <TableCell>Endonym</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Example Description</TableCell>
                <TableCell>HyperLink to Example</TableCell>
                <TableCell align="center">Edit/Delete</TableCell>
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
      {/*  */}
    </Grid>
  );
}

export default AdminLanguage;
