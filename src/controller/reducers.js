const initState = {
  detail: false,
  revData: null
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
  case 'FETCH_REQUEST':
    return {...state, loading: true};
  case 'INPUT':
    return {...state, value: action.value};
  case 'TOGGLE_ITEM':
    return {...state, detail: !state.detail};
  case 'FETCH_ERROR':
    return {...state, loading: false};
  case 'FETCH_SUCCESS':
    return {...state, data: action.data, loading: false};
  default:
    return state;
  }
};
