import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid} from "@material-ui/core";
import GarmentsGrid from "./garmentsGrid";
import Page from "../../components/Page";
import SearchForm from "./SearchForm";
import {useSelector} from "react-redux";
import {garmentsSelector, isLoadingSelector} from "./garmentsSlice";


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
    const isLoading = useSelector(state => isLoadingSelector(state));

    return (
      <Page
        className={classes.root}
        title="Garments"
      >
        <Container maxWidth={false}>
          <SearchForm />
            <GarmentsGrid garments={garments} isLoading={isLoading}/>
        </Container>
      </Page>
    );
}

export default SearchInput;
