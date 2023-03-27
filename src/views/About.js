import React from "react";
import {Card, CardContent, CardHeader, Container, Divider, Link, makeStyles, Typography} from "@material-ui/core";
import Page from "../components/Page";
import {Link as RouterLink} from "react-router-dom"
import {minHeapId} from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
}));

const About = () => {
  const classes = useStyles()

  return (
    <Page className={classes.root}>
      <Container >
      <Card >
        {/*<CardHeader title="About"/>*/}
        <CardContent>
          <Typography align="justify">
            An awesome garments search project!
          </Typography>
        </CardContent>
      </Card>
      </Container>
    </Page>
  )
}

export default About
