import React from "react";
import { keyframes, styled } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2, 0),
  animation: `${fadeIn} 0.5s ease-in`,
  position: "fixed",
  bottom: 0,
  left: 0,
  display:"flex",
  width: "100%",
  marginTop: "250px",
  [theme.breakpoints.up("xs")]: {
    padding:"-190px", // Adjust the marginTop for larger screens
  },
}));

const Link = styled("a")(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Footer = () => {
  return (
    <div style={{marginTop:"100px"}}>
      <FooterContainer>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                &copy; 2023 My Website. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" align="right">
                <Link href="#">Privacy Policy</Link> |{" "}
                <Link href="#">Terms of Service</Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>
    </div>
  );
};

export default Footer;
