import { FETCH_RENTALS, FETCH_RENTAL_BY_ID, FETCH_RENTAL_BY_ID_SUCSESS, FETCH_RENTALS_SUCSESS } from './types';
import axios from 'axios';

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCSESS,
    rental
  }
}
const fetchRentalsSucsess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCSESS,
    rentals
  }
}

export const fetchRentals = () => {
  return function(dispatch){
    axios.get('/api/v1/rentals').then((rentals) =>{
      dispatch(fetchRentalsSucsess(rentals.data));
    })
  }
}

export const fetchRentalById = (rentalId) => {
  return function(dispatch){

    axios.get(`/api/v1/rentals/${rentalId}`).then((rental) =>{
      dispatch(fetchRentalByIdSuccess(rental.data));
    })
  }
}
