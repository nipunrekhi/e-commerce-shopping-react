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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addProducts } from "../features/products/productsAction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { clearSuccessState } from "../features/auth/authSlice";

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

const AddCategoryPage = () => {
  const { isSuccess, isError, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [errorKey, setErrorKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isAddCategorySuccess, setIsAddCategorySuccess] = useState(false);

  const dispatch = useDispatch();

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const ImageUpload = styled("input")({
    display: "none",
  });

  useEffect(() => {
    if (isSuccess && isAddCategorySuccess) {
      setOpenDialog(true);
      setDialogContent("Category Added!");
    }
    if (isError) {
      setError(errorMessage);
      setErrorKey((prev) => prev + 1);
    }
  }, [isError, isAddCategorySuccess, isError, errorMessage]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new FormData object and append the category data and image to it
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", selectedImage);
    dispatch(addCategory(formData)).then(() => {
      setIsAddCategorySuccess(true);
    });
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
        <FormControl>
          <TextField
            label="Category Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></TextField>
        </FormControl>

        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isLoading ? <Spinner /> : "Add Category"}
        </Button>
      </AddProductForm>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Category Added!</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AddProductContainer>
  );
};

export default AddCategoryPage;
