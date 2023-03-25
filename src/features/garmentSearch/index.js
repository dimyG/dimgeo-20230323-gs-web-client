import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Container} from "@material-ui/core";
import GarmentsGrid from "./garmentsGrid";
import Page from "../../components/Page";
import SearchForm from "./SearchForm";
import {useSelector} from "react-redux";
import {garmentsSelector} from "./garmentsSlice";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const SearchInput = () => {
    const classes = useStyles();
    const garments = useSelector(state => garmentsSelector(state));

    return (
      <Page
        className={classes.root}
        title="Garments"
      >
        <Container maxWidth={false}>
          <SearchForm />
          {garments.length === 0 ? null : (
            <GarmentsGrid garments={garments}/>
          )}
        </Container>
      </Page>
    );
}

export default SearchInput;
