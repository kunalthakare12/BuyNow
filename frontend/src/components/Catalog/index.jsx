import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, CircularProgress, Typography, Alert } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import "./Catalog.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <CircularProgress size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        {error}
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" sx={{ margin: 4 }}>
        No products available at the moment.
      </Typography>
    );
  }

  return (
    <div>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        className="catalog-grid"
      >
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} showBuyNow={false} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Catalog;