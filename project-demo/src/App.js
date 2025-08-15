
import StockETFCard from './StockETFCard';

const tradeableStocks = [
  { id: 0, symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'stock' },
  { id: 1, symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'stock' },
  { id: 2, symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'stock' },
  { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'stock' },
  { id: 4, symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ', type: 'stock' },
  { id: 5, symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'stock' },
  { id: 6, symbol: 'ARM', name: 'Arm Holdings PLC-ADR', exchange: 'NASDAQ', type: 'stock' },
  { id: 7, symbol: 'QQQ', name: 'Invesco QQQ Trust', exchange: 'NASDAQ', type: 'ETF' },
  { id: 8, symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', exchange: 'NYSE', type: 'ETF' },
  { id: 9, symbol: 'DIA', name: 'SPDR Dow Jones Industrial Average ETF Trust', exchange: 'NYSE', type: 'ETF' }
];
// Import the StockETFCard component

function App() {
  return (
    <div>
      <h1>Tradeable Stocks</h1>
        {tradeableStocks.map(s => (
        <StockETFCard key={s.id} stock={s} />
        ))}
    </div>
  );
}

export default App;
