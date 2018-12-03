import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import nowGroupList from '../nowGroupList';

const style = {
  categoryStyle: {
    textAlign: "left",
    margin: "10px 30px",
    fontFamily: "Avenir",
  },
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
  disabledBtnStyle: {
    marginRight: "10px",
    marginBottom: "10px",
    textTransform: "none",
    color: 'black'
  },
}

export default class NowGroupSwitcher extends Component {
  constructor(props) {
    super(props);

    if (!props.nowGroup) {
      let initialNowGroup = {};
      for (let name of nowGroupList) {
        initialNowGroup[name] = false;
      }
      props.initializeNowGroup(initialNowGroup);
    }
  }

  onChange(nowName) {
    let nextNowGroup = this.props.nowGroup;
    nextNowGroup[nowName] = !this.props.nowGroup[nowName];
    this.props.updateNowGroup(nextNowGroup);
  }

  toNowPage(nowName) {
    this.props.history.push(`../users?now=${nowName}`);
  }

  render() {
    let nowGroup = this.props.nowGroup;
    return (
      <div className="NowSwitch">
        <h3 style={style.categoryStyle}>NOW</h3>
        <hr />
        {(() => {
          if (nowGroup) {
            return (
              <div style={style.tagStyle}>
                <FormGroup row>
                  {nowGroupList.map((item, i) => {
                    return (
                      <div key={i}>
                        {(() => {
                          if (this.props.canEdit) {
                            return(
                            <Checkbox
                              checked={nowGroup[item]}
                              onChange={() => this.onChange(item)}
                            />);
                          }
                        })()}
                        <Button
                          variant="contained"
                          disabled={!nowGroup[item]}
                          onClick={() => this.toNowPage(item)}
                          style={(() => {
                            if (nowGroup[item]) {
                              return style.btnStyle;
                            }
                            else {
                              return style.disabledBtnStyle;
                            }
                          })()}>
                          {item}
                        </Button>
                      </div>);
                  })}
                </FormGroup>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}