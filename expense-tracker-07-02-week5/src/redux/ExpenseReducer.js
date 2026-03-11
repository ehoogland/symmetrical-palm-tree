function ExpenseReducer(state, action) {
  if (action.type === 'ADD_EXPENSE') {
    // How to add a new object into an array
    
    // State is immutable
    const newState = { ...state, expenses: [ ...state.expenses, action.addedExpense ] }
    return newState;
  } else if (action.type === 'DELETE_ALL_EXPENSES') {
    return { ...state, expenses: [] }
  } else if (action.type === 'LOAD_EXPENSES') {
    return { ...state, expenses: action.expenses }
  }

  return state;
};

export default ExpenseReducer;