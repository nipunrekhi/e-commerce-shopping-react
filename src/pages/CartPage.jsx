import * as React from "react";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
} from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementItem,
  deleteItem,
  incrementItem,
  showCartItems,
} from "../features/cart/cartAction";
import { Email, LocalMall } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../app/services/authService";
import { useState } from "react";
import { signInAsGuest } from "../features/auth/authAction";
import Error from "../components/error";

const CartItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  animation: `${fadeIn} 0.5s ease-in`,
}));
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const EmptyCartMessage = styled(Box)`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const CenteredTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  height: "50vh",
  animation: `${fadeIn} 1s ease-in`,
}));
const ShoppingCartPage = () => {
  const { cartItem, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.cart
  );
  const [cartItems, setCartItems] = useState([]);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [isGuestSuccess, setIsGuestSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);
  const { data } = useGetUserProfileQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setCartItems(cartItem);
    if (isSuccess && isGuestSuccess) {
      navigate("/checkout");
    }
    if (isError) {
      setError(errorMessage);
      setErrorKey((prev) => prev + 1);
    }
  }, [cartItem, isSuccess, isGuestSuccess, isError]);
  useEffect(() => {
    dispatch(showCartItems());
  }, [dispatch]);
  const handleIncrement = (itemId) => {
    dispatch(incrementItem(itemId));
  };
  const handleDecrement = (itemId) => {
    dispatch(decrementItem(itemId));
  };
  const handleRemove = (itemId) => {
    dispatch(deleteItem(itemId));
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item?.price || 0; // Update the property access
      const quantity = item?.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleProceedToBuy = () => {
    if (!data) {
      setIsGuestModalOpen(true); // Open the guest login/signup modal
      const orderDetails = {
        cartItems: cartItems,
        totalPrice: getTotalPrice(),
        // Add other relevant order details here
      };
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      return;
    }
    const orderDetails = {
      cartItems: cartItems,
      totalPrice: getTotalPrice(),
      // Add other relevant order details here
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/checkout"); // Navigate to the checkout page
  };

  const handleGuestModalClose = () => {
    setIsGuestModalOpen(false);
  };
  const handleOpenLoginModal = () => {
    navigate("/login");
  };
  const handleGuestLogin = () => {
    if (!data) {
      dispatch(signInAsGuest({ guestEmail, guestPassword })).then((res) => {
        if (res.payload.error) {
          setIsGuestSuccess(false);
          setError(res.payload.error);
          setErrorKey((prev) => prev + 1);
        } else {
          setIsGuestSuccess(true);
        }
      });
    }
  };
  

  return (
    <Box p={2}>
      <Typography
        sx={{ fontFamily: "inherit" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Shopping Cart
      </Typography>
      {cartItems?.length > 0 ? (
        <List>
          {cartItems.map((item, index) => (
            <React.Fragment key={item._id}>
              <CartItem>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <ListItemAvatar>
                      <Avatar
                        alt={item?.name}
                        src={`http://localhost:8089/${item?.image.slice(8)}`}
                      />
                    </ListItemAvatar>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <ListItemText
                      primary={item?.name}
                      secondary={`Price: Rs ${item?.price}`}
                    />
                    {item?.attribute?.size && (
                      <ListItemText
                        secondary={`Size: ${item?.attribute?.size}`}
                      />
                    )}
                    {item?.variant?.color && (
                      <ListItemText
                        secondary={`Color: ${item?.variant?.color}`}
                      />
                    )}
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <ListItemSecondaryAction>
                      <div
                        className="container"
                        style={{
                          border: "solid 1px",
                          borderRadius: "28px",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item>
                            <IconButton
                              edge="end"
                              sx={{ color: "green" }}
                              onClick={() => handleIncrement(item._id)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <Typography
                              sx={{ marginTop: "8px", marginLeft: "3px" }}
                              variant="body1"
                            >
                              <strong>{item.quantity}</strong>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton
                              sx={{ color: "violet" }}
                              edge="end"
                              onClick={() => handleDecrement(item._id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Grid>

                          <Grid item>
                            <IconButton
                              sx={{ color: "red", marginRight: "2px" }}
                              edge="end"
                              onClick={() => handleRemove(item._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </div>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </CartItem>
              <Divider />
            </React.Fragment>
          ))}
          <CartItem>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6">
                  Total Price: Rs {getTotalPrice().toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CartItem>
          <Button
            onClick={handleProceedToBuy}
            startIcon={<LocalMall />}
            variant="contained"
            color="warning"
            sx={{
              marginLeft: { xs: "auto", sm: "auto" },
              marginRight: { xs: "auto", sm: 2 },
              fontFamily: "monospace",
              display: "block",
              width: { xs: "100%", sm: "18%" },
              color: "white",
              border: "solid 1px",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "green",
              },
              "&:focus": {
                outline: "none",
              },
              "&:active": {
                backgroundColor: "dark",
              },
            }}
          >
            Proceed To Buy
          </Button>
          <Dialog open={isGuestModalOpen} onClose={handleGuestModalClose}>
            {error && <Error key={errorKey} message={error} />}
            <DialogTitle>Sign in as a guest or login</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Please sign in as a guest or login to proceed.
              </Typography>
              <TextField
                label="Email"
                type="email"
                name="guestEmail"
                value={guestEmail}
                onChange={(event) => setGuestEmail(event.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                name="guestPassword"
                value={guestPassword}
                onChange={(event) => setGuestPassword(event.target.value)}
                fullWidth
                margin="normal"
              />
              <Button onClick={handleGuestLogin}>Sign in as Guest</Button>
              <Button onClick={handleOpenLoginModal}>Login</Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleGuestModalClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </List>
      ) : (
        <Box>
          <EmptyCartMessage>
            <CenteredTypography variant="body1">
              Your cart is empty.
            </CenteredTypography>
          </EmptyCartMessage>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCartPage;
