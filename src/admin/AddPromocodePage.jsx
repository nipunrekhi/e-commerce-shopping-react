import React, { useState } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { promo } from "../features/promocode/promoAction";

const AddPromoCodePage = () => {
  const [name, setName] = useState("");
  const [promocode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(promo({ name, promocode, discount }));
    
  };
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {error && <span style={{ color: "red" }}>{error}</span>}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Promo Code
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Promo Code"
                  fullWidth
                  variant="outlined"
                  value={promocode}
                  onChange={(event) => setPromoCode(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Discount"
                  fullWidth
                  variant="outlined"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary">
                  Add Promo Code
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddPromoCodePage;
