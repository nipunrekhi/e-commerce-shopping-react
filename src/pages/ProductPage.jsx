import { Box, Button, Grid, Typography, keyframes, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../features/products/productsAction";
const ProductCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-start",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  padding: "0.6rem",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "200px",
  minHeight: "275px",
  margin: "0 auto",

  "& img": {
    width: "100%",
    objectFit: "cover",
    maxHeight: "170px",
    borderRadius: "6px",
    marginBottom: "1rem",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "& h3": {
    marginTop: "-0.3rem",
    fontSize: "1.0rem", // Adjust the font size of the heading
    fontWeight: 500,
    marginBottom: "-0.9rem", // Adjust the margin bottom of the heading
  },
  "& p": {
    fontSize: "1.0rem", // Adjust the font size of the description
    fontWeight: 500,
    marginTop: "1.5rem",
    marginBottom:"1px" // Adjust the margin top of the description
  },
  "& .price": {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#666",
    display: "flex",
    alignItems: "center",
    "& span.currency": {
      fontSize: "9rem",
      marginRight: "0.2rem",
      marginTop: "-0.2rem",
    },
  },
  "& button": {
    width: "100%",
  },
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

const CenteredTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  height: "60vh",
  color:"red",
  animation: `${fadeIn} 1s ease-in`,
}));
const ProductPage = () => {
  const { productData } = useSelector((state) => state.products);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(getProducts(id));
  }, [dispatch,id]);
  useEffect(() => {
    setProduct(productData);
  }, [productData]);
  return (
    <>
      {product?.length == 0 && (
        <Box>
            <CenteredTypography>Not Items Found</CenteredTypography>
        </Box>
      )}
      <Grid container spacing={4}>
        {product?.data?.map((prod, index) => (
          <Grid item key={index} xs={5.6} sm={4.3} md={4} lg={3}>
            {error && <p>{error}</p>}
            <ProductCard onClick={() => navigate(`/showProduct/${prod?._id}`)}>
              {" "}
              <img src={`http://localhost:8089/${prod?.image.slice(8)}`} />
              <h3>Product Name: {prod?.name}</h3>
              <p>
               Description: {prod?.description}
              </p>
              <span
                style={{
                  fontSize: "small",
                  marginRight: "0.2rem",
                  color: "#666",
                }}
              >
                ₹
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {prod?.price}
              </span>
              <span
                style={{
                  color: "grey",
                  fontSize: "small",
                  marginLeft: "0.2rem",
                }}
              >
                M.R.P
              </span>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductPage;
