const LOAD = 'redux-example/articles/LOAD';
const LOAD_SUCCESS = 'redux-example/articles/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/articles/LOAD_FAIL';
const LOAD_ARTICLE = 'redux-example/articles/LOAD_ARTICLE';
const LOAD_ARTICLE_SUCCESS = 'redux-example/articles/LOAD_ARTICLE_SUCCESS';
const LOAD_ARTICLE_FAIL = 'redux-example/articles/LOAD_ARTICLE_FAIL';
const CREATE_ARTICLE = 'redux-example/articles/CREATE_ARTICLE';
const CREATE_ARTICLE_SUCCESS = 'redux-example/articles/CREATE_ARTICLE_SUCCESS';
const CREATE_ARTICLE_FAIL = 'redux-example/articles/CREATE_ARTICLE_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_ARTICLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...action.result,
        error: null
      };
    case LOAD_ARTICLE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CREATE_ARTICLE:
      return {
        ...state
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        createError: null
      };
    case CREATE_ARTICLE_FAIL:
      return {
        ...state,
        createError: action.error
      };
    default:
      return state;
  }
}

export function load(data) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/article/load', {
      params: data
    })
  };
}

export function loadArticle(articleId) {
  return {
    types: [LOAD_ARTICLE, LOAD_ARTICLE_SUCCESS, LOAD_ARTICLE_FAIL],
    promise: (client) => client.get('/article/loadArticle', {
      params: {articleId}
    })
  };
}

export function createArticle(values) {
  return {
    types: [CREATE_ARTICLE, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL],
    promise: (client) => client.post('/article/createArticle', {
      data: values
    })
  };
}
