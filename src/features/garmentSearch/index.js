import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, IconButton} from "@material-ui/core";
import GarmentsGrid from "./garmentsGrid";
import Page from "../../components/Page";
import SearchForm from "./SearchForm";
import {useSelector} from "react-redux";
import {garmentsSelector, garmentsSlice, isLoadingSelector, querySelector, defaultQuery} from "./garmentsSlice";
import axios from "axios";
import {messagesSlice} from "../Messages/messagesSlice";
import {ArrowBack, ArrowForward} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import urls from "src/urls";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const SearchInput = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const garments = useSelector(state => garmentsSelector(state));
    const isLoading = useSelector(state => isLoadingSelector(state));
    const query = useSelector(state => querySelector(state));
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;
    const default_limit = 20;
    const searchUrl = urls.garments.search;

    const searchRequest = async ({query = defaultQuery, skip = 0, limit = default_limit} = {}) => {
      dispatch(garmentsSlice.actions.setIsLoading(true));

      let config = {
        params: {
          query: query,
          skip: skip,
          limit: limit,
        }
      }

      try{
        const searchResponse = await axios.get(searchUrl, config);
        let garments = searchResponse.data;
        if (garments.length === 0) {
          const msgText = `Oops, we are out of ${query}!`;
          dispatch(messagesSlice.actions.addMessage({text: msgText, mode: "info", seen: false}));
        } else {
          dispatch(garmentsSlice.actions.setGarments(garments));
        }
        // console.debug("garments:", garments);
      } catch (e) {
        console.error(`Error: ${e}`);
        const msgText = `Oops, please try again...`;
        dispatch(messagesSlice.actions.addMessage({text: msgText, mode: "error", seen: false}));
      }
      dispatch(garmentsSlice.actions.setIsLoading(false));
    }

    const handlePageChange = async (action) => {
      // setCurrentPage updates the currentPage asynchronously, so the new value is not available immediately
      // for this reason we use a new (non state) variable, and update the currentPage state at the end
      let newPage = currentPage;
      if (action === 'next') {
        newPage += 1;
      } else if (action === 'prev' && currentPage > 1) {
        newPage -= 1;
      }
      const skip = (newPage - 1) * limit;  // if we are in page 3 we want to skip 2 pages, so 2 * 20
      await searchRequest({query, skip, limit});
      setCurrentPage(newPage)
    };

    const Pagination = () => {
      return (
        <div className={classes.pagination}>
          <IconButton onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={() => handlePageChange('next')}>
            <ArrowForward />
          </IconButton>
        </div>
      )}

    return (
      <Page
        className={classes.root}
        title="Garments"
      >
        <Container maxWidth={false}>
          <SearchForm onSubmit={searchRequest}/>
            <GarmentsGrid garments={garments} isLoading={isLoading}/>
            <Pagination />
        </Container>
      </Page>
    );
}

export default SearchInput;
