import React, { Component }from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Header } from './shared/Header';
import RentalListing from './components/rental/rental-listing';
import RentalDetail from './components/rental/rental-detail';

import { init } from './reducers';

const store = init();

class App extends Component {

  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div>
            <Header />
            <div className='container'>
              <Route exact path='/' render={() => <Redirect to='/rentals'/> } />
              <Route exact path='/rentals' component={RentalListing} />
              <Route exact path='/rentals/:id' component={RentalDetail} />
            </div>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
