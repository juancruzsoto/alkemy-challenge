import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import homeStyle from "../assets/homeStyle";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import {TOKEN_API,URL} from "../config"

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

  const [heroesID, setHeroesID] = useState([]);
  const [infoCards, setInfoCards] = useState([]);
  const [teamStats,setTeamStats] = useState({
    "intelligence": 0,
    "strength": 0,
    "speed": 0,
    "durability": 0,
    "power": 0,
    "combat":0 
  });

  const colorCard = {
    "good": "#c8e6c9",
    "bad" : "#ffcdd2"
  }
  const colorPowerstats = {
    "intelligence": "primary",
    "strength": "inherit",
    "speed": "warning",
    "durability": "success",
    "power": "error",
    "combat":"secondary" 
  }

  useEffect(() => {
    heroesID.map((ID) => {
      axios
        .get(
          URL + TOKEN_API + "/" + ID
        )
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
              alignment: result.data.biography.alignment
            })
          );
        }) // Deberia ser 204 //result.status
        .catch((e) => {
          console.log("ERROR", e.message);
        });
    });
  }, []);

  useEffect(() => {
    infoCards.map((Hero) => {
      Object.keys(Hero.powerstats).map((skill) => {
      setTeamStats({...teamStats,skill:teamStats[skill]+Hero.powerstats[skill]})
      })
    })
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
          {Object.keys(teamStats).map((skill) => {
            console.log(teamStats[skill])
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
            <Paper variant="outlined" style={{width:"90%"}}>
              {infoCards.length > 0 && (
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  {infoCards.map((Hero) => {
                  return(<Grid item xs={12} md={6} lg={4} >
                  <Card sx={{ display: "flex", backgroundColor: colorCard[Hero.alignment]}}>
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
                                  value={Hero.powerstats[skill] > 0 ? Hero.powerstats[skill] : 0}
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
                </Grid>)
                  })}

                  
                </Grid>
              )}
            </Paper>
            {/* <Paper variant="outlined" square /> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
