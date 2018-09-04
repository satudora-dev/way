import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CheckInstax extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checked_instax: false,
    };
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange = name => event => {
    this.setState({
      checked_instax: event.target.checked,
    });
  }
  render(){
    return(
      <FormControlLabel
      control={
        <Checkbox
        checked={this.state.checked}
        onChange={this.handleChange}
        value="checked"
        />
      }
      label="チェキで撮った写真で登録してもらう"
      />
    );
  }
}

export default CheckInstax;
