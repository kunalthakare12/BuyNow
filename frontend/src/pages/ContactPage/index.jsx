import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Navbar from "../../components/Navbar";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    // Simulate sending message (replace with real API if needed)
    if (form.name && form.email && form.message) {
      setSuccess("Thank you for contacting us! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, mt: 8, borderRadius: 4 }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Contact Us
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
            Have a question or need help? Fill out the form below and we’ll get back to you!
          </Typography>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              minRows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage;