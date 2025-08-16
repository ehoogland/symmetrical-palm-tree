import { useParams } from 'react-router-dom';

export default function StockETFPage({ tradeableStocksList }) {
    /* using let because we are going to parse the stockId from the URL and will 
    need to change its type to a number */
    let { stockId } = useParams();
    stockId = parseInt(stockId); // Ensure stockId is a number

    const stock = tradeableStocksList.find(s => s.id === stockId);

    if (!stock) {
      return <p className='text-danger ms-2'>Stock not found</p>;
    }

  return (
    <div>
      <h2>Welcome to the Stock and ETF Page</h2>
      {/** Ternary operator check in a render method:
       * stock ? - Checks whether stock is truthy (it exists and is not null/undefined)
       * ( - If true, render everything after this opening parenthesis
       * ) : ( - If false, render everything after the colon
       * ) - Closes the conditional */}
      {stock ? (
        <div>
          <h3>{stock.name}</h3>
          <p>Ticker: { stock.symbol }</p>
          <p>Type: { stock.type }</p>
        </div>
      ) : (
        <p className='text-danger ms-2'>Stock not found</p>
      )}
    </div>
  );
}
