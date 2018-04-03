export function fetchPostsRequest() {
  return {
    type: 'FETCH_REQUEST'
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: 'FETCH_SUCCESS',
    data
  };
}

export function toggleItem() {
  return {
    type: 'TOGGLE_ITEM'
  };
}

export function inputValue(value) {
  return {
    type: 'INPUT',
    value
  };
}

export function fetchPostsError() {
  return {
    type: 'FETCH_ERROR'
  };
}

export function fetchPostsHandler() {
  return dispatch => {
    dispatch(fetchPostsRequest());
    return fetchPosts().then(([res, json]) => {
      if (res.status === 200 || res.status === 304) {
        dispatch(fetchPostsSuccess(json));
      } else {
        dispatch(fetchPostsError());
      }
    });
  };
}

function fetchPosts() {
  const url = './data.json';
  return fetch(url, {method: 'GET'})
    .then(res => Promise.all([res, res.json()]));
}
