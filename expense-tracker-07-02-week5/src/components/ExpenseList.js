import React, { useState } from 'react';
/** @typedef {import('../types').Expense} Expense */
/** @typedef {import('../types').ExpensesList} ExpensesList */
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

/*
  useState() hook = Tells React about data changing and re-render my component
  Returns array, contains 2 elements
    1. Pointer to the data you're tracking
    2. Special function to update the data
*/

const ExpenseList = (props) => {
  const [ showExpenses, setShowExpense ] = useState(true);
  const [ totalExpensesToShow, setTotalExpensesToShow ] = useState(10);

  /** @type {ExpensesList} */
  const expenses = useSelector(state => state.expenses);
  const dispatcher = useDispatch();

  console.log('My Expenses', expenses);
  

  const renderExpenses = () => {

    if (showExpenses) {
  /** @type {JSX.Element[]} */
  const results = [];
      for (let i = 0; i < totalExpensesToShow; i++) {
        if (!expenses[i]) break;

        results.push(
          <tr key={expenses[i].merchant}>
            <td>
              <Link to={`/expenses/${expenses[i].id}`}>
                {expenses[i].merchant}
              </Link>
            </td>
            <td>
              {expenses[i].description}
            </td>
            <td>
              {expenses[i].amount}
            </td>
            <td>
              {expenses[i].transactionDate}
            </td>
          </tr>
        );
      }
      return results;

      // return expenses.map(expense => {
      //   return (
      //     <li key={expense.merchant}>{expense.merchant}: {expense.amount}</li>
      //   )
      // })
    }
  }
  

  const hideExpenses = () => {
    // showExpenses = false; -- React doesn't know to re-render component
    // setShowExpense(false); // Provide the new value of showExpenses

    // Dispatch an action to delete all expenses
    dispatcher(
      {
        type: 'DELETE_ALL_EXPENSES'
      }
    )
    // After clearing the data, hide the table to indicate the list is empty.
    // The user can still use the Toggle button to show the list again (it will be empty).
    setShowExpense(false);
  }

  const handleResultsChange = (event) => {
    const selectedResults = event.target.value; // Capture the dropdown's selected value
    setTotalExpensesToShow(selectedResults);
  }

  return (
    <section>
      {/* Toggle visibility (uses setShowExpense) - this makes the setter used 
      and provides a small UX control. */}
      <Button size="sm" color="secondary" className="me-2" onClick={() => setShowExpense(s => !s)}>
        {showExpenses ? 'Hide' : 'Show'} Expenses
      </Button>
      {showExpenses && <Button onClick={hideExpenses} size='sm' color='primary' className='float-end'>Clear</Button>}
      Results to show: <select onChange={handleResultsChange} value={totalExpensesToShow}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
      <Table striped>
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {renderExpenses()}

        </tbody>
      </Table>
    </section>
  )
};

export default ExpenseList;

// <ExpenseList /> - ExpenseList();
/*
  ExpenseList(); // showExpenses = true
  ExpenseList(); // showExpenses = false
*/

// function sayName() {
//   console.log('My name is Jane');
// };

// sayName(); // My name is Nas
// sayName(); // My name is Mary
// sayName(); // My name is Jane