import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { addAttributes, productDropdown } from "../features/products/productsAction";

const AddAttributesContainer = styled(Box)(({ theme }) => ({
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

const AddAttributesForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AttributeList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AttributeItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.5rem",
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
}));

const AddAttributesPage = () => {
  const [attributes, setAttributes] = useState([]);
  const [size, setSize] = useState("");
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.productData);
  useEffect(() => {
    dispatch(productDropdown());
  }, [dispatch]);
  const handleAddAttribute = () => {
    if (size) {
      setAttributes([...attributes, size]);
      setSize("");
    }
  };

  const handleDeleteAttribute = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Call your backend API to add attributes
      dispatch(addAttributes({productId,attributes}))
      setDialogContent("Attributes added successfully!");
      setOpenDialog(true);
    
    } catch (error) {
      setError("Failed to add attributes. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <AddAttributesContainer>
      <AddAttributesForm>
        {productData && productData.length > 0 && (
          <FormControl>
            <InputLabel>Select Product</InputLabel>
            <Select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <MenuItem value="">Select Product</MenuItem>
              {productData.map((prod) => (
                <MenuItem key={prod._id} value={prod._id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl>
          <TextField
            label="Size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </FormControl>
        <Button
          onClick={handleAddAttribute}
          variant="contained"
          color="primary"
          disabled={!size}
        >
          <AddIcon />
          Add Attribute
        </Button>
        <AttributeList>
          {attributes.map((attribute, index) => (
            <AttributeItem key={index}>
              <span>{attribute}</span>
              <IconButton
                onClick={() => handleDeleteAttribute(index)}
                color="inherit"
              >
                <DeleteIcon />
              </IconButton>
            </AttributeItem>
          ))}
        </AttributeList>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!productId || attributes.length === 0 || isLoading}
        >
          {isLoading ? <Spinner /> : "Add Attributes"}
        </Button>
      </AddAttributesForm>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AddAttributesContainer>
  );
};

export default AddAttributesPage;
