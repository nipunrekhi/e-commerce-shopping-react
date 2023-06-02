import { Grid, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ProductCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-start",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "300px",
  minHeight: "300px",
  "& img": {
    width: "100%",    objectFit: "cover",
    maxHeight: "250px",
    marginBottom: "1rem",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "& h3": {
    marginTop: "-0.3rem",
    fontSize: "1.4rem",
    fontWeight: 500,
    marginBottom: "-2rem",
  },
  "& p": {
    fontSize: "1.2rem",
    fontWeight: 500,
    marginTop: "2.5rem",
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
});

const SubCategoryPage = () => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, [id]);
  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/product/${subCategoryId}`);
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8089/getProducts?categoryId=${id}`
      );
      setSubCategory(response.data);
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };
  return (
    <Grid container spacing={4}>
      {subCategory?.map((subCat, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <ProductCard onClick={() => handleSubCategoryClick(subCat?._id)}>
            {" "}
            <img
              src={`http://localhost:8089/${subCat?.image.slice(8)}`}
            />
            <h3>Category: {subCat?.name}</h3>
            <p>
              <strong>Description:</strong> {subCat?.description}
            </p>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubCategoryPage;
