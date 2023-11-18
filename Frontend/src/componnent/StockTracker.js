import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockTracker = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);

  // Fetch predefined stocks from the backend
  useEffect(() => {
    axios.get('http://localhost:3005/api/stocks')
      .then(response => {
        setStocks(response.data);
        if (response.data.length > 0) {
          setSelectedStock(response.data[0].symbol); // Select the first stock by default
          setSelectedPrice(response.data[0].price);
        }
      })
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  // Update stock price every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedStock !== '') {
        axios.put(`http://localhost:3005/api/stocks/${selectedStock}`)
          .then(response => {
            setSelectedPrice(response.data.price);
          })
          .catch(error => console.error('Error updating stock price:', error));
      }
    }, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(interval);
  }, [selectedStock]);

  const handleStockChange = event => {
    const symbol = event.target.value;
    setSelectedStock(symbol);
    const selected = stocks.find(stock => stock.symbol === symbol);
    if (selected) {
      setSelectedPrice(selected.price);
    }
  };

  return (
    <div>
      <h1>Stock Price Tracker</h1>
      <select value={selectedStock} onChange={handleStockChange}>
        {stocks.map(stock => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol}
          </option>
        ))}
      </select>
      <p>Selected Stock: {selectedStock}</p>
      <p>Current Price: {selectedPrice}</p>
    </div>
  );
};

export default StockTracker;
