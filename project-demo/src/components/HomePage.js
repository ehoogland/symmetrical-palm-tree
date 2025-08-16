import React, { useState } from 'react';
import StockETFCard from './StockETFCard';

export default function HomePage({ tradeableStocksList }) {
  const [typeFilter, setTypeFilter] = useState('All');
  let filteredStocks
  if (typeFilter === 'All') {
    filteredStocks = tradeableStocksList;
  } 
  else {
    filteredStocks = tradeableStocksList.filter(stock => stock.type === typeFilter);
  }
  return (
    <div className="container-fluid">
        <div className="mb-3 ms-2">
          <button className="btn btn-primary me-2" onClick={() => setTypeFilter('All')}>Show All</button>
          <button className="btn btn-primary me-2" onClick={() => setTypeFilter('ETF')}>Show ETFs</button>
          <button className="btn btn-primary me-2" onClick={() => setTypeFilter('stock')}>Show Stocks</button>
        </div>
        <div className="ms-2">
          {filteredStocks.map(s => <StockETFCard key={s.id} stock={s} />)}
        </div>
    </div>
  );
}
