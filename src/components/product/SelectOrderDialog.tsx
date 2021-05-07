import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";
import { Order } from "../order/order";
import { AuthContext, RefreshProducts } from "../../context/Context";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Order|null;
  emails: Order[];
  onClose: (value: Order|null) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: Order|null) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Choose the Order for this Product</DialogTitle>
      <List>
        {props.emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email.id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`ID: ${email.id}`} />
          </ListItem>
        ))}
        {/* <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
}

interface PropsForAddTpCart{
    productId:number
}

export default function AddToCart(props:PropsForAddTpCart) {
  const [open, setOpen] = React.useState(false);
  const [orders,setOrders] = useState([] as Order[]);
  const context = useContext(AuthContext);
  const refreshProductsContext = useContext(RefreshProducts)
  const [selectedValue, setSelectedValue] = React.useState(
    null as Order | null
  );

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

  useEffect(() => {
    fetch(`http://localhost:8080/order/user/${context.user?.id}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Error fetching data");
      }
      return res.json();
    })
    .then((products) => {
      setOrders(products as Order[]);
      console.log(products);
    })
    .catch((e) => {
      console.log(e.message);
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: Order | null) => {
    setOpen(false);
    setSelectedValue(value);
    postData('http://localhost:8080/order/addProduct',{orderId:value?.id, productId:props.productId})
    .then(()=>{refreshProductsContext.refresh();})
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add to cart
      </Button>
      <SimpleDialog
        emails={orders}
        selectedValue={null}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
