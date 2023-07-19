import { Button, Grid, useMediaQuery } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/products/productsAction";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

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
  maxWidth: "200px",
  minHeight: "200px",
  margin: "0 auto",
  "& img": {
    width: "100%",
    objectFit: "cover",
    maxHeight: "250px",
    marginBottom: "1rem",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "& h3": {
    marginTop: "-0.3rem",
    fontSize: "1.0rem",
    fontWeight: 500,
    marginBottom: "-2rem",
  },
  "& p": {
    fontSize: "1.0rem",
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

const ShowCategoryPage = () => {
  const theme = createTheme();
  const { categoryData, isSuccess } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) setCategories(categoryData);
  }, [isSuccess, categoryData]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/product/${categoryId}`);
  };
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <ThemeProvider
      theme={theme}
      justifyContent={isXsScreen ? "center" : "flex-start"}>
      <Grid container spacing={4}>
        {categories?.map((category, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCard onClick={() => handleCategoryClick(category._id)}>
              {" "}
              <img src={`http://localhost:8089/${category?.image.slice(8)}`} />
              <h3>Category: {category?.name}</h3>
              <p>
                <strong>Description:</strong> {category?.description}
              </p>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default ShowCategoryPage;
