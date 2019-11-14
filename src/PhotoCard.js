import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function PhotoCard(props) {
  return (
    <Card style={{ maxWidth: 345, marginRight: 10, marginTop: 10 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={props.photo.image}
          title={props.photo.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.photo.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
