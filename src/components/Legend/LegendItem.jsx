import {
    Grid,
    Stack,
    Typography,
  } from "@mui/material";

function LegendItem({ text, languageClass }) {
    return (
    <Grid item xs={4}>
        <Stack direction="row" spacing={1}>
            <div className={languageClass} />
            <Typography>{text}</Typography>
        </Stack>
    </Grid>
    )
}

export default LegendItem;