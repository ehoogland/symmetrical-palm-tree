import { useState } from 'react';
import HomePage from './components/HomePage';
import RandomPage from './components/RandomPage';
import StockETFPage from './components/StockETFPage';
import ColorSchemesExample from './components/NavBar';
import { TEST_STOCKS } from "./TEST_STOCKS";
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  /**
   * App is the main component of the application.
   * It manages the state of tradeable stocks and renders the HomePage component.
   * The tradeable stocks are initialized with a predefined list from TEST_STOCKS.
   * TEST_STOCKS allows you to have a predefined list of stocks preloaded.

   * We don't want the HomePage to to just re-render with the same stocks--which happens
   * if you just import it--so we use state to manage the list of tradeable stocks.
   * The customer can then add to, modify and filter the list.
   */
  const [tradeableStocks, setTradeableStocks] = useState( TEST_STOCKS );

  return (
    <div>
      <ColorSchemesExample />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<HomePage tradeableStocksList={tradeableStocks} />} />
          <Route path="/random" element={<RandomPage tradeableStocksList={tradeableStocks} />} />
          {/* If the route is the stock detail page, show the StockETFPage component */}
          <Route path="/stocks/:stockId" element={<StockETFPage tradeableStocksList={tradeableStocks} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
