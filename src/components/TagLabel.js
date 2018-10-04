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
    if(this.props.onClick){
      this.props.onClick();
    }
  }

  render() {
    const style = {
      tagbtnstyle: {
        "background-color": "#04B486",
        "color": "white",
        "margin-right": "10px",
        "padding-bottom": "5px",
        "padding-top": "5px",
        "text-transform": "none",
      },
    }

    return (
      <span style={style.tagbtnstyle}>{this.state.value}</span>
    );
  }
}

export default TagLabel;
