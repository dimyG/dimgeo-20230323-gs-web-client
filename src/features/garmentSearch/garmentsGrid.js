import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Grid, makeStyles} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({}));

const Image = ({img_src, id, className, onClick, onHover}) => {
  return (
    <div className={`generated-images__image`}>
      <img
        id={id}
        src={img_src}
        alt="Generated Image"
        style={{ maxWidth: '100%', height: 'auto' }}
        onClick={onClick}
        onMouseEnter={onHover}
        className={className}
      />
    </div>
  );
}


const GarmentsGrid = (props) => {
  const classes = useStyles();
  const garments = props.garments;
  const isLoading = props.isLoading;
  // console.log("garments:", garments);

  const renderImages = () => {
    const renderedImages = [];
    for (let garment of garments) {
      // console.log("garment:", garment);
      const renderedImage = (
        <Grid item xs={12} sm={6} md={4} lg={3} key={garment.product_id}>
            <Image
              img_src={garment.images[0].s3_url}
              id={garment.product_id}
            />
        </Grid>
      );
      renderedImages.push(renderedImage);
    }
    return renderedImages;
  }

  const renderedImages = renderImages();

  return (
    <Box mt={3}>
      <Card id={'imageGrid-card'}>
        <CardContent className={classes.cardContent}>
          {isLoading
            ? <Grid container justify="center" alignItems="center" style={{ height: '100%' }}><CircularProgress /></Grid>
            : <Grid container spacing={2}>{renderedImages}</Grid>
          }
        </CardContent>
      </Card>
    </Box>
  );
};

export default GarmentsGrid;
