import React, { useEffect, useState } from 'react';
/** @typedef {import('../types').Expense} Expense */
/** @typedef {import('../types').ExpensesList} ExpensesList */
// Form is currently not used but left commented for future form wrapper use.
// If you want to use a <Form> wrapper later, uncomment the Form import below.
// import { Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import { FormGroup, Label, Input, Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import ExpenseList from '../components/ExpenseList';
import { EXPENSES } from '../data/Expenses';
import { useDispatch } from 'react-redux';

function Expenses() {
  const [merchant, setMerchant] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState();
  /**
   * Tracks whether we've recently saved an expense. Kept for UX hooks (e.g. show a toast or disable inputs).
   * Currently not used in rendering; intentionally preserved for future behavior.
   *
   * The state declaration below is commented out to avoid ESLint `no-unused-vars` warnings while
   * keeping the original code visible for quick re-enable later.
   */
  // const [expenseSaved, setExpenseSaved] = useState(false);
  /** @type {ExpensesList} */
  const [expenses, setExpenses] = useState(EXPENSES);
  const [disableButton, setDisableButton] = useState(false);

  const dispatcher = useDispatch();

  /*
    useEffect: Run a "side effect" callback
      1st arg: Callback
      2nd arg: Dependencies (when do you want to run your callback, what changes are you listening for?)
        - [] = Initial render
        - [list of state variables] = Only when those listed state variables are updated
        - null = Every render
  */
  useEffect(() => {
    // Side effect that we run after...
    let regex = /[a-zA-Z]+/; // Must have at least one letter in it

    if (regex.test(merchant) && regex.test(description)) {
      console.log('Passes validation')
      setDisableButton(false);
    } else {
      setDisableButton(true);
      console.log('Failed validation');
    }

    return () => {
      console.log('cleanup');
    }

  }, [merchant, description]);

  useEffect(() => {
    if (amount <= 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [amount])

  useEffect(() => {
    // alert('Start by adding your first expense')
  }, [])

  const handleMerchantChange = (event) => {
    const value = event.target.value;
    // Store the user's value into "merchant" state
    setMerchant(value);
  }

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    // Store the user's value into "merchant" state
    setDescription(value);
  }
  const handleAmountChange = (event) => {
    const value = event.target.value;
    // Store the user's value into "merchant" state
    setAmount(value);
  }
  const handleTransactionDateChange = (event) => {
    const value = event.target.value;
    // Store the user's value into "merchant" state
    setTransactionDate(value);
  }

  const saveExpense = () => {
    // When button is clicked
    // setExpenseSaved(true); // state is currently commented out (see above). Uncomment if restoring UX hook.
    let newExpense = {
      merchant,
      description,
      amount,
      transactionDate
    };

    // POST to server and use the saved object returned (server typically assigns id)
    fetch('http://localhost:3001/expenses', {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      if (response.status === 201 || response.status === 200) {
        // parse the saved expense (should include id)
        const saved = await response.json();
        // update local state with the saved object (with id)
        setExpenses(prev => [...prev, saved]);
        // dispatch to redux with the saved object
        dispatcher({
          type: 'ADD_EXPENSE',
          addedExpense: saved
        });
      } else {
        console.error('Failed to save expense, status:', response.status);
      }
    }).catch((err) => {
      console.error('Network error saving expense:', err);
    })


  }

  console.log('all expenses', expenses);
  

  return (
    <section>
      <Card>
        <CardHeader>My Expenses</CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="merchant">Merchant</Label>
            <Input onChange={handleMerchantChange} type="text" id="merchant" placeholder="Enter merchant name" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input onChange={handleDescriptionChange}  type="text" id="description" placeholder="Enter description" />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input onChange={handleAmountChange}  type="number" id="amount" placeholder="Enter amount" />
          </FormGroup>
          <FormGroup>
            <Label for="transactionDate">Transaction Date</Label>
            <Input onChange={handleTransactionDateChange}  type="date" id="transactionDate" placeholder="Enter transaction date" />
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button disabled={disableButton} onClick={saveExpense} color="success">Save Expense</Button>
        </CardFooter>
      </Card>
      <hr />
      <Card>
        <CardHeader>All Expenses</CardHeader>
        <CardBody>
          <ExpenseList />
        </CardBody>
      </Card>
    </section>
  )
}

export default Expenses;