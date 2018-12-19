import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import nowGroupList from '../nowGroupList';


const style = {
  tagStyle: {
    textAlign: "left",
    fontFamily: "Avenir",
    margin: "10px 30px",
    marginBottom: "40px",
  },
  btnStyle: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "#04B486",
    color: "white",
    textTransform: "none",
  },
}

export default class NowGroupFilter extends Component {

  filterNow(nowName) {
    if (nowName === 'all') {
      this.props.history.push('./users');
    }
    else {
      this.props.history.push(`./users?now=${nowName}`);
    }
  }

  render() {
    let nowGroup = ['all'];
    nowGroup = nowGroup.concat(nowGroupList);

    return (
      <div className="NowSwitch" style={style.tagStyle}>
        <FormGroup row>
          {nowGroup.map((item, i) => {
            return (
              <div key={i}>
                <Button
                  variant="contained"
                  style={style.btnStyle}
                  onClick={() => this.filterNow(item)} >
                  {item}
                </Button>
              </div>);
          })}
        </FormGroup>
      </div>
    );
  }
}
