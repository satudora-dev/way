import React from 'react';

class App extends React.Component {
  componentWillMount(){
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <h2>Now Loading ...</h2>
      </div>
    );
  }
}

export default App;
