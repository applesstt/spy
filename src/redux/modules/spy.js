const LIST_SPY = 'redux-example/spy/LIST_SPY';
const LIST_SPY_SUCCESS = 'redux-example/spy/LIST_SPY_SUCCESS';
const LIST_SPY_FAIL = 'redux-example/spy/LIST_SPY_FAIL';
const CREATE_SPY = 'redux-example/spy/CREATE_SPY';
const CREATE_SPY_SUCCESS = 'redux-example/spy/CREATE_SPY_SUCCESS';
const CREATE_SPY_FAIL = 'redux-example/spy/CREATE_SPY_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LIST_SPY:
      return {
        ...state
      };
    case LIST_SPY_SUCCESS:
      return {
        ...state,
        ...action.result,
        listError: null
      };
    case LIST_SPY_FAIL:
      return {
        ...state,
        listError: action.error
      };
    case CREATE_SPY:
      return {
        ...state
      };
    case CREATE_SPY_SUCCESS:
      return {
        ...state,
        createError: null
      };
    case CREATE_SPY_FAIL:
      return {
        ...state,
        createError: action.error
      };
    default:
      return state;
  }
}

export function list(data) {
  return {
    types: [LIST_SPY, LIST_SPY_SUCCESS, LIST_SPY_FAIL],
    promise: (client) => client.get('/spy/list', {
      params: data
    })
  };
}

export function create(values) {
  return {
    types: [CREATE_SPY, CREATE_SPY_SUCCESS, CREATE_SPY_FAIL],
    promise: (client) => client.post('/spy/create', {
      data: values
    })
  };
}
