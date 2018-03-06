import { types } from './actions';

const initialState = {
  restaurants: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        restaurants: payload,
      };

    case types.FETCH_RESTAURANT_LIST_FAIL:
      console.log(payload);

      return {
        ...state,
      };

    case types.FETCH_RESTAURANT_HIDE_SUCCESS:
      const restaurants = state.restaurants.filter(restaurant => restaurant._id !== payload);
      return {
        ...state,
        restaurants,
      };

    case types.FETCH_RESTAURANT_HIDE_FAIL:
      console.log(payload);

      return {
        ...state,
      };

    default:
      return state;
  }
};
