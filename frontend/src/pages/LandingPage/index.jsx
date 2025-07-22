import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import SearchBox from "../../components/SearchBox";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";
import { Container, Grid, Typography, Button, Box } from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialProducts, setInitialProducts] = useState([]);
  const { results: searchResults } = useDebouncedSearch(searchQuery, 500);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => setInitialProducts(res.data.slice(0, 9)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const displayedProducts =
    searchQuery.trim() && searchResults.length > 0
      ? searchResults
      : searchQuery.trim() && searchResults.length === 0
        ? [] // no results found
        : initialProducts;

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          position: "relative",
          overflow: "hidden",
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 0 },
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Left: Text */}
        <Box sx={{ flex: 1, zIndex: 2, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: "#222" }}>
            Welcome to E-Sales
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, color: "#444" }}>
            Discover the latest trends and best deals in fashion, footwear, and accessories.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/catalog"
            sx={{
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: "1.2rem",
              boxShadow: 2,
              borderRadius: 3,
            }}
          >
            Shop Now
          </Button>
        </Box>
        {/* Right: Hero Image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
            alt="Fashionable products"
            style={{
              width: "90%",
              maxWidth: 400,
              borderRadius: 24,
              boxShadow: "0 8px 32px rgba(33,150,243,0.12)",
            }}
          />
        </Box>
        {/* Optional: Decorative background shape */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "60%",
            height: "100%",
            background: "linear-gradient(120deg, #1976d2 0%, #2196f3 100%)",
            opacity: 0.08,
            zIndex: 0,
            borderBottomLeftRadius: 120,
          }}
        />
      </Box>

      {isSearchOpen && (
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <Container maxWidth="xl" sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {searchQuery.trim() && searchResults.length === 0
            ? "No products found."
            : "Explore our latest collection now and click the products for more details."}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {displayedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} showBuyNow />
            </Grid>
          ))}
        </Grid>

        {!searchQuery && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/catalog"
              sx={{ fontWeight: 600, px: 4, py: 1.2, fontSize: "1.1rem" }}
            >
              View All
            </Button>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          py: 3,
          background: "#222",
          color: "#fff",
          textAlign: "center",
          fontSize: "1rem",
          letterSpacing: 1,
        }}
      >
        &copy; {new Date().getFullYear()} E-Sales. All rights reserved.
      </Box>
    </Box>
  );
};

export default LandingPage;