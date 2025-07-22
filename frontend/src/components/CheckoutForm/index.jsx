import React from "react";
import { TextField, Select, MenuItem, Button, Typography } from "@mui/material";
import "./CheckoutForm.css";

const CheckoutForm = ({ order, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="checkout-form">
      <TextField
        fullWidth
        label="Full Name"
        name="customerName"
        value={order.customerName}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={order.email}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={order.phoneNumber}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={order.address}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        label="City, State, Zip Code"
        name="cityStateZip"
        value={order.cityStateZip}
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        label="Card Number"
        name="cardNumber"
        type="text"
        inputProps={{ 
          maxLength: 16, 
          pattern: "[0-9]{16}",
          placeholder: "1234567890123456"
        }}
        value={order.cardNumber}
        onChange={onChange}
        required
        helperText="Enter 16-digit card number"
      />
      <TextField
        fullWidth
        label="Expiry Date"
        name="expiryDate"
        type="month"
        inputProps={{ 
          min: new Date().toISOString().slice(0, 7),
          placeholder: "MM/YYYY"
        }}
        value={order.expiryDate}
        onChange={onChange}
        required
        helperText="Select expiry month and year"
      />
      <TextField
        fullWidth
        label="CVV"
        name="cvv"
        type="password"
        inputProps={{ 
          maxLength: 4, 
          pattern: "[0-9]{3,4}",
          placeholder: "123"
        }}
        value={order.cvv}
        onChange={onChange}
        required
        helperText="3 or 4 digit security code"
      />

      <Typography variant="subtitle1">Transaction Type:</Typography>
      <Select
        name="transactionType"
        value={order.transactionType}
        onChange={onChange}
        fullWidth
      >
        <MenuItem value="1">✅ Approved</MenuItem>
        <MenuItem value="2">❌ Declined</MenuItem>
        <MenuItem value="3">⚠️ Gateway Failure</MenuItem>
      </Select>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Place Order
      </Button>
    </form>
  );
};

export default CheckoutForm;