import React from 'react';
import { useParams } from 'react-router-dom';
import { EXPENSES } from '../data/Expenses';
import { useSelector } from 'react-redux'; // Hook to access redux state. Added to ensure
// we can get expenses from the store as well as the static data.
/** @typedef {import('../types').Expense} Expense */
/**
 * ExpenseDetails component for displaying individual expense details.
 * @variable {Object} params - URL parameters from React Router.
 * @variable {Expense | undefined} expense - The expense object found by ID.
 * @method find - Finds the expense in the EXPENSES array matching the ID from params.
 *
 * @returns {JSX.Element} The ExpenseDetails component.
 */
function ExpenseDetails() {
  const params = useParams();

  console.log('params are', params);

  const storeExpenses = useSelector(state => state.expenses || []);
  /** @type {Expense | undefined} */
  const expense = storeExpenses.find(exp => exp.id && exp.id.toString() === params.id) 
  || EXPENSES.find(exp => exp.id.toString() === params.id);

  if (!expense) {
    return <p>Unable to locate expense, try again...</p>
  }
  
  return (
    <section>
      Viewing individual expense details
      <hr />
      <p>Merchant: {expense.merchant}</p>
      <p>Amount: {expense.amount}</p>
    </section>
  )
};

export default ExpenseDetails;