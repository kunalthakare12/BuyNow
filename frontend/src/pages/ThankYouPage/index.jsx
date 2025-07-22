import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import Navbar from "../../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ThankYouPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/${orderNumber}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderNumber]);

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 8,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          {loading ? (
            <Box sx={{ py: 8 }}>
              <CircularProgress size={60} sx={{ color: "#1976d2" }} />
              <Typography variant="h6" mt={2}>
                Loading your order details...
              </Typography>
            </Box>
          ) : order ? (
            <>
              <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
                Thank You!
              </Typography>
              <Typography variant="h5" fontWeight={500} gutterBottom>
                Your order has been placed successfully.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Order Number: <b>{order.orderNumber}</b>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                A confirmation email has been sent to <b>{order.email}</b>.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/catalog"
                sx={{ mt: 3, fontWeight: 600, px: 4, py: 1.2, fontSize: "1.1rem" }}
              >
                Continue Shopping
              </Button>
            </>
          ) : (
            <Typography variant="h6" color="error">
              Sorry, we couldn't find your order.
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ThankYouPage;