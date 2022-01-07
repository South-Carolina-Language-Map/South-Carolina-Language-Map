import {
    Grid,
    Stack,
    Paper,
    Typography,
  } from "@mui/material";

function Legend(){
    return (
        <Paper elevation={8} sx={{ textAlign: "center", height: 2 / 2 }}>
              <Typography variant="h5">Language Catagories</Typography>

              <br />

              <Grid container spacing={2} rowSpacing={6} sx={{ pr: 1, pl: 1 }}>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-asian" />
                    <Typography>Asian</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-latino" />
                    <Typography>Latino</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-european" />
                    <Typography>European</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-middle-east" />
                    <Typography>Middle East</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-sign-language" />
                    <Typography>Sign Language</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack direction="row">
                    <div className="lang-native-american" />{" "}
                    <Typography>Native American</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <div className="lang-varieties-of-english" />
                    <Typography>
                      Varieties of <br /> English
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
    )
}

export default Legend;