import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Alert, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, form);
      setSuccess("Signup successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xs" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, mt: 8, borderRadius: 4 }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
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
              Sign Up
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button component={Link} to="/login" size="small">
              Log In
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;