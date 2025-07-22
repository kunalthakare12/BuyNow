import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckoutForm from "../../components/CheckoutForm";
import CheckoutSummary from "../../components/CheckoutSummary";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";
  const quantityParam = parseInt(searchParams.get("quantity")) || 1;

  const { cartItems, clearCart } = useCart();

  const [productsToCheckout, setProductsToCheckout] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    cityStateZip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    transactionType: "1",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId) {
      const saved = localStorage.getItem("selectedProduct");
      if (saved) {
        const product = JSON.parse(saved);
        setProductsToCheckout([product]);
      } else {
        axios
          .get(`${API_BASE_URL}/api/products/${productId}`)
          .then((response) => {
            const fallbackProduct = {
              ...response.data,
              selectedSize: selectedSize || response.data.sizes[0] || "",
              selectedColor: selectedColor || response.data.colors[0] || "",
              quantity: quantityParam,
            };
            setProductsToCheckout([fallbackProduct]);
          })
          .catch((error) => {
            setProductsToCheckout([]);
          });
      }
    } else {
      setProductsToCheckout(cartItems);
    }
  }, [productId, selectedSize, selectedColor, quantityParam, cartItems]);

  const subtotal = productsToCheckout.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTaxes = subtotal * 0.15;
  const total = subtotal + estimatedTaxes;

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/checkout`, {
        products: productsToCheckout.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        totalAmount: total,
        ...order,
      });

      setTimeout(() => {
        setIsLoading(false);
        if (!productId) clearCart();
        navigate(`/thank-you/${response.data.orderNumber}`);
      }, 800);
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#fff" }} />
        <Typography variant="h5" color="white" mt={2}>
          Processing your order...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          mb={4}
          sx={{ letterSpacing: 1 }}
        >
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <CheckoutForm
                order={order}
                onChange={handleChange}
                onSubmit={handleCheckout}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
              {productsToCheckout.length > 0 ? (
                <>
                  <Typography variant="h5" fontWeight={600} mb={2}>
                    Order Summary
                  </Typography>
                  <CheckoutSummary
                    products={productsToCheckout}
                    subtotal={subtotal}
                    estimatedTaxes={estimatedTaxes}
                    total={total}
                  />
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Your cart is empty.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;