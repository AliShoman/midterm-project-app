import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Order } from './order';

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


export default function OrderCard(order:Order) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;



  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       
        <Typography variant="h5" component="h2">
          ID: {order.id}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <strong>Date of Creation:</strong> {new Date(order.orderDate).toTimeString()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Username :{order.user.name}
        </Typography>
        <Typography variant="body2" component="p">
          {order.totalPrice}
        </Typography>
      </CardContent>
    </Card>
  );
}
