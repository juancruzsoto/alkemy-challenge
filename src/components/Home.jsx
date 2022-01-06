import React from "react";
import { makeStyles } from "@mui/styles";
import homeStyle from "../assets/homeStyle";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
// import axios from "axios";

const useStyles = makeStyles(homeStyle);

export default function Home(props) {
  const classes = useStyles();

//   const [infoCards, setInfoCards] = useState({});
//   const IDS = [1, 4, 76, 73, 123, 62];

//   useEffect(() => {
//     IDS.map((ID) => {
//       axios
//         .get(
//           "https://superheroapi.com/api.php/" + "4402898499818694" + "/" + ID
//         )
//         .then((result) => {
//           console.log(result);
//         }) // Deberia ser 204 //result.status
//         .catch((e) => {
//           console.log("ERROR", e.message);
//         });
//     });
//   }, []);

  return (
    <div className={classes.container}>
      <Grid container spacing={3} justifyContent="center" alignItems="flex-end">
        <Grid item xs={12}>
          <Typography
            gutterBottom
            variant="h4"
            style={{ textAlign: "center" }}
            className={classes.title}
          >
            Conforma tu equipo de Superhéroes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                minHeight: "800px",
              },
            }}
          >
            <Paper variant="outlined">
              <Card sx={{ display: "flex", maxWidth:"30%" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      SpiderMan
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Powerstats
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                      Ver detalle
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: "50%" }}
                  src="https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/174.jpg"
                  alt="Live from space album cover"
                />
              </Card>
            </Paper>
            {/* <Paper variant="outlined" square /> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
