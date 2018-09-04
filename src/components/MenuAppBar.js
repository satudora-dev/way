import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class MenuAppBar extends React.Component{
  state = {
    select: "projects",
  };

  handleChange = (event) => {
    this.setState({select: event.target.value})
  };


  render(){
    const selects = [
      "projects",
      "offices",
    ];
    return(
      <div>
        <AppBar position="static" color="default">
          <Toolbar style={{
            display: "inline-block",
            "text-align": "right",
          }}>
              <Select
                mltiple
                value={this.state.select}
                onChange={this.handleChange}
                style={{
                  "padding-top": "18px",
                }}>
                {
                  selects.map(select => (
                    <MenuItem
                      key={select}
                      value={select}
                      >
                      {select}
                    </MenuItem>
                  ))
                }
              </Select>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default MenuAppBar;
