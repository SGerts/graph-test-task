import React, {useState} from 'react';
import {Route, Router, Switch} from 'react-router'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import 'react-virtualized/styles.css';

import './App.css';
import history from './history';
import ChartPage from './ChartPage';
import TablePage from './TablePage';

export default function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = (path) => () => history.push(path);
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
            <TablePage />
          </Route>
          <Route>
            <ChartPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



   
