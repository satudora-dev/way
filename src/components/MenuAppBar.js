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

    const style = {
      table: {
        "display": "table",
        width: "100%",
      },
      imgWrap: {
        display: "table-cell",
        "text-align": "center",
        "vertical-align": "middle",
      },
      logoImg: {
        height: "30px",
      },
    }

    return(
      <div>
        <AppBar position="static" color="default" style={{height: "56px"}}>
          <Toolbar>
            <div style={style.table}>
              <div style={style.imgWrap}>
                <img src="/way.png" style={style.logoImg}
                     alt="loading the way image..." />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default MenuAppBar;
