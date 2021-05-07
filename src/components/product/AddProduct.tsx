import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProduct() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const ProductNameOnChange = (e: any) => {
    setName(e.target.value);
  };
  const [price, setPrice] = useState("");
  const priceOnChange = (e: any) => {
    setPrice(e.target.value);
  };
  const [description, setDescription] = useState("");
  const descriptionOnChange = (e: any) => {
    setDescription(e.target.value);
  };

  const [type, setType] = useState("");
  const addProduct = async (e: any) => {
    e.preventDefault();
    await postData("http://localhost:8080/product", {
      name,
      type,
      description,
      price,
    }).then((user) => {
      console.log(user);
    });
  };

  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} onSubmit={addProduct}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="ProductName"
                variant="outlined"
                required
                fullWidth
                id="PName"
                label="Product Name"
                autoFocus
                onChange={ProductNameOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                name="price"
                label="Price"
                id="price"
                autoComplete="price"
                onChange={priceOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="type"
                label="type"
                id="type"
                autoComplete="Type"
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="description"
                onChange={descriptionOnChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Product
          </Button>
        </form>
      </div>
    </Container>
  );
}
