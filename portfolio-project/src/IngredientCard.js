/**
 * IngredientCard component
 *
 * @param {{
 *   ingredient: { id?: number|string, name: string, altNames?: string[], category?: string, processed?: boolean },
 *   isSelected?: boolean,
 *   onSelect?: function,
 *   onRemove?: function
 * }} props
 */
function IngredientCard({ ingredient, isSelected = false, onSelect, onRemove }) {
    // Function to get category-specific CSS class
    const getCategoryClass = (category) => {
        const categoryLower = category.toLowerCase().replace(/\s+/g, '-');
        const categoryMap = {
            'legumes': 'category-legumes',
            'grains': 'category-grains', 
            'grain': 'category-grains',
            'vegetables': 'category-vegetables',
            'fruits': 'category-fruits',
            'seeds': 'category-seeds',
            'spices': 'category-spices',
            'herbs': 'category-herbs',
            'dairy-alternatives': 'category-dairy-alternatives',
            'spreads': 'category-spreads',
            'condiments': 'category-condiments',
            'sweeteners': 'category-sweeteners',
            'breads': 'category-breads',
            'pasta': 'category-pasta',
            'flours': 'category-flours',
            'baking': 'category-baking',
            'vinegars': 'category-vinegars',
            'soy': 'category-soy',
            'sea-vegetables': 'category-sea-vegetables',
            'plant-based-dairy': 'category-plant-based-dairy',
            'plant-based-condiments': 'category-plant-based-condiments',
            'plant-based-dietary-supplements': 'category-plant-based-dietary-supplements',
            'meat-alternatives': 'category-meat-alternatives',
            'dietary-supplements': 'category-dietary-supplements',
            'plant-based-snacks': 'category-plant-based-snacks',
            'plant-based-desserts': 'category-plant-based-desserts',
            'plant-based-beverages': 'category-plant-based-beverages',
            'processed-foods': 'category-processed-foods'
        };
        return categoryMap[categoryLower] || 'category-default';
    };

  // Parse ingredient name and alternative names
  // Handles formats like "Chickpeas | Garbanzo beans, Ceci" or 
  // "Chickpeas (Garbanzo beans, Ceci)"
  const parseIngredientName = (name) => {
    const match = name.match(/^([^|]+)\s*\|\s*(.+)$/);
    if (match) {
      return {
        primary: match[1].trim(),
        alternatives: match[2].split(',').map(alt => alt.trim())
      };
    }
    const parenMatch = name.match(/^([^(]+)\s*\(([^)]+)\)$/);
    if (parenMatch) {
      return {
        primary: parenMatch[1].trim(),
        alternatives: parenMatch[2].split(',').map(alt => alt.trim())
      };
    }
    return { primary: name, alternatives: [] };
  };

  // Prefer altNames from ingredient object if present
  const { primary, alternatives: parsedAlternatives } = parseIngredientName(ingredient.name);
  const alternatives = ingredient.altNames && Array.isArray(ingredient.altNames) && ingredient.altNames.length > 0
    ? ingredient.altNames
    : parsedAlternatives;

  // Debug log
  console.log('IngredientCard:', { name: ingredient.name, primary, altNames: ingredient.altNames, alternatives });
    
    // Dynamic font size based on name length
    const getFontSize = (name) => {
        if (name.length > 12) return '0.95rem';  // Smaller for long names like "Garbanzo beans"
        if (name.length > 8) return '1.05rem';   // Medium for moderate names
        return '1.1rem';  // Standard size for short names
    };

    return (
        <div 
          className={`ingredient-card d-flex flex-column h-100 ${isSelected ? 'selected' : ''}`}
          onClick={() => onSelect && onSelect(ingredient)}
          style={{ 
            cursor: onSelect ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            transform: isSelected ? 'scale(0.98)' : 'scale(1)',
            opacity: isSelected ? '0.8' : '1',
            position: 'relative'
          }}
        >   
          {/* Remove button (shows if onRemove prop provided) */}
          {onRemove && (
            <label
              className="position-absolute d-flex align-items-center"
              style={{ bottom: 8, right: 8, zIndex: 2, background: 'rgba(255,255,255,0.85)', padding: '4px 8px', borderRadius: 12, cursor: 'pointer' }}
              title="Remove ingredient"
            >
              <input
                type="checkbox"
                className="form-check-input"
                style={{ width: 16, height: 16, marginRight: 6 }}
                onClick={e => e.stopPropagation()}
                onChange={e => {
                  // stop bubbling and invoke remove when checked; then reset checkbox
                  e.stopPropagation();
                  if (e.target.checked) {
                    onRemove(ingredient);
                    // uncheck so it remains unobtrusive
                    e.target.checked = false;
                  }
                }}
              />
              <small style={{ margin: 0, fontSize: '0.8rem', color: 'var(--vegan-dark)' }}>Remove</small>
            </label>
          )}
          {/* Debug info for troubleshooting */}
          <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '2px', display: 'none' }}>
            {ingredient.name} | {primary}
          </div>
          {isSelected && (
            <div className="selection-indicator">
              <span className="badge bg-success position-absolute" 
                    style={{ top: '8px', right: '8px', zIndex: 2 }}>
                ✓
              </span>
            </div>
          )}
          <div className="mb-3 flex-grow-1">
            <h4 className="mb-1" style={{ 
              fontSize: getFontSize(primary),
              lineHeight: '1.2',
              color: 'var(--vegan-dark)',
              fontWeight: '600'
            }}>
              <span className="plant-icon">🌱</span>
              {primary && primary.trim() ? primary : 'Unknown'}
            </h4>
            {alternatives.length > 0 && (
              <small className="text-muted" style={{ 
                fontSize: '0.7rem',  // Made even smaller
                fontStyle: 'italic',
                display: 'block',
                lineHeight: '1.1'
              }}>
                Also known as: {alternatives.join(', ')}
              </small>
            )}
          </div>
          <div className="mt-auto">
            <div className="mb-2">
              <span className={`category-badge ${getCategoryClass(ingredient.category)}`}>
                {ingredient.category}
              </span>
            </div>
            <div className={`processed-indicator ${ingredient.processed ? 'processed-yes' : 'processed-no'}`}>
              {ingredient.processed ? '🏭' : '🌿'} 
              <span className="ms-1">
                {ingredient.processed ? 'Processed' : 'Whole Food'}
              </span>
            </div>
          </div>
        </div>
    )
}

export default IngredientCard;  