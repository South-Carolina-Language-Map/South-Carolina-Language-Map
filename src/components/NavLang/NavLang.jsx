// MUI Imports
import { Grid, Paper, Typography } from "@mui/material";

function NavLang({ site }) {
  let currentLanguage = site;

  return (
    <Grid container>
      {/* Start of overall Grid container */}
      <Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
        <Paper elevation={5} sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ pt: 2 }}>
            {currentLanguage.language}
          </Typography>
          <Typography variant="body1">
            Endonym: {currentLanguage.endonym}
          </Typography>
          {/* Start of nested Grid container */}
          <Grid container sx={{ p: 2 }}>
            <Grid item xs={5}>
              <Typography>
                Global Speakers: {currentLanguage.global_speakers}
              </Typography>
            </Grid>
            {/* End of nested Grid item #1 */}
            <Grid item xs={2}>
              <Typography>l</Typography>
            </Grid>
            {/* End of nested Grid item #2 */}
            <Grid item xs={5}>
              <Typography>
                SC Speakers: {currentLanguage.sc_speakers}
              </Typography>
            </Grid>
            {/* End of nested Grid item #3 */}
          </Grid>
          {/* End of nested Grid */}
          {currentLanguage.description && (
            <Typography sx={{ p: 1 }}>
              Description: {currentLanguage.description}
            </Typography>
          )}
          <br />
          <Grid container sx={{ p: 1 }}>
            {/* Start of nested Grid #2 */}
            <Grid item xs={6}>
              <Typography>Status: {currentLanguage.status}</Typography>
            </Grid>
            {/* End of nested Grid #2 item #1  */}
            <Grid item xs={6}>
              <Typography>Glottocode: {currentLanguage.glottocode}</Typography>
            </Grid>
            {/* End of nested Grid #2 item #2  */}
          </Grid>
          {/* End of nested Grid #2 */}
        </Paper>
      </Grid>
      {/* End of Grid item #1 */}
    </Grid>
  );
}

export default NavLang;
