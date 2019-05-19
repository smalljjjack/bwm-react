import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './shared/Header';
import { RentalCard } from './components/rental/RentalCard';
import { RentalList } from './components/rental/rental-list';
import { RentalDetail } from './components/rental/rental-detail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className='container'>
            <Route exact path='/rentals' component={RentalList} />
            <Route exact path='/rentals/:id' component={RentalDetail} />
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
