import React from 'react';
import SearchInput from './searchInput';
import ItemList from './itemList';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <SearchInput />
        <ItemList />
      </div>
    );
  }
}
export default App;
