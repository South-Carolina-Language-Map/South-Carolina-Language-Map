import {
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import './LegendItem.css';

function LegendItem({ text, languageClass }) {
    return (
        <Grid item xs={6}>
            <div className="flex-container legend-container">
                <div className={languageClass + ' legend-dot'} />
                <div>{text}</div>
            </div>

        </Grid>
    )
}

export default LegendItem;