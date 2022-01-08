import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LegendItem from "./LegendItem";

function Legend() {
  return (
    <Paper elevation={8} sx={{ textAlign: "center", height: 2 / 2 }}>
      <Typography variant="h5">Language Categories</Typography>

      <br />

      <Grid container spacing={2} rowSpacing={6} sx={{ pr: 1, pl: 1 }}>
        <LegendItem text="Asian" languageClass="lang-asian" />
        <LegendItem text="Latino" languageClass="lang-latino" />
        <LegendItem text="European" languageClass="lang-european" />
        <LegendItem text="Middle East" languageClass="lang-middle-east" />
        <LegendItem text="Sign Language" languageClass="lang-sign-language" />
        <LegendItem text="Native American" languageClass="lang-native-american" />
        
          <Grid item xs={4} />
        <LegendItem text={"Varieties of\nEnglish"} languageClass="lang-varieties-of-english" />
      </Grid>
    </Paper>
  )
}

export default Legend;