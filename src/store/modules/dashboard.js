import api from '../../helpers/ApiClient';

const CATEGORIES = 'CATEGORIES';
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
const CATEGORIES_FAIL = 'CATEGORIES_FAIL';

const POPULAR_PRODUCT = 'POPULAR_PRODUCT';
const POPULAR_PRODUCT_SUCCESS = 'POPULAR_PRODUCT_SUCCESS';
const POPULAR_PRODUCT_FAIL = 'POPULAR_PRODUCT_FAIL';

const PRODUCT = 'PRODUCT';
const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
const PRODUCT_FAIL = 'PRODUCT_FAIL';

const initialState = {
  isLoading: false,
  ErrorMessage: undefined,
  categories: undefined,
  popularProduct: undefined,
  product: undefined,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORIES: {
      return {...state, isLoading: true};
    }
    case CATEGORIES_SUCCESS: {
      return {...state, isLoading: false, categories: action.result};
    }
    case CATEGORIES_FAIL: {
      return {...state, isLoading: false, ErrorMessage: 'error'};
    }

    case POPULAR_PRODUCT: {
      return {...state, isLoading: true};
    }
    case POPULAR_PRODUCT_SUCCESS: {
      return {...state, isLoading: false, popularProduct: action.result};
    }
    case POPULAR_PRODUCT_FAIL: {
      return {...state, isLoading: false, ErrorMessage: 'error'};
    }

    case PRODUCT: {
      return {...state, isLoading: true};
    }
    case PRODUCT_SUCCESS: {
      return {...state, isLoading: false, product: action.result};
    }
    case PRODUCT_FAIL: {
      return {...state, isLoading: false, ErrorMessage: 'error'};
    }

    default:
      return state;
  }
}

export function getcategorieslist() {
  return (dispatch, getState) =>
    new Promise(function (resolve, reject) {
      dispatch({type: CATEGORIES});
      api
        .get('categories')
        .then(res => {
          dispatch({type: CATEGORIES_SUCCESS, result: res});
          resolve(res);
        })
        .catch(error => {
          console.log('api_error', error);
          dispatch({type: CATEGORIES_FAIL});
          reject(error);
        });
    });
}

export function getpopularproduct() {
  return (dispatch, getState) =>
    new Promise(function (resolve, reject) {
      dispatch({type: POPULAR_PRODUCT});
      api
        .get('popular-products')
        .then(res => {
          dispatch({type: POPULAR_PRODUCT_SUCCESS, result: res});
          resolve(res);
        })
        .catch(error => {
          console.log('api_error', error);
          dispatch({type: POPULAR_PRODUCT_FAIL});
          reject(error);
        });
    });
}

export function getproduct() {
  return (dispatch, getState) =>
    new Promise(function (resolve, reject) {
      dispatch({type: PRODUCT});
      api
        .get('products')
        .then(res => {
          dispatch({type: PRODUCT_SUCCESS, result: res});
          resolve(res);
        })
        .catch(error => {
          console.log('api_error', error);
          dispatch({type: PRODUCT_FAIL});
          reject(error);
        });
    });
}
