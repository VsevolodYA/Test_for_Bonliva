import React from 'react';
import Map from './components/Map';
import InfoBox from './components/InfoBox';
import PropTypes from 'prop-types';
import { actions } from '../../redux/restaurants/actions';

/**
 * Restaurants' component
 */
class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapContainerElementHeight: '100%',
      chosenRestaurant: null,
      markerGoogleMapInstance: null,
    };

    props.dispatch(actions.fetchRestaurantList());
  }

  /**
   * this method generates marker's list from restaurant's list
   *
   * @param {array} restaurants
   */
  generateMarkers = (restaurants = []) =>
    restaurants.filter(restaurant => restaurant.isVisible).map(restaurant => ({
      location: restaurant.geometry[0].location,
      _id: restaurant._id,
    }));

  /**
   * This method returns restaurant by id
   *
   * @param {string} id
   */
  getRestaurantById = id => this.props.restaurants.find(restaurant => restaurant._id === id);

  /**
   * @param {string} restaurantId
   * @param {object} markerGoogleMapInstance - google maps marker instance
   */
  handleMarkerClick = (restaurantId, markerGoogleMapInstance) => {
    if (markerGoogleMapInstance.getAnimation()) {
      this.resetInfoBox();
      return markerGoogleMapInstance.setAnimation(null);
    }

    if (this.state.markerGoogleMapInstance) {
      this.state.markerGoogleMapInstance.setAnimation(null);
    }

    this.setState({
      mapContainerElementHeight: '90%',
      chosenRestaurant: restaurantId,
      markerGoogleMapInstance,
    });

    return markerGoogleMapInstance.setAnimation(this.props.google.maps.Animation.BOUNCE);
  };

  /**
   * this method resets map's container height, chosen restaurant and google maps marker instance
   */
  resetInfoBox = () => {
    this.setState({
      mapContainerElementHeight: '100%',
      chosenRestaurant: null,
      markerGoogleMapInstance: null,
    });
  };

  handleHide = () => {
    const { chosenRestaurant, markerGoogleMapInstance } = this.state;

    this.props.dispatch(actions.fetchRestaurantHide(chosenRestaurant));
    this.handleMarkerClick(chosenRestaurant, markerGoogleMapInstance);
  };

  render() {
    const { chosenRestaurant } = this.state;
    const { restaurants, google } = this.props;

    return (
      <div style={styles.root}>
        {chosenRestaurant && <InfoBox restaurant={this.getRestaurantById(chosenRestaurant)} handleHide={() => this.handleHide()} />}
        {google && (
          <Map
            restaurants={restaurants}
            onMarkerClick={this.handleMarkerClick}
            markers={this.generateMarkers(restaurants)}
            containerElement={
              <div
                style={{
                  ...styles.map.containerElement,
                  height: this.state.mapContainerElementHeight,
                }}
              />
            }
            mapElement={<div style={styles.map.containerElement} />}
          />
        )}
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    alignItems: 'center',
  },
  map: {
    containerElement: {
      width: '100%',
      height: '100%',
      transitionDuration: '0.5s',
    },
  },
};

Restaurants.propTypes = {
  restaurants: PropTypes.array.isRequired,
  google: PropTypes.object,
};

export default Restaurants;
