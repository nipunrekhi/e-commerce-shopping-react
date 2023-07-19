import React from "react";
import { useGetUserProfileQuery } from "../app/services/authService";
import { keyframes, styled } from "@mui/material/styles";
import { Box} from "@mui/material";
import ShowCategoryPage from "./ShowCategoryPage";
import mainimage from "../assets/front-view-cyber-monday-composition.jpg";
import "../styles/Home.css";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MainImage = styled("img")(({ theme }) => ({
  height: "auto",
  marginTop: "-100px",
  marginBottom: theme.spacing(4),
  animation: `${fadeIn} 0.5s ease-in`,
  width: "100%",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    marginTop: "-250px", // Adjust the marginTop for larger screens
  },
}));
const HomePage = () => {
  const { data, error, isLoading } = useGetUserProfileQuery();

  return (
    <Box>
      {/* Main Image */}
      <MainImage src={mainimage} alt="Main Image" />
      <div style={{ marginBottom: "10%" }}>
        <ShowCategoryPage />
      </div>
    </Box>
  );
};

export default HomePage;
