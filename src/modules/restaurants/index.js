import { connect } from 'react-redux';
import Restaurants from './Restaurants';

const mapStateToProps = state => ({
  restaurants: state.restaurant.restaurants,
  google: window.google,
});

export default connect(mapStateToProps)(Restaurants);
