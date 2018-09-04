import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';

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

  clickEvent(){
    if(this.props.onClick)this.props.onClick();
  }

  render() {
    return (
      <span className="EditableLabel">
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
                <span>
                  <span onClick={()=>this.clickEvent()}>{this.state.value}</span>
                  {(()=>{
                    if(this.props.canEdit){
                      return <EditIcon onClick={this.onClick}/>;
                    }
                  })()}
                </span>
              );
            }
          })()}
      </span>
    );
  }
}

export default EditableLabel;
