import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class MenuAppBar extends React.Component{
  state = {
    select: "projects",
  };

  handleChange = (event) => {
    this.setState({select: event.target.value})
  };


  render(){
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
                     alt="failed loading." />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default MenuAppBar;
