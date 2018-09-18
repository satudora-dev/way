import React, { Component } from 'react';

class TagLabel extends Component {
  constructor(props){
    super(props);
    this.state={
      value: props.value,
    };
    this.onClick=this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value,
    });
  }

  onClick(e){
    this.setState({onEdit: true});
  }

  clickEvent(){
    if(this.props.onClick) this.props.onClick();
  }

  render() {
    const style = {
      tagbtnstyle: {
        "padding-top": "5px",
        "padding-bottom": "5px",
        "margin-right": "10px",
        "background-color": "#04B486",
        "color": "white",
        "text-transform": "none",
      },
    }

    return (
      <span style={style.tagbtnstyle}>{this.state.value}</span>
    );
  }
}

export default TagLabel;
