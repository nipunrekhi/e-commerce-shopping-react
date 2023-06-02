import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getCategory } from "../features/products/productsAction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { clearSuccessState } from "../features/auth/authSlice";
import CategoryTree from "./CategoryDropdown";

const AddProductContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "2rem",
  },
}));

const AddProductForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AddProductImage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "12rem",
  width: "12rem",
  backgroundColor: theme.palette.grey[200],
  borderRadius: "50%",
  [theme.breakpoints.up("sm")]: {
    height: "16rem",
    width: "16rem",
  },
}));

const AddProductsPage = () => {
  const { isSuccess, isError, isLoading, errorMessage, categoryData } =
    useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [errorKey, setErrorKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isAddProductSuccess, setIsAddProductSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  useEffect(() => {
    if (isSuccess && isAddProductSuccess) {
      setOpenDialog(true);
      setDialogContent("Product Added Successfull!");
      clearSuccessState();
    }
    if (isError) {
      setError(errorMessage);
      setErrorKey((prev) => prev + 1);
    }
  }, [isSuccess, isAddProductSuccess, isError, errorMessage, categoryData]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new FormData object and append the product data and image to it
    const formData = new FormData();
    console.log(formData);
    formData.append("name", name);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", selectedImage);
    dispatch(addProducts(formData)).then(() => {
      setIsAddProductSuccess(true);
    });
  };
  const handleCategoryChange = (parentId, firstCategoryId) => {
    setCategoryId(firstCategoryId);
    setSubCategoryId(parentId);
  };

  return (
    <AddProductContainer>
      {error && <Error key={errorKey} message={error} />}
      <AddProductImage>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Product"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                hidden
              />
            </Button>
          </>
        )}
      </AddProductImage>
      <AddProductForm>
        <TextField
          label="Product Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <FormControl>
          <Typography sx={{ textAlign: "center" }}>
            Category/SubCategory
          </Typography>
          <CategoryTree
            onCategoryChange={handleCategoryChange}
            firstCategoryId={categoryId}
          />
        </FormControl>
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isLoading ? <Spinner /> : "Add Product"}
        </Button>
      </AddProductForm>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Product Added!</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AddProductContainer>
  );
};

export default AddProductsPage;
