import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Warehouse } from './Warehouse';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom:25
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  
});


export default function WarehouseCard(warehouse:Warehouse) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;



  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       
        <Typography variant="h5" component="h2">
          {warehouse.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {warehouse.address}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ID: {warehouse.id}
        </Typography>
      </CardContent>
    </Card>
  );
}
