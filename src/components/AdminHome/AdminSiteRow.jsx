import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
    Stack,
    TextField
} from "@mui/material";


export default function AdminSiteRow({ regions, site, languages }) {

    //local state
    const [handleEditMode, setHandleEditMode] = useState(false)
    const [edit, setEdit] = useState(site)

    //hooks
    const dispatch = useDispatch();

    //toggles to edit view
    const toggleEditMode = () => {
        setHandleEditMode(!handleEditMode)
    };

    // activates PUT for this site ID
    const handleEdit = () => {
        console.log('New Edited thing', edit)
    }


    //DELETE for this site ID
    const handleDelete = () => {
        console.log("Delete", site.id);
        dispatch({
            type: 'DELETE_SITE',
            payload: site.id
        })
    };


    return (
        <>
            {!handleEditMode ?
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>{site.site_name}</TableCell>
                    <TableCell>{site.address}</TableCell>
                    <TableCell>
                        {/* Getting the name of a specific region from the sites included region id */}
                        {regions?.map((region) => {
                            console.log('==========>', region)
                            if (region.id === site.region_id) {
                                console.log('==================>', region.name)
                                return region.name;
                            }
                        })}
                    </TableCell>
                    <TableCell>
                        {/* Getting the name of a specific region from the sites included region id */}
                        {languages?.map((language) => {
                            if (language.id === site.language_id) {
                                console.log('==================>', language.language)
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
                            <Button variant="contained" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Stack>
                    </TableCell>
                </TableRow>

                :
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            value={site.site_name}
                            onChange={(event) =>
                                setEdit({ ...edit, site_name: event.target.value })}>

                        </TextField>
                    </TableCell>
                    <TableCell>
                          <TextField
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            value={site.address}
                            onChange={(event) =>
                                setEdit({ ...edit, address: event.target.value })}>

                        </TextField>
                    </TableCell>
                    <TableCell>
                        placeholder
                    </TableCell>
                    <TableCell>
                        placeholder
                    </TableCell>
                    <TableCell>
                        <Stack direction="row" spacing={1}>
                            <Button
                                sx={{ mr: 1 }}
                                variant="contained"
                                onClick={handleEdit}
                            >
                                Submit
                            </Button>
                            <Button variant="contained" onClick={toggleEditMode}>
                                Cancel
                            </Button>
                        </Stack>
                    </TableCell>
                </TableRow>
            }


        </>
    )
} //end AdminSiteRow