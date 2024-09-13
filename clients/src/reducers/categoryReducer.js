import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        categories: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        categories: action.payload,
      };
    case ALL_CATEGORY_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
