import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './shared/Header';
import { RentalCard } from './components/rental/RentalCard';
import { RentalList } from './components/rental/rental-list';
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <RentalList />
        </div>

      </div>
    );
  }
}

export default App;
