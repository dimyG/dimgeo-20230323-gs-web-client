// a function component that includes a search input
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { THEMES } from 'src/constants';
import {Container} from "@material-ui/core";
import TextToImageForm from "../textToImage/views/TextToImageForm";
import ImageGrid from "../textToImage/views/ImageGrid";
import Page from "../../components/Page";
import SearchForm from "./SearchForm";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
}));

const SearchInput = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);


    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setSearchResultsLoading(true);  // set loading state
      // call the search API
      // setSearchResultsLoading(false);  // unset loading state
    };

    return (
      <Page
        className={classes.root}
        title="Garments"
      >
        <Container maxWidth={false}>
          <SearchForm />
          {/*{images.length === 0 ? null : (*/}
          {/*  <ImageGrid />*/}
          {/*)}*/}
        </Container>
      </Page>
    );
}

export default SearchInput;
