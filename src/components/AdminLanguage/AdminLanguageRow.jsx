import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Button, TableRow, TableCell } from "@mui/material";

//local files
import EditLanguage from "./EditLanguage";



export default function AdminLanguageRow({ language }) {
  //hooks
  const dispatch = useDispatch();

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
      <TableCell>
        <Button sx={{ mr: 1 }} variant="contained" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
} //end AdminLanguageRow
