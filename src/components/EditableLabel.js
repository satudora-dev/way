import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

class EditableLabel extends Component {
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

  onTextChange(e,index){
    var val=this.state.value;
    val[index]=e.target.value;
    this.setState({value: val});
  }

  onClick(e){
    this.setState({onEdit: true});
  }

  EndEdit(){
    this.setState({onEdit: false});
    this.props.onEditEnd(this.state.value);
  }

  handleKeyPress(e){
    let ENTER=13;
    if(e.keyCode===ENTER) this.EndEdit();
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
          {this.state.value.map((v,i)=>{
            return(
              <TextField
                autoFocus={i===0}
                InputProps={{style: this.props.style}}
                value={v}
                onChange={(e)=>this.onTextChange(e,i)}
                onKeyDown={this.handleKeyPress}/>
            );
          })}
        </span>
      );
    }
    else{
      return(
        <span style={this.props.style}>
          {this.state.value.map(v=>{
            return(
              <span onClick={()=>this.clickEvent()}>{v}&ensp;</span>
            );
          })}
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

export default EditableLabel;
