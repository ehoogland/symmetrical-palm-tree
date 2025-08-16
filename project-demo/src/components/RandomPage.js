export default function RandomPage({ tradeableStocksList }) {
    const randomStock = tradeableStocksList[Math.floor(Math.random() * tradeableStocksList.length)];
  return (
    <div className="ms-2">
      <h1>Random Page</h1>
      <div>
        {randomStock && (
          <div key={randomStock.id}>
            <h3>Our "Stock Dartboard" says buy...{randomStock.name}</h3>
            <p className="display-2">{randomStock.symbol}</p>
            <p className="h4">Exchange: {randomStock.exchange}</p>
            <p className="h4">Instrument Type: {randomStock.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}
