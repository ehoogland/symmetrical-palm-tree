import React from 'react'; // Importing directly from a node_modules/package
import ReactDOM from 'react-dom/client';  // Importing directly from a node_modules/package
import './index.css'; // Importing all contents from a file
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './pages/Home'; // Importing something specific from a file
import Expenses from './pages/Expenses';
// Nav removed from the import because it is unused in this file. If you need to use
// the reactstrap Nav component here later, re-add it to the import list.
import { Container } from 'reactstrap';
import Navigation from './components/Navigation';
import ExpenseDetails from './pages/ExpenseDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/:id" element={<ExpenseDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </Provider>
);  // Rendering the App component -- App();

/*
  React Tree is just like HTML tree:
  <Components>
    <Component1></Component1>
    <Component2>
      <Component3 />
    </Component2>
  </Components>

  HTML Tree:
  <head></head>
  <body>
    <p></p>
  </body>
*/