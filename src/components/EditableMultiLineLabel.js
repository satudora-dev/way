import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

class EditableMultiLineLabel extends Component {
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
    const style = {
      editIconWrapper: {
        "margin-left": "auto",
        "margin-right": "0",
        "width": "40px",
      },
      textField: {
        "width": "100%"
      },
      notEdittingTextWrapper:{
        "text-align": "start",
        "color": "gray"
      },
      notEdittingText:{
        margin: "0 auto",
      }
    }

    if(this.state.onEdit){
      return(
        <span
          onFocus={()=>this.onFocus()}
          onBlur={()=>this.onBlur()}>
          <TextField
            style={style.textField}
            multiline={this.props.multiline}
            rows={this.props.rows || "1"}
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
        <div style={this.props.style}>
          {(()=>{
            if(this.props.canEdit){
              return <div style={style.editIconWrapper}><EditIcon onClick={this.onClick}/></div>;
            }
          })()}
          <p onClick={()=>this.clickEvent()}
            style={style.notEdittingTextWrapper}>
              {(()=>{
                if(this.props.value){
                  return this.props.value.split('\n').map(function(line) {
                    return <p style={style.notEdittingText}>{line}</p>;
                  });
                }
              })()}
          </p>
        </div>
      )
    }
  }
}

export default EditableMultiLineLabel;
