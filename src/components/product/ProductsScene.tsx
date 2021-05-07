import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from './Product';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function ProductsScene() {
  const classes = useStyles();
  const [products, setProducts] = useState([] as Product[]);
  const bull = <span className={classes.bullet}>•</span>;
 

  useEffect( () => {
       fetch('http://localhost:8080/product').then(res=>{
           if (res.status !== 200){
               throw new Error('Error fetching data')
           }
           return res.json()
        }).then(products=>{
           setProducts(products as Product[])
           console.log(products)
       }).catch(e=>{
           console.log(e.message)
       });

  }, [])

 

  return (
    <div>
        {products.map(product=>{
            return <ProductCard {...product}/>
        })}
    </div>
  );
}
