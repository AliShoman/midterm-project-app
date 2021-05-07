import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Product } from "./Product";
import ProductCard from "./ProductCard";
import { Order } from "../order/order";
import { AuthContext, RefreshProducts } from "../../context/Context";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
  const context = useContext(AuthContext)
  const [products, setProducts] = useState([] as Product[]);
  const [orders, setOrders] = useState([] as Order[]);
  const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    fetchProductsData();

  }, []);
  const fetchProductsData = ()=>{
    fetch("http://localhost:8080/product")
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .then((products) => {
      setProducts(products as Product[]);
      console.log(products);
    })
    .catch((e) => {
      console.log(e.message);
    });
  }

  const refreshProducts = ()=>{
    fetchProductsData();
  }

  return (
    <RefreshProducts.Provider
    value={{
        refresh:refreshProducts
    }}
  >
    <div>
      {products.map((product) => {
        return <ProductCard {...product} />;
      })}
    </div>
    </RefreshProducts.Provider>
  );
}
