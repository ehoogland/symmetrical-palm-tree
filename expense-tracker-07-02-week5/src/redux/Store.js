import { createStore } from "redux";
import ExpenseReducer from "./ExpenseReducer";
// import { EXPENSES } from "../data/Expenses";

const store = createStore(
  // 1st arg: Reducers
  ExpenseReducer,
  // 2nd arg: Initial state
  {
    expenses: []
  }
);

export default store;