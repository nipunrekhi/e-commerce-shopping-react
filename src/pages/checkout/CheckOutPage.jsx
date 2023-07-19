import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalMall, Person, RadioButtonChecked } from "@mui/icons-material";
import axios from "axios";
import { useGetUserProfileQuery } from "../../app/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { orderAddress } from "../../features/payment/paymentAction";
import { getIpAddress } from "../../features/auth/authAction";
import { useEffect } from "react";

const CheckOutPage = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const { ipAddress } = useSelector((state) => state.auth);
  const steps = ["Address", "Payment Method", "Place Order"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState({
    Name: "",
    "Mobile Number": "",
    "Flat/House no.": "",
    Address: "",
    City: "",
    "Postal Code": "",
  });
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [orderedProd, setOrderedProd] = React.useState("");
  const [ip, setIp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNext = () => {
    if (isAddressValid()) {
      if (activeStep === 0) {
        // Save the address to local storage
        localStorage.setItem("address", JSON.stringify(address));
        const orderaddress = {
          userId: data ? data.id : ip,
          fullName: address.Name,
          mobileNo: address["Mobile Number"],
          houseNo: address["Flat/House no."],
          address: address.Address,
          city: address.City,
          postalCode: address["Postal Code"],
        };
        dispatch(orderAddress(orderaddress));
      } else if (activeStep === 1) {
        // Save the payment method to local storage
        localStorage.setItem("paymentMethod", paymentMethod);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleAddressChange = (event) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [event.target.name]: event.target.value,
    }));
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  useEffect(() => {
    setIp(ipAddress);
  }, [ipAddress]);
  
  React.useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    const orderedProducts = localStorage.getItem("orderDetails");
    const storedPaymentMethod = localStorage.getItem("paymentMethod");
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
    if (orderedProducts) {
      setOrderedProd(JSON.parse(orderedProducts));
    }
    if (!data) {
      dispatch(getIpAddress());
    }
  }, []);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isAddressValid = () => {
    if (
      address.Name &&
      address["Mobile Number"] &&
      address["Flat/House no."] &&
      address.Address &&
      address.City &&
      address["Postal Code"]
    ) {
      return true; // Address is valid
    }
    return false; // Address is not valid
  };

  const handleCheckOut = (cartItems) => {
    axios
      .post("http://localhost:8089/create-checkout-session", {
        cartItems,
        userId: data.id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography
        sx={{ fontFamily: "inherit" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Proceed to checkout
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Box width="80%">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  value={address.Name}
                  name="Name"
                  onChange={handleAddressChange}
                  label="Full name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  value={address["Mobile Number"]}
                  name="Mobile Number"
                  onChange={handleAddressChange}
                  label="Mobile number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  value={address["Flat/House no."]}
                  name="Flat/House no."
                  onChange={handleAddressChange}
                  label="Flat/House no."
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="Address"
                  value={address.Address}
                  onChange={handleAddressChange}
                  label="Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  value={address.City}
                  name="City"
                  onChange={handleAddressChange}
                  label="City"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="Postal Code"
                  onChange={handleAddressChange}
                  label="Postal Code"
                  value={address["Postal Code"]}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {activeStep === 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Box width="80%">
            <FormControl component="fieldset">
              <Typography width="max-content" variant="h6">
                Payment Method
              </Typography>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="credit-card"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="cash-on-delivery"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      )}
      {activeStep === 2 && (
        <Box mt={2} width="100%">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">Name: {address?.Name}</Typography>
            <Typography variant="body1">Address: {address?.Address}</Typography>
            <Typography variant="body1">City: {address?.City}</Typography>
            <Typography variant="body1">
              Flat/HouseNo: {address?.["Flat/House no."]}
            </Typography>
            <Typography variant="body1">
              Postal Code: {address?.["Postal Code"]}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, marginTop: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Products Detail
            </Typography>
            {orderedProd?.cartItems?.map((item, index) => (
              <>
                <Grid key={item._id} item xs={12} sm={3}>
                  <ListItemAvatar>
                    <Avatar
                      alt={item?.name}
                      src={`http://localhost:8089/${item?.image.slice(8)}`}
                    />
                  </ListItemAvatar>
                </Grid>
                <Typography variant="body1">
                  ProductId: {item.productId}
                </Typography>
                <Typography variant="body1">Name:{item?.name}</Typography>
                <Typography variant="body1">Price: {item?.price}</Typography>
                <Typography variant="body1">
                  Quantity : {item?.quantity}
                </Typography>
                {item?.variant?.color && (
                  <Typography variant="body1">
                    Color: {item?.variant?.color}
                  </Typography>
                )}
                {item?.attribute?.size && (
                  <Typography variant="body1">
                    Size: {item?.attribute?.size}
                  </Typography>
                )}
                <Divider sx={{ my: 1 }} />
              </>
            ))}
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, marginTop: "10px" }}>
            <Typography variant="body1">
              <RadioButtonChecked /> Payment Method: {paymentMethod}
            </Typography>
          </Paper>
          <Typography
            sx={{ fontWeight: "600", marginTop: "10px", padding: "10px" }}
            variant="body1"
          >
            Total Price: {orderedProd?.totalPrice?.toFixed(2)} Rs
          </Typography>
        </Box>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ marginRight: 1, borderRadius: "20px" }}
        >
          Back
        </Button>
        {activeStep != steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ borderRadius: "20px" }}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        ) : (
          <Button
            startIcon={<LocalMall />}
            onClick={() => handleCheckOut(orderedProd)}
            variant="contained"
            color="warning"
            sx={{
              borderRadius: "20px",
            }}
          >
            Proceed To Checkout
          </Button>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/cart")}
        sx={{
          marginTop: "50px",
          borderRadius: "20px",
          backgroundColor: "green",
        }}
      >
        Go Back To Shopping Cart
      </Button>
    </Box>
  );
};

export default CheckOutPage;
