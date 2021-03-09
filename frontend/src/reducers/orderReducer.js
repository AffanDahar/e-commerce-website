import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIIVER_REQUEST,
  ORDER_DELIIVER_FAIL,
  ORDER_DELIIVER_RESET,
  ORDER_DELIIVER_SUCCESS
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const orderDeatailReducer = (
  state = { loading: true, orderItems: [], shippingAddres: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIIVER_REQUEST:
      return {
        loading: true
      };
    case ORDER_DELIIVER_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ORDER_DELIIVER_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_DELIIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_LIST_MY_RESET:
      return {
        orders: []
      };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
  
    default:
      return state;
  }
};