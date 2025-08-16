import { Link } from 'react-router-dom';

function StockETFCard({ stock }) {
    /**
     * StockETFCard is a functional component that displays information about a stock or ETF.
     * It receives a `stock` prop containing the relevant data.
     * The component is styled using Bootstrap classes.
     * bg-light - Light background color
     * border - Border around the card
     * p-4 - Padding of 1.5rem (24px) on all sides
     * m-2 - Margin of 0.5rem (8px) on all sides
     */
  return (
    <div className="bg-light border p-4 m-2">
      <h4>{stock.name}</h4>
      <p>Symbol: {stock.symbol}</p>
      <p>Exchange: {stock.exchange}</p>
      <p>Type: {stock.type}</p>
      <p>Identifier: {stock.id}</p>
      {/* React Component using older string concatenation for readability */}
      <Link to={"/stocks/" + stock.id}>View Details</Link>
       {/** Or create a React Component with a JavaScript template literal
        * for cleaner URL construction:
        * <Link to={`/stocks/${stock.id}`}>View Details</Link> */}
    </div>
  );
}

export default StockETFCard;