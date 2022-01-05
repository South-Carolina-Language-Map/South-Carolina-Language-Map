import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
} from "@mui/material";

export default function AdminCategoryRow({ row }) {

    //hooks
    const dispatch = useDispatch();

    // function to edit this category
    const handleEdit = () => {
        console.log("Edit", row.id);
    };

    
    //function to delete this row assocaited with ID
    const handleDelete = () => {
        console.log("Delete", row.id);
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: row.id
        })
    };

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row" align="center">
                    {row.name}
                </TableCell>
                <TableCell align="center">
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>

        </>
    )
}//end adminCategoryRow