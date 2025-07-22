import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.images[0]);
        setSelectedSize(res.data.sizes[0]);
        setSelectedColor(res.data.colors[0]);
      })
      .catch((err) => {
        setProduct(null);
      });
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ mt: 12, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate(`/checkout?productId=${product._id}&size=${selectedSize}&color=${selectedColor}&quantity=${quantity}`);
  };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
          <Grid container spacing={4}>
            {/* Images Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: mainImage === img ? "2px solid #1976d2" : "2px solid transparent",
                      cursor: "pointer",
                      boxShadow: mainImage === img ? "0 0 8px #1976d2" : "none",
                      transition: "border 0.2s, box-shadow 0.2s",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </Stack>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>
                ₹{product.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Size:
                </Typography>
                {product.sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    color={selectedSize === size ? "primary" : "default"}
                    onClick={() => setSelectedSize(size)}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Color:
                </Typography>
                {product.colors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    color={selectedColor === color ? "primary" : "default"}
                    onClick={() => setSelectedColor(color)}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Quantity:
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Typography>{quantity}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleAddToCart}
                  sx={{ fontWeight: 600, px: 4 }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{ fontWeight: 600, px: 4 }}
                >
                  Buy Now
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;