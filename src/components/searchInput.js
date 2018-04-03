import React from 'react';
import {connect} from 'react-redux';
import {inputValue, toggleItem} from '../controller/actions';

class SearchInput extends React.Component {
  changeHandler = (e) => {
    let {dispatch} = this.props;
    let {value} = e.target;
    location.hash = value;
    dispatch(inputValue(value));
  }
  componentDidMount() {
    this.input.focus();
  }

  render() {
    let {dispatch} = this.props;
    return (
      <div>
        <div className="search-input">
          <label>I need...</label>
          <input type="text" ref={(el) => (this.input = el)} onChange = {this.changeHandler} />
          <span style={{fontSize: '12px'}} onClick={() => dispatch(toggleItem())}>show desc</span>
        </div>
      </div>
    );
  }
}

export default connect()(SearchInput);

