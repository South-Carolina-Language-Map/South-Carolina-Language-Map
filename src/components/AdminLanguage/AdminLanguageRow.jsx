import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Button,
  TableRow,
  TableCell,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

//local files
import EditLanguage from "./EditLanguage";

export default function AdminLanguageRow({ language }) {
  //hooks
  const dispatch = useDispatch();

  //store to grab edited language
  const editLanguage = useSelector(
    (store) => store.adminReducer.adminEditReducer
  );
  //bring in category ID stored in reducer
  const category = useSelector(
    (store) => store.adminReducer.newLanguageCategoryIDReducer
  );

  //will need to pull in example store *****

  // Grabbing the categories data to parse through
  const categories = useSelector(
    (store) => store.adminReducer.adminCategoriesReducer
  );

  //Mui Snackbar
  const [openEdit, setOpenEdit] = React.useState(false);

  //local state
  const [toggleEditView, setToggleEditView] = useState(false);

  //object to send off edited language
  let newLanguage = {
    id: language.id,
    language: editLanguage.language,
    glottocode: editLanguage.glottocode,
    description: editLanguage.description,
    endonym: editLanguage.endonym,
    global_speakers: Number(editLanguage.global_speakers),
    sc_speakers: Number(editLanguage.sc_speakers),
    category_id: category === -1 ? language.category_id : category,
    status: editLanguage.status,
    language_id: language.id,
    link_text: editLanguage.link_text,
    hyperlink: editLanguage.hyperlink,
  };

  //toggles to edit view
  const handleEditView = () => {
    dispatch({
      type: "SET_EDIT_LANGUAGE",
      payload: language,
    });
    setToggleEditView(true);
  };

  // function handles edit for this ID
  const handleEdit = () => {
    dispatch({
      type: "UPDATE_LANGUAGE",
      payload: newLanguage,
    });
    //switch back to row view
    setToggleEditView(false);
    //snackbar
    setOpenEdit(true);
  };

  //function deletes this id
  const handleDelete = () => {
    dispatch({
      type: "DELETE_LANGUAGE",
      payload: language.id,
    });
  };

  //closes snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEdit(false);
  };

  return (
    <>
      {toggleEditView ? (
        <TableRow hover role="checkbox" tabIndex={-1}>
          <EditLanguage language={language} />
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button sx={{ mr: 1 }} variant="contained" onClick={handleEdit}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setToggleEditView(false)}
              >
                Cancel
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow sx={{ maxHeight: 5 }} hover role="checkbox" tabIndex={-1}>
          <TableCell>{language.language}</TableCell>
          <TableCell>{language.glottocode}</TableCell>
          <TableCell>{language.global_speakers}</TableCell>
          <TableCell>{language.sc_speakers}</TableCell>
          <TableCell>{language.endonym}</TableCell>
          <TableCell sx={{ minWidth: 400}}>
            {language.description}
          </TableCell>
          <TableCell sx={{ minWidth: 150}}>
            {categories.map((category) => {
              if (language.category_id === category.id) {
                return category.name;
              }
            })}
          </TableCell>
          <TableCell>{language.status}</TableCell>
          <TableCell>{language.link_text}</TableCell>
          <TableCell>{language.hyperlink}</TableCell>

          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                onClick={handleEditView}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
} //end AdminLanguageRow
