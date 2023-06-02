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
import {
  addCategory,
  addProducts,
  addVariant,
  getProducts,
  productDropdown,
} from "../features/products/productsAction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { clearSuccessState } from "../features/auth/authSlice";
const AddVariantsContainer = styled(Box)(({ theme }) => ({
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

const AddVariantsForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AddVariantsImage = styled(Box)(({ theme }) => ({
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
const AddVariantsPage = () => {
  const { isSuccess, isError, isLoading, errorMessage, productData } =
    useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState();
  const [errorKey, setErrorKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isAddVariantSuccess, setIsAddVariantSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess && isAddVariantSuccess) {
      setOpenDialog(true);
      setDialogContent("Variant Added!");
    }
  }, [isSuccess,isAddVariantSuccess,productData]);
  useEffect(() => {
    dispatch(productDropdown());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new FormData object and append the category data and image to it
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", selectedImage);
    formData.append("color", color);
    formData.append("price", price);
    formData.append("productId", productId);
    dispatch(addVariant(formData))
      .then(() => {
        setIsAddVariantSuccess(true);
      })
      .catch((error) => {
        setIsAddVariantSuccess(false);
        setError(error);
        setErrorKey((prevKey) => prevKey + 1);
      });
  };
  return (
    <AddVariantsContainer>
      {error && <Error key={errorKey} message={error} />}
      <AddVariantsImage>
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
                multiple
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                hidden
              />
            </Button>
          </>
        )}
      </AddVariantsImage>
      <AddVariantsForm>
        {productData && productData.length > 0 && (
          <FormControl>
            <InputLabel>Select Product</InputLabel>
            <Select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <MenuItem value="">Select Product</MenuItem>
              {productData?.map((prod) => (
                <MenuItem key={prod._id} value={prod._id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl>
          <TextField
            label="Variant Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            label="Price "
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            label="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
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
          {isLoading ? <Spinner /> : "Add Variants"}
        </Button>
      </AddVariantsForm>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Variant Added!</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AddVariantsContainer>
  );
};
export default AddVariantsPage;
