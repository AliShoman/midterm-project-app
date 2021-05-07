import React, { useContext } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { isContext } from "node:vm";
import { AuthContext } from "../../context/Context";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddProduct from "../product/AddProduct";
import ProductCard from "../product/ProductCard";
import ProductsScene from "../product/ProductsScene";
import WarehouseScene from "../warehouse/WarehouseScene";
import OrdersScene from "../order/OrderScene";
import OpenOrder from "../order/OpenOrder";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    listItem: {
      textDecoration: "none",
      fontSize: "1rem",
      fontFamily: "Roboto",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      color: "black",
    },
  })
);

export default function DrawerLayout() {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            E-Commerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/home" className={classes.listItem}>
            <ListItem button key={"home"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/open-order" className={classes.listItem}>
            <ListItem button key={"open-order"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Open Order"} />
            </ListItem>
          </Link>
          <Link to="/orders" className={classes.listItem}>
            <ListItem button key={"orders"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Shopping Cart"} />
            </ListItem>
          </Link>
          <Link to="/add-product" className={classes.listItem}>
            <ListItem button key={"add-product"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Add Product"} />
            </ListItem>
          </Link>
          <Link to="/products" className={classes.listItem}>
            <ListItem button key={"products"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItem>
          </Link>
          <Link to="/warehouses" className={classes.listItem}>
            <ListItem button key={"warehouses"}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={"Warehouses"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button key={"sign-out"}>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary={"SignOut"} onClick={context.signOut} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path={"/home"}>
            <h1>Welcome To our Page</h1>
             <h2>Done By: <br/>
             Ali Shoman 1171204 <br />
             Batool Samoudi 1180231 <br />
             Amal Mashni 1171022 <br />
             Elham Anqawi 1171831 <br />
             Dalal Sarah 1171055 <br />
             </h2>
          </Route>
          <Route path={"/open-order"}>
            <OpenOrder />
          </Route>
          <Route path={"/cart"}>
            <h1>My Orders</h1>
          </Route>
          <Route path={"/profile"}>
            <h1>Profile</h1>
          </Route>
          <Route path={"/add-product"}>
            <AddProduct />
          </Route>
          <Route path={"/orders"}>
            <OrdersScene />
          </Route>
          <Route path={"/products"}>
            <ProductsScene />
          </Route>
          <Route path={"/warehouses"}>
            <WarehouseScene />
          </Route>
          <Route path={["/", ""]} exact={true}>
            <Redirect to={"/home"} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
