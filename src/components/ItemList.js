import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsHandler, fetchPostsSuccess} from '../controller/actions';
import Item from './Item';

class ItemList extends React.Component {
  hashchangeHandler() {
    let {dispatch, revData} = this.props;
    let items = filterItems(revData, unescape(location.hash.substring(1)));
    dispatch(fetchPostsSuccess(items));
  }
  componentDidMount() {
    let {dispatch} = this.props;
    dispatch(fetchPostsHandler());
    window.addEventListener('hashchange', this.hashchangeHandler.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashchangeHandler.bind(this));
  }
  render() {
    let {data, showDetail, loading} = this.props;
    return (
      data ? <ul>
        {data.map((item, idx) =>
          <Item key={idx}>
            <h5 style={{margin: 0, padding: 0}}>{item.name}</h5>
            {showDetail && <p style={{fontSize: '12px'}}>{item.description}</p>}
          </Item>
        )}
      </ul> : loading ? <span className="loading">loading...</span> : null
    );
  }
}


function random() {
  return Math.random() - 0.5;
}

function replaceChars(value) {
  return value
    .replace(/\./g, '\\.')
    .replace(/\?/g, '\\?')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\^/g, '\\^')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\$/g, '\\$');
}

function traverseItems(item, match) {
  let result = null;
  if (!match) result = true;
  for (var prop in item) {
    if (item[prop].constructor !== Array) {
      if (/(?:size|ghwatchers|ghforks)/.test(prop)) {
        continue;
      }
      if (match.test(item[prop])) {
        result = true;
      }
    } else {
      result = traverseItems(item[prop], match);
    }
  }
  return result;
}

function filterItems(data, value) {
  value = replaceChars(value);
  let match = new RegExp(value, 'im');
  return data && data.filter(item => traverseItems(item, match));
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    showDetail: state.detail,
    data: (function() {
      let hash = location.hash;
      if (!state.revData && state.data) {
        state.revData = state.data.sort(random);
        return hash.length ? filterItems(state.data, unescape(hash.substring(1))) : state.data;
      }
      return filterItems(state.revData, unescape(hash.substring(1)));
    }())

  };
}

export default connect(mapStateToProps)(ItemList);

