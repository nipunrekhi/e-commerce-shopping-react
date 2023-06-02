import React, { useState } from "react";
import { Avatar, Button, TextField,Grid,Box,  Typography,  Container, DialogContent, DialogTitle, Dialog, DialogActions,} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccessState } from "../features/auth/authSlice";
import Error from "../components/error";

const LoginWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(8)};
`;

const LoginAvatar = styled(Avatar)`
  margin: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const LoginForm = styled("form")`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const LoginSubmit = styled(Button)`
  margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`;

const ForgotPasswordLink = styled("a")`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const SignUpLink = styled("a")`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const LoginPage = () => {
  const { isError, isSuccess, errorMessage,userInfo } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [errorKey, setErrorKey] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isSuccess) {
      setOpenDialog(true);
      setDialogContent("Login Successfull!");
      setTimeout(() => {
        clearSuccessState();
        navigate("/home");
      }, 3000);
    }
    if (isError) {
      setError(errorMessage);
      setErrorKey((prev) => prev + 1);
    }
  }, [isSuccess, isError, navigate, errorMessage,userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(data);
    dispatch(loginUser({ email, password }));
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {error && <Error key={errorKey} message={error} />}
      <LoginWrapper component="main" maxWidth="xs">
        <LoginAvatar>
          <LockOutlinedIcon />
        </LoginAvatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginSubmit
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoginSubmit>
          <Grid container>
            <Grid item xs>
              <ForgotPasswordLink href="#" variant="body2">
                Forgot password?
              </ForgotPasswordLink>
            </Grid>
            <Grid item>
              <SignUpLink
                onClick={() => navigate("/register")}
                href="#"
                variant="body2"
              >
                {"Don't have an account? "} Sign Up
              </SignUpLink>
            </Grid>
          </Grid>
        </LoginForm>
      </LoginWrapper>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Powered by "}
          <a href="https://mui.com/">Material-UI</a>
        </Typography>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Login successful!</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
