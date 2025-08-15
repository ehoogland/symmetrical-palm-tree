function StockETFCard(props) {
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
      <h4>{props.stock.name}</h4>
      <p>Symbol: {props.stock.symbol}</p>
      <p>Exchange: {props.stock.exchange}</p>
      <p>Type: {props.stock.type}</p>
      <p>Identifier: {props.stock.id}</p>
    </div>
  );
}

export default StockETFCard;