import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Alert, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      // Optionally, update app state here
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xs" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, mt: 8, borderRadius: 4 }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Log In
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Log In
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Button component={Link} to="/signup" size="small">
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;