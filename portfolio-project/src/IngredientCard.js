function IngredientCard({ ingredient }) {
    return (
        <div className="bg-light border p-4 m-2">   
          <h4 className="mb-3">{ingredient.name}</h4>
          <p className="mb-2">Category: {ingredient.category}</p>
          <p>Processed: {ingredient.processed ? "Yes" : "No"}</p>
        </div>
    )
}

export default IngredientCard;  