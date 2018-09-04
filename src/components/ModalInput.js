import React, { Component } from 'react';

class EditableLabel extends Component {
  constructor(props){
    super(props);
    this.state={
      value: props.value,
      onEdit: false,
    };
    this.onClick=this.onClick.bind(this);
    this.onTextChange=this.onTextChange.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.onFocusOut=this.onFocusOut.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value});
  }

  onTextChange(e){
    this.setState({value: e.target.value});
  }

  onClick(e){
    this.setState({onEdit: true});
  }

  handleKeyPress(e){
    let ENTER=13;
    if(e.keyCode===ENTER){
      this.setState({onEdit: false});
      this.props.onEditEnd(this.state.value);
    }
  }

  onFocusOut(e){
    this.setState({onEdit: false});
    this.props.onEditEnd(this.state.value);
  }

  render() {
    return (
      <div className="EditableLabel">
          {(()=>{
            if(this.state.onEdit){
              return(
                <input type="text" autoFocus
                  value={this.state.value}
                  onChange={this.onTextChange}
                  onKeyDown={this.handleKeyPress}
                  onBlur={this.onFocusOut}/>
              );
            }
            else{
              return(
                <h2 onClick={this.onClick}>
                {this.state.value}</h2>
              );
            }
          })()}
      </div>
    );
  }
}

export default EditableLabel;
