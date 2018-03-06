import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

/**
 * This method returns latLng object of the first marker or default location
 *
 * @param {Array<object>} markers
 */
const getCenter = markers => {
  if (markers && markers.length > 0) {
    return markers[0].location;
  }

  return {
    lat: 59.32932349999999,
    lng: 18.0685808,
  };
};

const Map = withGoogleMap(props => (
  <GoogleMap defaultZoom={14} center={getCenter(props.markers)}>
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.location}
        onClick={function() {
          (function(marker, instance) {
            props.onMarkerClick(marker._id, instance);
          })(marker, this); // this usage functionality expression for get instance marker (google maps marker)
        }}
      />
    ))}
  </GoogleMap>
));

Map.propTypes = {
  markers: PropTypes.array.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
};

export default Map;
