import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Badge, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="fixed" color="primary" elevation={2} sx={{ zIndex: 1200 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}
        >
          E-Sales
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/catalog" sx={{ fontWeight: 500 }}>
            Catalog
          </Button>
          <Button color="inherit" component={Link} to="/contact" sx={{ fontWeight: 500 }}>
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/signup" sx={{ fontWeight: 500 }}>
            Sign Up
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 500 }}>
            Login
          </Button>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;