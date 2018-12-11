import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

class EditableProjectLabel extends Component {
  constructor(props){
    super(props);
    this.state={
      value: props.value,
      onEdit: false,
    };
    this.onClick=this.onClick.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.timeoutID=undefined;
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value,
      canEdit: nextProps.canEdit,
    });
  }

  onTextChange(e){
    this.setState({value: e.target.value});
  }

  onClick(e){
    this.setState({onEdit: true});
  }

  EndEdit(){
    this.setState({onEdit: false});
    this.props.onEditEnd(this.state.value);
  }

  handleKeyPress(e){
    const ENTER = 13;
    if(this.props.multiline) {
      if (e.keyCode === ENTER && e.shiftKey) this.state.value += '\n';
      if (!e.shiftKey && e.keyCode === ENTER) this.EndEdit();
    }else{
      if (e.keyCode === ENTER) this.EndEdit();
    }
  }

  clickEvent(){
    if(this.props.onClick) this.props.onClick();
  }

  onBlur(){
    this.timeoutID=setTimeout(() => {
      this.EndEdit();
    }, 0);
  }

  onFocus(){
    clearTimeout(this.timeoutID);
  }

  render() {
    if(this.state.onEdit){
      return(
        <span
          onFocus={()=>this.onFocus()}
          onBlur={()=>this.onBlur()}>
          <TextField
            autoFocus={true}
            InputProps={{style: this.props.style}}
            value={this.state.value}
            onChange={(e)=>this.onTextChange(e)}
            onKeyDown={this.handleKeyPress}/>
        </span>
      );
    }
    else{
      return(
        <span style={this.props.style}>
          <span onClick={()=>this.clickEvent()}>{this.props.value}</span>
          {(()=>{
            if(this.props.canEdit){
              return <EditIcon onClick={this.onClick}/>;
            }
          })()}
        </span>
      )
    }
  }
}

export default EditableProjectLabel;
