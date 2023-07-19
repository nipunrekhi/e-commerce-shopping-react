import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { assignPromo, showPromo } from "../features/promocode/promoAction";
import { getAllUser } from "../features/auth/authAction";

const ShowPromoCodePage = () => {
  const dispatch = useDispatch();
  const { promocode, isLoading } = useSelector((state) => state.promocode);
  const { data } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState("");
  const [promo, setPromo] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    dispatch(showPromo());
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    setPromoCodes(promocode);
  }, [promocode]);
  const handleSubmit = () => {
    dispatch(assignPromo({ userId, promo }));
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1976d2",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        padding: "12px 16px", // Specify the cell padding
      },
    },
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Promocode",
      selector: "promocode",
      sortable: true,
    },
    {
      name: "Discount",
      selector: "discount",
      sortable: true,
    },
  ];

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Promo Codes
        </Typography>
        <Paper>
          {isLoading ? (
            <p>Loading...</p> // Render a loading indicator while data is being fetched
          ) : promoCodes && promoCodes.length ? (
            <DataTable
              columns={columns}
              data={promoCodes}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={customStyles} // Apply custom styles to the table
            />
          ) : (
            <p>No promo codes available.</p> // Render a message if promoCodes is empty
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleOpen}>Assign Promocode </Button>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-select-label">Promocode</InputLabel>
                    <Select onChange={(e) => setPromo(e.target.value)}>
                      <MenuItem>Select Promocode</MenuItem>
                      {promoCodes?.map((promo) => (
                        <MenuItem key={promo._id} value={promo}>
                          {promo.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                  }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">User</InputLabel>
                    <Select onChange={(e) => setUserId(e.target.value)}>
                      <MenuItem>Select User</MenuItem>
                      {data &&
                        data.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.email}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                  }}>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="success">
                    Assign
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </Paper>
      </Box>
    </Container>
  );
};

export default ShowPromoCodePage;
