import {
  TOP_HEADLINE_REQUEST,
  TOP_HEADLINE_SUCCESS,
  TOP_HEADLINE_FAIL,
  SEARCH_TEXT,
  COUNTRY_LIST,
  COUNTRY_NAME,
} from "../constants/constants";

export const headLineReducer = (state = { headLines: [] }, action) => {
  switch (action.type) {
    case TOP_HEADLINE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case TOP_HEADLINE_SUCCESS:
      return {
        loading: false,
        article: action.payload,
      };
    case TOP_HEADLINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchReducer = (state = { searchQuery: "" }, action) => {
  switch (action.type) {
    case SEARCH_TEXT:
      return {
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};
export const countryNameReducer = (state = { name: "" }, action) => {
  switch (action.type) {
    case COUNTRY_NAME:
      return {
        name: action.payload,
      };
    default:
      return state;
  }
};
export const countryReducer = (state = { country: null }, action) => {
  switch (action.type) {
    case COUNTRY_LIST:
      return {
        country: action.payload,
      };
    default:
      return state;
  }
};