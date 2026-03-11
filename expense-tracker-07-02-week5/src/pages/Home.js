import SubHeader from "../components/SubHeader";
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import ExpenseList from "../components/ExpenseList"; // Component to show list of expenses
import { useSelector, useDispatch } from "react-redux"; // Hooks to interact with redux
import { useEffect } from "react"; // Hook to run side effects
import { useNavigate } from 'react-router-dom'; // Hook to programmatically navigate

/*
  These JS functions are called "Components".

  Components MUST return JSX (JavaScript XML).
  XML (Extensible Markup Language)

  HTML:
  <p class='hi'>
    <span></span>
  </p>

  XML:
  <foobar>
    <whatever thisThing="1"></whatever>
  </foobar>

  <vehicles>
    <vehicle>
      <make>Chevy</make>
      <model>Impala</model>
    </vehicle>
  </Vehicles>


  React turns your XML into HTML using JS
    React.createElement('div', {
      class: 'App'
    })
*/

function App() {
  const getStarted = function() {
    // Programmatically navigate to the Expenses page
    navigate('/expenses');
  }

  const dispatcher = useDispatch();
  const navigate = useNavigate();

  // Fetch all my expenses when my app loads the first time
  useEffect(() => {
    // Save the data from the response into redux
    fetch('http://localhost:3001/expenses')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        // grab the data from the response
        const data = await response.json(); // returns a promise

        // dispatch to send to redux
        dispatcher({
          type: 'LOAD_EXPENSES',
          expenses: data
        })
      })
      .catch((err) => {
        // Handle network or parsing errors
        console.error('Failed to load expenses:', err);
      });
  }, [dispatcher]);

  // How to read the expenses from the redux store
  const expenses = useSelector(function(state) {
    return state.expenses;
  });

  console.log('expesnes are', expenses);
  

  return (
    <div>
    <Card className="mb-3">
      <CardHeader className="App-header">
        <SubHeader title="Welcome to our Expense Tracker Application" color="blue" tag="h1" />
        {/* <SubHeader title="Sample title 2" color="green" tag="h3" />
        <SubHeader title="Sample title 3" color="blue" tag="h5" />
        <SubHeader title="Sample title 4" /> */}
      </CardHeader>
      <CardBody>
        Get started by tracking your first Expense or entering in your Income
      </CardBody>
      <CardFooter className="text-center">
        <Button color="success" onClick={getStarted}>Get Started</Button>
        {/* <Button color="success" onClick={function(){}}>Get Started</Button> */}
      </CardFooter>
    </Card>
    <Row>
      <Col>
        <Card>
          <CardHeader>Recent Expenses</CardHeader>
          <CardBody>
            <ExpenseList />
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardHeader>Recent Deposits</CardHeader>
          <CardBody></CardBody>
        </Card>
      </Col>
    </Row>
    </div>
  );
}

export default App;