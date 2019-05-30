import { FETCH_RENTALS, FETCH_RENTAL_BY_ID, FETCH_RENTAL_BY_ID_SUCSESS, FETCH_RENTALS_SUCSESS} from '../actions/types';

const INITIAL_STATE={
  rentals:{
     data: []
  },
  rental: {
    data:{}
  }
}

export const rentalReducer = (state=INITIAL_STATE.rentals, action) => {
  switch(action.type) {
    case FETCH_RENTALS_SUCSESS:
      return {...state, data: action.rentals}
    default:
      return state;
  }
}

export const selectedRentalReducer = (state=INITIAL_STATE.rental, action) => {
  switch(action.type){
    case FETCH_RENTAL_BY_ID_SUCSESS:
     return {...state, data:action.rental}
    default:
      return state
  }
}
