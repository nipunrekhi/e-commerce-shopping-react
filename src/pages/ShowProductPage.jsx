import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVariants,
  showAttribute,
  showProduct,
} from "../features/products/productsAction";

import { addToCart } from "../features/cart/cartAction";
import { useGetUserProfileQuery } from "../app/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddShoppingCart, LocalMall } from "@mui/icons-material";
import { getIpAddress } from "../features/auth/authAction";

const ProductContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  justifyContent: "center",
  gap: "2rem",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  [theme.breakpoints.only("xs")]: {
    marginTop: "-100px",
    gap: "-2rem",
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  flex: "0 0 50%",
  maxWidth: 300,
  maxHeight: 300,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  marginBottom: "1rem",
  borderRadius: "6px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: 600,
    maxHeight: 600,
  },
}));

const ProductInfo = styled(CardContent)(({ theme }) => ({
  flex: "0 0 50%",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    textAlign: "left",
  },
  [theme.breakpoints.only("xs")]: {
    marginTop: "-40px",
  },
}));
const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.only("xs")]: {
    marginRight: "7px",
    marginBottom: "15px",
  },
}));
const BuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: "red",
  color: theme.palette.common.white,
  marginLeft: "20px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "green",
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.only("xs")]: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "15px",
  },
}));
const VariantContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "1rem",
  [theme.breakpoints.only("xs")]: {
    flexWrap: "nowrap",
  },
}));

const VariantItem = styled(Grid)(({ theme }) => ({
  flex: "0 0 calc(33.33% - 1rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
  },
}));

const VariantImageContainer = styled(Box)({
  height: "60px",
  width: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const VariantImage = styled(CardMedia)(({ theme }) => ({
  height: "100%",
  width: "100%",
  objectFit: "contain",
  borderRadius: "4px",
}));

const NotAvilableTypography = styled(Typography)(({ theme }) => ({
  
  color: "red",
  fontFamily: "cursive",
}));
const ShowProductPage = () => {
  const { data } = useGetUserProfileQuery();
  const { ipAddress } = useSelector((state) => state.auth);
  const { productData, variantData, attributeData, isSuccess } = useSelector(
    (state) => state.products,
  );
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [isCartItemAdded, setIsCartItemAdded] = useState(false);
  const [ip, setIp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const notify = () => {
    toast.success("🦄 Item Added in Cart!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    setIp(ipAddress);

    if (isSuccess && isCartItemAdded) {
      notify();
    }
  }, [
    isSuccess,
    productData,
    variantData,
    attributeData,
    isCartItemAdded,
    ipAddress,
  ]);
  useEffect(() => {
    dispatch(showProduct(id));
    dispatch(getVariants(id));
    dispatch(showAttribute(id));
    if (!data) {
      dispatch(getIpAddress());
    }
  }, [dispatch, id]);
  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
  };
  const handleAddToCart = () => {
    const cartItems = {
      userId: data ? data.id : ip.ipAddress,
      productId: productData?._id,
      name: updatedName,
      price: updatedPrice,
      image: updatedImage,
      quantity: 1,
      attribute: selectedAttribute,
      variant: selectedVariant,
    };
    dispatch(addToCart(cartItems)).then(() => {
      setIsCartItemAdded(true);
    });
  };
  const getTotalPrice = () => {
    const cartItems = [
      {
        userId: data.id,
        productId: productData?._id,
        name: updatedName,
        price: updatedPrice,
        image: updatedImage,
        quantity: 1,
        attribute: selectedAttribute,
        variant: selectedVariant,
      },
    ];
    return cartItems.reduce((total, item) => {
      const price = item?.price || 0; // Update the property access
      const quantity = item?.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleBuyNow = () => {
    const cartItems = [
      {
        userId: data.id,
        productId: productData?._id,
        name: updatedName,
        price: updatedPrice,
        image: updatedImage,
        quantity: 1,
        variant: selectedVariant,
        attribute: selectedAttribute,
      },
    ];
    const orderDetails = {
      cartItems: cartItems,
      totalPrice: getTotalPrice(),
      // Add other relevant order details here
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/checkout"); // Navigate to the checkout page
  };

  // Variables to store the updated product data based on the selected variant
  const updatedName = selectedVariant
    ? selectedVariant.name
    : productData?.name;
  const updatedImage = selectedVariant
    ? selectedVariant.image
    : productData?.image;
  const updatedPrice = selectedVariant
    ? selectedVariant.price
    : productData?.price;
  const updatedDescription = selectedVariant
    ? selectedVariant.description
    : productData?.description;
  return (
    <ProductContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ProductImage
        component="img"
        alt="Product Image"
        height="100%"
        src={
          updatedImage ? `http://localhost:8089/${updatedImage.slice(8)}` : ""
        }
      />
      <ProductInfo>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "500" }}
          gutterBottom>
          Product Name: {updatedName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {updatedDescription}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Price: {updatedPrice} Rs
        </Typography>
        {variantData && (
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Product Variants:
            </Typography>

            <VariantContainer container>
              {variantData.length === 0 ? (
                <NotAvilableTypography>No Available</NotAvilableTypography>
              ) : (
                <>
                  {variantData.map((variant) => (
                    <Grid item key={variant._id} xs={12} sm={3}>
                      <VariantItem onClick={() => handleVariantClick(variant)}>
                        <VariantImageContainer>
                          <VariantImage
                            component="img"
                            alt="Variant Image"
                            src={`http://localhost:8089/${variant?.image?.slice(
                              8,
                            )}`}
                          />
                        </VariantImageContainer>
                        <Typography variant="body2">{variant.name}</Typography>
                      </VariantItem>
                    </Grid>
                  ))}
                </>
              )}
            </VariantContainer>
          </Grid>
        )}
        {attributeData && (
          <Grid item xs={12}>
            <VariantContainer container>
              <Grid item xs={12}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Product Attributes:
                </Typography>
              </Grid>

              {attributeData.length === 0 ? (
                <>
                  <NotAvilableTypography>Not Available</NotAvilableTypography>
                </>
              ) : (
                <>
                  {attributeData.map((attribute) => (
                    <Grid item key={attribute._id} xs={12} sm={3}>
                      <VariantItem
                        onClick={() => handleAttributeClick(attribute)}>
                        <Button variant="body2">{attribute.size}</Button>
                      </VariantItem>
                    </Grid>
                  ))}
                </>
              )}
            </VariantContainer>
          </Grid>
        )}
        <AddToCartButton
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          variant="contained">
          Add to Cart
        </AddToCartButton>
        <BuyButton
          onClick={handleBuyNow}
          startIcon={<LocalMall />}
          variant="contained">
          BuyNow
        </BuyButton>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ShowProductPage;
