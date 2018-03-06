import apiConfig from '../../config/api.config';

const { restaurants: restaurantsEndpoint } = apiConfig.endpoints;

export const types = {
  FETCH_RESTAURANT_LIST_SUCCESS: 'FETCH_RESTAURANT_LIST_SUCCESS',
  FETCH_RESTAURANT_LIST_FAIL: 'FETCH_RESTAURANT_LIST_FAIL',
  FETCH_RESTAURANT_HIDE_SUCCESS: 'FETCH_RESTAURANT_HIDE_SUCCESS',
  FETCH_RESTAURANT_HIDE_FAIL: 'FETCH_RESTAURANT_HIDE_FAIL',
};

/**
 * This method returns action's object in the success fetch from restaurants
 *
 * @param {array} payload
 */
const fetchRestaurantListSuccess = payload => ({
  type: `${types.FETCH_RESTAURANT_LIST_SUCCESS}`,
  payload,
});

/**
 * This method returns action object in the fail fetch from restaurants
 *
 * @param {object} payload
 */
const fetchRestaurantListFail = payload => ({
  type: `${types.FETCH_RESTAURANT_LIST_FAIL}`,
  payload,
});

/**
 * This method fetches restaurant's list from api
 */
const fetchRestaurantList = () => async dispatch => {
  try {
    const response = await fetch(restaurantsEndpoint, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const restaurants = await response.json();

    dispatch(fetchRestaurantListSuccess(restaurants || []));
  } catch (e) {
    dispatch(fetchRestaurantListFail(e));
  }
};

/**
 * This method returns action object in the success fetch when it hides restaurant
 *
 * @param {object} payload
 */
const fetchRestaurantHideSuccess = payload => ({
  type: `${types.FETCH_RESTAURANT_HIDE_SUCCESS}`,
  payload,
});

/**
 * This method returns action object in the fail fetch when it hide restaurant
 *
 * @param {object} payload
 */
const fetchRestaurantHideFail = payload => ({
  type: `${types.FETCH_RESTAURANT_HIDE_FAIL}`,
  payload,
});

/**
 * This method fetches hide restaurant by id from api
 *
 * @param {string} id
 */
const fetchRestaurantHide = id => async dispatch => {
  try {
    const response = await fetch(`${restaurantsEndpoint}/${id}`, {
      method: 'post',
      body: JSON.stringify({ isVisible: false }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    dispatch(fetchRestaurantHideSuccess(id));
  } catch (e) {
    dispatch(fetchRestaurantHideFail(e));
  }
};

export const actions = {
  fetchRestaurantListSuccess,
  fetchRestaurantListFail,
  fetchRestaurantList,
  fetchRestaurantHide,
};
