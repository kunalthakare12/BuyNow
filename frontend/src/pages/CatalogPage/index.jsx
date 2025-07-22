import React from "react";
import Navbar from "../../components/Navbar";
import Catalog from "../../components/Catalog";
import { Container, Typography, Box } from "@mui/material";
import "./CatalogPage.css";

const CatalogPage = () => {
  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 8px rgba(33, 150, 243, 0.2)",
            letterSpacing: 1,
          }}
        >
          Product Catalog
        </Typography>
        {/* (Optional) Add category filter/search bar here */}
        <Catalog />
      </Container>
    </Box>
  );
};

export default CatalogPage;