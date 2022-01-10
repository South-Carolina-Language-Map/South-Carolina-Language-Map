// React Imports
import * as  React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//local files
import AutoComplete from "../AutoComplete/AutoComplete";

// MUI Imports
import { Button, TableRow, TableCell, Stack, TextField, Snackbar, Alert } from "@mui/material";

export default function AdminSiteRow({ regions, site, languages }) {
  //Reducer set up for NewSite values for language and region ids
  const dropDownValues = useSelector(
    (store) => store.adminReducer.newSiteReducer
  );

  //local state
  const [edit, setEdit] = useState(site);
  const [handleEditMode, setHandleEditMode] = useState(false);
//Mui Snackbar
const [openEdit, setOpenEdit] = React.useState(false);
  //hooks
  const dispatch = useDispatch();

  //toggles to edit view
  const toggleEditMode = () => {
    setHandleEditMode(!handleEditMode);
  };

  // activates PUT for this site ID
  const handleEdit = () => {
    dispatch({
      type: "UPDATE_SITE",
      payload: {
        id: edit.id,
        address: edit.address,
        site_name: edit.site_name,
        region_id: dropDownValues.region_id || edit.region_id,
        language_id: dropDownValues.language_id || edit.language_id,
      },
    });
    setHandleEditMode(!handleEditMode);
    setOpenEdit(true)
  };

  //DELETE for this site ID
  const handleDelete = () => {
    dispatch({
      type: "DELETE_SITE",
      payload: site.id,
    });
  };

//closes snackbar
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenEdit(false);
}

  return (
    <>
      {!handleEditMode ? (
        //non-edit view
        <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell>{site.site_name}</TableCell>
          <TableCell>{site.address}</TableCell>
          <TableCell>
            {/* Getting the name of a specific region from the sites included region id */}
            {regions?.map((region) => {
              if (region.id === site.region_id) {
                return region.name;
              }
            })}
          </TableCell>
          <TableCell>
            {/* Getting the name of a specific region from the sites included region id */}
            {languages?.map((language) => {
              if (language.id === site.language_id) {
                return language.language;
              }
            })}
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                onClick={toggleEditMode}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      ) : (
        // edit view
        <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell>
            <TextField
              label="Standard"
              variant="standard"
              id="standard-basic"
              value={edit.site_name}
              onChange={(event) =>
                setEdit({ ...edit, site_name: event.target.value })
              }
              sx={{
                width: 200,
              }}
            ></TextField>
          </TableCell>

          <TableCell>
            <TextField
              label="Standard"
              variant="standard"
              id="standard-basic"
              value={edit.address}
              onChange={(event) =>
                setEdit({ ...edit, address: event.target.value })
              }
              sx={{
                width: 200,
              }}
            ></TextField>
          </TableCell>

          <TableCell>
            <AutoComplete table="region" />
          </TableCell>

          <TableCell>
            <AutoComplete table="language" />
          </TableCell>

          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button sx={{ mr: 1 }} variant="contained" onClick={handleEdit}>
                Submit
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={toggleEditMode}
              >
                Cancel
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      )}

      <Snackbar
        open={openEdit}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          "Success! {edit.site_name} has been updated."
        </Alert>
      </Snackbar>

    </>
  );
} //end AdminSiteRow
