import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Order } from './order';
import { AuthContext } from '../../context/Context';
import OrderCard from './OrderCard';


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

export default function OrdersScene() {
  const classes = useStyles();
  const context = useContext(AuthContext)
  const [orders, setOrders] = useState([] as Order[]);
  const bull = <span className={classes.bullet}>•</span>;
 

  useEffect( () => {
       fetch(`http://localhost:8080/order/user/${context.user?.id}`).then(res=>{
           if (res.status !== 200){
               throw new Error('Error fetching data')
           }
           return res.json()
        }).then(products=>{
           setOrders(products as Order[])
           console.log(products)
       }).catch(e=>{
           console.log(e.message)
       });

  }, [])

 

  return (
    <div>
        <h1>Your Orders</h1>
        {orders.map(order=>{
            return <OrderCard {...order}/>
        })}
    </div>
  );
}
