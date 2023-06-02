import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const CategoryTree = ({ onCategoryChange }) => {
  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    fetchCategoryTree();
  }, []);
  const fetchCategoryTree = async () => {
    try {
      const response = await axios.get("http://localhost:8089/categories/tree");
      setCategoryTree(response.data);
    } catch (error) {
      console.error("Error retrieving category tree:", error);
    }
  };
  const handleCategoryChange = (categoryIndex, categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedSelectedCategories = [...prevSelectedCategories];
      updatedSelectedCategories[categoryIndex] = categoryId;
      const firstCategoryId = updatedSelectedCategories[0];
      onCategoryChange(
        updatedSelectedCategories[categoryIndex],
        firstCategoryId
      );
      // Update first category ID when the first category is selected
      return updatedSelectedCategories.slice(0, categoryIndex + 1);
    });
  };
  const renderDropdownTree = (categories, categoryIndex) => {
    const selectedCategoryId = selectedCategories[categoryIndex];
    return (
      <>
        <FormControl>
          <Select
            value={selectedCategoryId || ""}
            onChange={(e) =>
              handleCategoryChange(categoryIndex, e.target.value)
            }
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedCategoryId && categoryIndex < selectedCategories.length && (
          <FormControl>
            {renderDropdownTree(
              categories.find((category) => category._id === selectedCategoryId)
                ?.children,
              categoryIndex + 1
            )}
          </FormControl>
        )}
      </>
    );
  };
  return <FormControl>{renderDropdownTree(categoryTree, 0)}</FormControl>;
};

export default CategoryTree;
