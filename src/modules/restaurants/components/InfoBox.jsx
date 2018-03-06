import React from 'react';
import PropTypes from 'prop-types';

/**
 * This method generates latLng
 *
 * @param {object} restaurant
 */
const getLatLngString = restaurant => {
  const { lat, lng } = restaurant.geometry[0].location;

  return `Long ${lng}, Lat ${lat}`;
};

/**
 * InfoBox component renders main information
 *
 * @param {object} props
 */
const InfoBox = props => (
  <div style={styles.root}>
    <div style={{ ...styles.infoContainer, ...styles.left }}>
      <div style={{ ...styles.infoBlock }}>
        <strong>{props.restaurant.formatted_address}</strong>
      </div>
      <div style={{ ...styles.infoBlock }}>
        <strong>{getLatLngString(props.restaurant)}</strong>
      </div>
    </div>
    <div style={{ ...styles.infoContainer, ...styles.right }}>
      <button style={styles.buttonHide} onClick={() => props.handleHide()}>
        Hide this place
      </button>
    </div>
  </div>
);

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '10%',
    border: '1px solid',
    transition: 'flex 0.5s ease',
  },
  infoContainer: {
    display: 'flex',
    width: '50%',
    flexFlow: 'column',
    padding: 20,
  },
  infoBlock: {
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
  },
  left: {
    justifyContent: 'left',
  },
  right: {
    alignItems: 'flex-end',
  },
  buttonHide: {
    width: '25%',
    height: 30,
    cursor: 'pointer',
    color: 'white',
    fontSize: 15,
    backgroundColor: 'red',
    border: '2px solid',
    borderRadius: '4px',
  },
};

InfoBox.propTypes = {
  restaurant: PropTypes.object.isRequired,
  handleHide: PropTypes.func.isRequired,
};

export default InfoBox;
