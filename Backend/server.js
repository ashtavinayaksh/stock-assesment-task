const express = require('express');
const app = express();

// Mock data for predefined stocks with initial prices
let stocks = [
  { symbol: 'Tata', price: 150.25 },
  { symbol: 'RLA', price: 2800.75 },
  // Add more predefined stocks as needed
];

// Endpoint to get all stocks
app.get('/api/stocks', (req, res) => {
  res.json(stocks);
});

// Endpoint to update stock prices (mocked with random values)
app.put('/api/stocks/:symbol', (req, res) => {
  const { symbol } = req.params;
  const stockToUpdate = stocks.find(stock => stock.symbol === symbol);
  if (stockToUpdate) {
    stockToUpdate.price = Math.random() * 500; // Random price for demonstration
    res.json(stockToUpdate);
  } else {
    res.status(404).send('Stock not found');
  }
});

// Run server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
