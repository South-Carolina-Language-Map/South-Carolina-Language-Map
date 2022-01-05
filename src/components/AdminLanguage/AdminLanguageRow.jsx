import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
} from "@mui/material";

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
            type: 'DELETE_LANGUAGE',
            payload: language.id
        })
    };


    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>{language.language}</TableCell>
                <TableCell>{language.glottocode}</TableCell>
                <TableCell>{language.global_speakers}</TableCell>
                <TableCell>{language.sc_speakers}</TableCell>
                <TableCell>{language.endonym}</TableCell>
                <TableCell>
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
} //end AdminLanguageRow