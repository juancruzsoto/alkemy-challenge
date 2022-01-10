import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import homeStyle from "../assets/homeStyle";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { TOKEN_API, URL } from "../config";

const useStyles = makeStyles(homeStyle);

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box> */}
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Home(props) {
  const classes = useStyles();

  const [modalShow, setModalShow] = useState(false);
  const [heroesID, setHeroesID] = useState([]);
  const [infoCards, setInfoCards] = useState([]);
  const [teamStats, setTeamStats] = useState({
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  });

  const colorCard = {
    good: "#c8e6c9",
    bad: "#ffcdd2",
  };
  const colorPowerstats = {
    intelligence: "primary",
    strength: "inherit",
    speed: "warning",
    durability: "success",
    power: "error",
    combat: "secondary",
  };

  useEffect(() => {
    heroesID.map((ID) => {
      axios
        .get(URL + TOKEN_API + "/" + ID)
        .then((result) => {
          console.log(result);
          setInfoCards((infocurrent) =>
            infocurrent.concat({
              id: result.data.id,
              image: result.data.image.url,
              name: result.data.name,
              powerstats: result.data.powerstats,
              weight: result.data.appearance.weight[1],
              height: result.data.appearance.height[1],
              alias: result.data.biography.aliases,
              eyecolor: result.data.appearance["eye-color"],
              haircolor: result.data.appearance["hair-color"],
              base: result.data.work.base,
              alignment: result.data.biography.alignment,
            })
          );
        }) // Deberia ser 204 //result.status
        .catch((e) => {
          console.log("ERROR", e.message);
        });
    });
  }, []);

  useEffect(() => {
    if (infoCards.length === heroesID.length) {
      let sumStats = {
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0,
      };
      infoCards.map((Hero) => {
        Object.keys(Hero.powerstats).map((skill) => {
          console.log(Hero.powerstats[skill], teamStats[skill], skill);
          sumStats[skill] = sumStats[skill] + parseInt(Hero.powerstats[skill]);
        });
      });
      setTeamStats(sumStats);
    }
  }, [infoCards]);

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
          <Typography
            gutterBottom
            variant="h6"
            // style={{ textAlign: "center" }}
            className={classes.titleC}
          >
            Conforma tu equipo de Superhéroes {teamStats["strength"]}
          </Typography>
          {console.log(teamStats)}
          {console.log(infoCards)}
          {Object.keys(teamStats).map((skill) => {
            console.log(teamStats[skill]);
          })}
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
            <Paper variant="outlined" style={{ width: "90%" }}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                {infoCards.length > 0 &&
                  infoCards.map((Hero) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <Card
                          sx={{
                            display: "flex",
                            backgroundColor: colorCard[Hero.alignment],
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                            }}
                          >
                            <CardContent
                              sx={{ flex: "1 0 auto" }}
                              style={{ width: "100%" }}
                            >
                              <Typography component="div" variant="h5">
                                {Hero.name}
                              </Typography>

                              {Object.keys(Hero.powerstats).map((skill) => {
                                return (
                                  <>
                                    <Typography
                                      variant="subtitle2"
                                      color="text.secondary"
                                      component="div"
                                    >
                                      {skill.charAt(0).toUpperCase() +
                                        skill.slice(1)}
                                    </Typography>
                                    <Box sx={{ width: "100%" }}>
                                      <LinearProgressWithLabel
                                        value={
                                          Hero.powerstats[skill] > 0
                                            ? Hero.powerstats[skill]
                                            : 0
                                        }
                                        color={colorPowerstats[skill]}
                                      />
                                    </Box>
                                  </>
                                );
                              })}

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 1,
                                  pb: 1,
                                  marginTop: "10px",
                                }}
                              >
                                Ver detalle
                              </Box>
                            </CardContent>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: "95%" }}
                              src={Hero.image}
                              alt="Live from space album cover"
                              style={{ marginLeft: "auto" }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                {heroesID.length < 6 && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card
                      sx={{
                        display: "flex",
                        // backgroundColor: colorCard[Hero.alignment],
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          style={{ width: "100%" }}
                        >
                          <Typography
                            variant="h5"
                            style={{ width: "100%", justifyContent: "center" }}
                          >
                            Add a New Hero
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              pl: 1,
                              pb: 1,
                              marginTop: "10px",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              size="large"
                              style={{ fontSize: 100, width: "50%" }}
                            >
                              <AddCircleIcon
                                fontSize="inherit"
                                onClick={() => setModalShow(true)}
                              />
                            </IconButton>
                            <Skeleton
                              sx={{ bgcolor: "#bdbdbd", marginLeft: "auto" }}
                              variant="rectangular"
                              width="100%"
                              height={276}
                            />
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Paper>
            {/* <Paper variant="outlined" square /> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Modal
            open={modalShow}
            onClose={() => setModalShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Paper variant="outlined" style={{ width: "90%" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Paper>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
