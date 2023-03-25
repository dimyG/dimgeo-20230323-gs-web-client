import React from 'react';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Card, CardContent, FormHelperText, Grid, TextField, Typography} from "@material-ui/core";
import { useFormik } from 'formik';
import axios from 'axios';
import {messagesSlice} from "src/features/Messages/messagesSlice";
import {imagesSlice} from "../textToImage/imagesSlice";
import {garmentsSlice} from "./garmentsSlice";
import {useDispatch} from "react-redux";

// const garmentsServer = process.env.REACT_APP_GARMENTS_API_SERVICE;
const garmentsServer = 'http://localhost:8000/';
const searchUrl = garmentsServer + 'search/';
console.debug("searchUrl:", searchUrl)

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
    },
    whiteSpace: "nowrap",
    marginTop: theme.spacing(1),
  },
}));

const SearchForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = React.useState({query: "",});

  const searchRequest = async (query) => {
    let config = {
      params: {query: query}
    }

    try{
      const searchResponse = await axios.get(searchUrl, config);
      let garments = searchResponse.data;
      dispatch(garmentsSlice.actions.setGarments(garments));
      console.debug("garments:", garments);
    } catch (e) {
      console.error(`Error: ${e}`);
      const msgText = `Oops, please try again...`;
      dispatch(messagesSlice.actions.addMessage({text: msgText, mode: "error", seen: false}));
    }
  }

  const onFormSubmit = async (values) => {
    await searchRequest(values.query)
    // Set the initial form values to the current values
    setInitialValues({...values,});
  }

  const handleKeyDown = (event, callback) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent new line
      callback();
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // enable reinitialization of the form
    validationSchema: Yup.object().shape({
      query: Yup.string().max(255).required('A search term is required!'),
    }),
    validateOnBlur: false, // set this to false, to validate only on submit
    onSubmit: onFormSubmit,
  });

  return (
  <form onSubmit={formik.handleSubmit} noValidate>
    <Card id={'prompt-container'} >
      <CardContent >
        <Grid container direction="row" justify="space-between" alignItems="center">

          <Grid item xs={12} md={10}>
            <TextField
                  multiline
                  error={Boolean(formik.touched.query && formik.errors.query)}
                  fullWidth
                  helperText={formik.touched.query && formik.errors.query}
                  label="Search for a garment"
                  margin="normal"
                  name="query"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onKeyDown={(event) => handleKeyDown(event, formik.submitForm)}
                  type="text"
                  value={formik.values.query}
                  variant="outlined"
              />
                {formik.errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Box>
                )}
          </Grid>

          <Grid item xs={12} md={2}>
            <Box>
              <Button
                className={classes.button}
                fullWidth
                color="secondary"
                disabled={formik.isSubmitting}
                size="large"
                type="submit"
                variant="contained"
              >
                <Typography variant={"h3"}>Search</Typography>
              </Button>
            </Box>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  </form>
  );

}

export default SearchForm;
