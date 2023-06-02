import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authAction";
import Error from "../components/error";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { clearSuccessState } from "../features/auth/authSlice";
import "../styles/golbal.css";

const RegisterAvatar = styled(Avatar)`
  margin: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, userInfo, isSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [error, setError] = React.useState();
  const [errorKey, setErrorKey] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [userNameError, setUsernameError] = useState(false);
  const [UsernameHelperText, setUsernameHelperText] = useState("");
  const [lastnameError, setlastnameError] = useState(false);
  const [lastnameHelperText, setlastnameHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  React.useEffect(() => {
    if (isSuccess) {
      setOpenDialog(true);
      setDialogContent("You have successfully registered!");
      setTimeout(() => {
        dispatch(clearSuccessState());
        navigate("/login");
      }, 5000);
    }
    if (isError) {
      setError(errorMessage);
      setErrorKey((prev) => prev + 1);
    }
  }, [isSuccess, isError, navigate, errorMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { firstName, lastName, email, password, phoneNumber, address } =
      Object.fromEntries(data);
    if (userNameError||emailError||passwordError||confirmPasswordError) {
      return false;
    } else {
      dispatch(
        registerUser({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          address,
        })
      );
    }
  };
  const handleEmailChange = (event) => {
    const email = event.target.value.trim();
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!isValidEmail) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };
  const handleUsernameChange = (event) => {
    const username = event.target.value.trim();
    const isValidUsername = /^[a-zA-Z0-9]{5,}$/.test(username);
    if (!isValidUsername) {
      setUsernameError(true);
      setUsernameHelperText(
        "Username must be at least 5 characters long and only contain letters and numbers"
      );
    } else {
      setUsernameError(false);
      setUsernameHelperText("");
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    if (password.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("Password must be at least 8 characters long");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    const password = document.getElementsByName("password")[0].value;
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText("Passwords do not match");
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText("");
    }
  };
  return (
    <Container maxWidth="xs">
      {error && <Error key={errorKey} message={error} />}
      <Box sx={{ marginTop: 4, marginBottom: 2 }}>
        <RegisterAvatar sx={{ marginLeft: "43%" }}>
          <LockOpenIcon />
        </RegisterAvatar>
        <Typography variant="h4" align="center">
          Register
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              autoFocus
              error={userNameError}
              helperText={UsernameHelperText}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="lastName" label="Last Name" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              inputProps={{ maxLength: 100 }}
              error={emailError}
              helperText={emailHelperText}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              error={passwordError}
              helperText={passwordHelperText}
              onChange={handlePasswordChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="Confirm Password"
              label="Confirm Password"
              type="password"
              error={confirmPasswordError}
              helperText={confirmPasswordHelperText}
              onChange={handleConfirmPasswordChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isLoading ? <Spinner /> : "Register"}
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link href="#" onClick={() => navigate("/login")}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Registration successful!</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Register;
