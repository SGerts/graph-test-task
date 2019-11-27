import React, { useState } from 'react';
import {Route, Router, Switch} from 'react-router'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import 'react-virtualized/styles.css';

import './App.css';
import history from './history';
import ChartPage from './ChartPage';
import TablePage from './TablePage';

export const FormContext = React.createContext({
  formValues: {},
  changeForm: () => {}
});

export const ChartContext = React.createContext({
  plot: [],
  setPlot: () => {}
});

export const TableContext = React.createContext({
  table: [],
  filter: '',
  setTable: () => {},
  setFilter: () => {}
});

export default function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [plot, setPlot] = useState([]);
  const [table, setTable] = useState([]);
  const [filter, setFilter] = useState('');

  const toggle = () => setIsOpen(!isOpen);
  const navigate = (path) => () => history.push(path);
  const _setFormValues = (name, value) => setFormValues({ ...formValues, [name]: value });

  return (
    <Router history={history}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Сбербанк</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={navigate('/')}>График</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={navigate('/table')}>Таблица</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <div className='app'>
        <Switch>
          <Route path="/table">
            <TableContext.Provider value={{ table, filter, setTable, setFilter }}>
              <TablePage />
            </TableContext.Provider>
          </Route>
          <Route>
            <ChartContext.Provider value={{ plot, setPlot }}>
              <FormContext.Provider value={{ formValues, changeForm: _setFormValues }}>
                <ChartPage />
              </FormContext.Provider>
            </ChartContext.Provider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



   
