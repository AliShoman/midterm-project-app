import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from './Product';
import './ProductCard.css'

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


export default function ProductCard(product:Product) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;



  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       
        <Typography variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {product.type}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="body2" component="p">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={'addToCart'}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
