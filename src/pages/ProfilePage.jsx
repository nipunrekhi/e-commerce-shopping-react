import { Box, Grid, Avatar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useGetUserProfileQuery } from "../app/services/authService";
import { Edit, Email, Home, Person4Rounded, Phone } from "@mui/icons-material";

const ProfileBox = styled(Box)({
  backgroundColor: "#f5f5f5",
  minHeight: "76vh",
  paddingTop: "2rem",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "15rem",
  height: "15rem",
  [theme.breakpoints.down("sm")]: {
    width: "10rem",
    height: "10rem",
  },
}));

const ProfileTitle = styled(Typography)({
  fontWeight: 300,
  marginBottom: "1rem",
  fontFamily: "inherit",
});

const ProfileSubtitle = styled(Typography)({
  fontWeight: 500,
  fontFamily: "inherit",
  marginBottom: "1rem",
});

const ProfileButton = styled(Button)({
  backgroundColor: "#2962ff",
  color: "#ffffff",
  border: "solid 1 rem",
  borderRadius: "20px",
  fontSize: "xx-small",
  fontfamily: "unset",
  "&:hover": {
    backgroundColor: "purple",
  },
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserProfileQuery();

  return (
    <ProfileBox sx={{ marginTop: "0px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <ProfileAvatar src="src/assets/react.svg" alt="John Doe" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ProfileTitle variant="h3" component="h2">
              User Profile
            </ProfileTitle>
            <ProfileSubtitle variant="h5" component="h2">
              <Person4Rounded /> {data?.firstName} {data?.lastName}
            </ProfileSubtitle>
            <ProfileSubtitle variant="h5" component="h2">
              <Email /> {data?.email}
            </ProfileSubtitle>
            <ProfileSubtitle variant="h5" component="h2">
              <Home /> {data?.address}
            </ProfileSubtitle>
            <ProfileSubtitle variant="h5" component="h2">
              <Phone /> {data?.phoneNumber}
            </ProfileSubtitle>
            <ProfileButton startIcon={<Edit />} size="large">
              Edit Profile
            </ProfileButton>
          </Box>
        </Grid>
      </Grid>
    </ProfileBox>
  );
};

export default ProfilePage;
