import * as  React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Button, TableRow, TableCell, Stack } from "@mui/material";

//local files
import EditLanguage from "./EditLanguage";




export default function AdminLanguageRow({ language }) {
  //hooks
  const dispatch = useDispatch();

  //local state
  const [toggleEditView, setToggleEditView] = useState(false)

  //toggles to edit view
    const handleEditView = () => {
        dispatch({
            type: 'SET_EDIT_LANGUAGE',
            payload: language
        })
        setToggleEditView(true)
    }

  // function handles edit for this ID
  const handleEdit = () => {
    console.log("Edit", language.id);
  };


  //function deletes this id
  const handleDelete = () => {
    console.log("Delete", language.id);
    dispatch({
      type: "DELETE_LANGUAGE",
      payload: language.id,
    });
  };

  // Grabbing the categories data to parse through
  const categories = useSelector(
    (store) => store.adminReducer.adminCategoriesReducer
  );

  return (
      <>
    { toggleEditView ?
        <TableRow hover role="checkbox" tabIndex={-1}>
        <EditLanguage language={language}/>
        <TableCell>
        <Stack direction="row" spacing={1}>
        <Button sx={{ mr: 1 }} variant="contained" onClick={handleEdit}>
          Submit
        </Button>
        <Button variant="outlined" color="error" onClick={() => setToggleEditView(false)}>
          Cancel
        </Button>
        </Stack>
      </TableCell>
        </TableRow>

        :
        
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{language.language}</TableCell>
      <TableCell>{language.glottocode}</TableCell>
      <TableCell>{language.global_speakers}</TableCell>
      <TableCell>{language.sc_speakers}</TableCell>
      <TableCell>{language.endonym}</TableCell>
      <TableCell>{language.description}</TableCell>
      <TableCell>
        {categories.map((category) => {
          if (language.category_id === category.id) {
            return category.name;
          }
        })}
      </TableCell>
      <TableCell>link_text</TableCell>
      <TableCell>hyperlink</TableCell>
      
      <TableCell>
      <Stack direction="row" spacing={1}>
        <Button sx={{ mr: 1 }} variant="contained" onClick={handleEditView}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
        </Stack>
      </TableCell>
      
    </TableRow>}
    </>
  );
} //end AdminLanguageRow
