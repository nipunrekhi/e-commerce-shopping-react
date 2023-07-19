import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useGetUserProfileQuery } from "../app/services/authService";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  AspectRatio,
  Discount,
  Login,
  Palette,
  PersonOffOutlined,
  ShoppingBag,
  ShoppingCart,
} from "@mui/icons-material";
import { logout } from "../app/store";
import { showCartItems } from "../features/cart/cartAction";
import { useEffect } from "react";

const drawerWidth = 240;

const MainContent = styled("div")(({ theme }) => ({
  marginLeft: drawerWidth,
  padding: theme.spacing(3),
}));

const Header = () => {
  const { data: userInfo } = useGetUserProfileQuery();
  const { cartItem } = useSelector((state) => state.cart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    setIsDrawerOpen(false);
    navigate("/login");
  };
  useEffect(() => {
    dispatch(showCartItems());
  }, [dispatch]);

  useEffect(() => {
    setCartItemCount(cartItem?.length);
  }, [cartItem?.length]);
  return (
    <div style={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, display: { sm: "block" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontFamily: "monospace" }}>
            Ecommerce Shopping
          </Typography>
          <Tooltip title="Cart">
            <IconButton
              onClick={() => navigate("/cart")}
              color="inherit"
              aria-label="open cart"
              edge="start"
              sx={{
                marginLeft: "auto",
                fontFamily: "monospace",
                mr: 2,
                display: { xs: "none", sm: "block" },
              }}>
              <ShoppingCart />
              {cartItemCount > 0 && (
                <span
                  className="cart-item-count"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "12px",
                    padding: "4px",
                    borderRadius: "50%",
                    position: "absolute",
                    width: "10px",
                    top: "-5px",
                    right: "-8px",
                  }}>
                  {cartItemCount}
                </span>
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              onClick={() => navigate("/profile")}
              color="inherit"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
              aria-label="open cart"
              edge="start">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Navbar
          </Typography>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => {
              navigate("/home");
              handleDrawerClose();
            }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/profile");
              handleDrawerClose();
            }}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/contactUs");
              handleDrawerClose();
            }}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
          {userInfo?.role == "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addProducts");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Add Products" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addCategory");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Add Category" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addSubCategory");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Add Subcategory" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addVariant");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <Palette />
              </ListItemIcon>
              <ListItemText primary="Add Variants" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addAttributes");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <AspectRatio />
              </ListItemIcon>
              <ListItemText primary="Add Attributes" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/addPromocode");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <Discount />
              </ListItemIcon>
              <ListItemText primary="Add Promocode" />
            </ListItem>
          )}
          {userInfo?.role === "Admin" && (
            <ListItem
              button
              onClick={() => {
                navigate("/showPromocode");
                handleDrawerClose();
              }}>
              <ListItemIcon>
                <Discount />
              </ListItemIcon>
              <ListItemText primary="Show Promocodes" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              navigate("/showCategoryPage");
              handleDrawerClose();
            }}>
            <ListItemIcon>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/cart");
              handleDrawerClose();
            }}>
            <ListItemIcon>
              {cartItemCount > 0 && (
                <span
                  className="cart-item-count"
                  style={{
                    color: "red",
                    fontSize: "18px",
                    borderRadius: "50%",
                    position: "absolute",
                    width: "10px",
                    top: "5px",
                    right: "78%",
                  }}>
                  {cartItemCount}
                </span>
              )}
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem>
            {userInfo ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
                sx={{ width: "fullWidth" }}>
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Login />}
                onClick={() => navigate("/login")}
                sx={{ width: "fullWidth" }}>
                Login
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>
      <MainContent>
        <Toolbar />
      </MainContent>
    </div>
  );
};

export default Header;
