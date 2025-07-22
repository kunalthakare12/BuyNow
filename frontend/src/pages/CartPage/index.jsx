import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTaxes = subtotal * 0.15;
  const total = subtotal + estimatedTaxes;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Typography variant="h3" fontWeight={700} textAlign="center" mb={4}>
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" mb={2}>
              Your cart is empty.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/catalog"
            >
              Shop Now
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={3}>
                  {cartItems.map((item, idx) => (
                    <Box
                      key={item._id + idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        borderBottom:
                          idx !== cartItems.length - 1
                            ? "1px solid #eee"
                            : "none",
                        pb: 2,
                        mb: 2,
                      }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                          background: "#fff",
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: ₹{item.price.toFixed(2)}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              updateQuantity(item, Math.max(1, item.quantity - 1))
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Typography>{item.quantity}</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              updateQuantity(item, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </Stack>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item)}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearCart}
                  sx={{ mt: 2 }}
                >
                  Clear Cart
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Order Summary
                </Typography>
                <Stack spacing={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography>₹{subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Estimated Taxes (15%)</Typography>
                    <Typography>₹{estimatedTaxes.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                    }}
                  >
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>
                      ₹{total.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 3, fontWeight: 600 }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;