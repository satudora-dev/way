import React from 'react';

class App extends React.Component {

  render() {
    this.props.history.push('./login')
    return (
      <div className="App">
        <h2>Now Loading ...</h2>
      </div>
    );
  }
}

export default App;
