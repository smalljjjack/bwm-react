import React from 'react';
import { connect } from 'react-redux';
import { RentalDetailInfo } from './rental-detail-info';
import * as actions from '../../actions';

class RentalDetail extends React.Component{

  componentWillMount(){
    const rentalId =  this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render(){
    const rental = this.props.rental;
    return(
      <section id='rentalDetails'>
        <div className='upper-section'>
          <div className='row'>
            <div className='col-md-6'>
              <img src={rental.image} alt=''></img>
            </div>
            <div className='col-md-6'>
              <img src={rental.image} alt=''></img>
            </div>
          </div>
        </div>

        <div className='details-section'>
          <div className='row'>
            <div className='col-md-8'>
              <RentalDetailInfo rental={rental}/>
            </div>
            <div className='col-md-4'> BOOKING</div>
          </div>
        </div>
      </section>

    )
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rental.data
  }
}

export default connect(mapStateToProps)(RentalDetail)
