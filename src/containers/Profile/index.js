import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import {withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import EditableLabel from '../../components/EditableLabel';
import ImageUploader from '../../components/ImageUploader';

class Users extends Component {
  constructor(props){
    super(props);
    
    this.modalMODES={
      none: 0,
      project: 1,
      tag: 2,
    }

    this.state={
      given: "",
      family: "",
      icon: "",
      modalOpen: false,
      modalMode: this.modalMODES.none,
      modalInput: "",
      projects: [],
      tags: [],
      modalModeText: "",
      canEdit: false,
    };
    this.id=this.props.match.params.id;
    this.profDbRef=firebaseDB.ref('users/'+this.props.match.params.id);
    this.prjDbRef=firebaseDB.ref('projects');
    this.tagDbRef=firebaseDB.ref('tags');
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user){
        this.props.history.push('/login');
      }
      else{
        this.profDbRef.on('value',snapshot=>{
          let val=snapshot.val();
          let projects=[];
          for(let item in val.projects){
            projects.push(item);
          }
          let tags=[];
          for(let item in val.tags){
            tags.push(item);
          }

          this.setState({
            given: val.given,
            family: val.family,
            projects: projects,
            tags: tags,
          });
          
          //if(!this.props.location.state||!this.props.location.state.icon){
            if(val.haveIcon){
              this.downloadImage(this.id);
            }
            else{
              this.setState({icon: "/portrait.png"});
            }
          /*}
          else{
            this.setState({icon: this.props.location.state.icon,});
            this.props.location.state=null;
          }*/
        });
        firebaseDB.ref('accounts/'+this.props.match.params.id).once('value',snapshot=>{
          let val=snapshot.val();
          this.setState({canEdit: val.email===user.email});
        })
      }
    });
  }



  downloadImage(id){
    let storageRef=firebaseStorage.ref('icons/'+id);
    storageRef.getDownloadURL().then((url)=>{
      this.setState({icon: url});
    });
  }

  onNameEditEnd(stateName,val){
    if(!val)val=this.state[stateName];

    let newState=this.state;
    newState[stateName]=val;
    this.setState(newState);
    this.profDbRef.child(stateName).set(val);
  }

  switchModal(on,mode){
    let text="";
    switch(mode){
      case this.modalMODES.tag:
        text="tag";
        break;
      case this.modalMODES.project:
        text="project";
        break;

    }
    this.setState({
      modalOpen: on,
      modalMode: mode,
      modalModeText: text});
  }
  
  onModalInputChange(e){
    this.setState({modalInput: e.target.value});
  }

  onClickModalButton(){
    let newName=this.state.modalInput.toUpperCase();
    switch(this.state.modalMode){
      case this.modalMODES.project:
        this.addProject(newName);
        break;
      case this.modalMODES.tag:
        this.addTag(newName);
        break;
    }
    this.setState({modalInput: ""});
    this.switchModal(false,this.modalMODES.none);
  }

  onParamsEditEnd(oldVal,newVal,mode){
    newVal=newVal.toUpperCase();
    if(oldVal===newVal)return;

    switch(mode){
      case this.modalMODES.project:
        let newPrj=this.state.projects.filter(n=>n!==oldVal);//古い情報を削除
        this.profDbRef.child("projects/"+oldVal).remove();
        this.prjDbRef.child(oldVal+"/members/"+this.id).remove();
        this.setState({projects: newPrj});
        if(newVal){
          this.addProject(newVal);
        }
        break;
      case this.modalMODES.tag:
        let newTag=this.state.tags.filter(n=>n!==oldVal);
        this.profDbRef.child("tags/"+oldVal).remove();
        this.tagDbRef.child(oldVal+"/"+this.id).remove();
        this.setState({tags: newTag});
        if(newVal){
          this.addTag(newVal);
        }
        break;
    }
  }

  addProject(prjName){
    if(this.state.projects.filter(x=>x===prjName).length>0)return;//重複判定
    if(!prjName)return;//空文字判定

    let newProjects=this.state.projects.concat(prjName);
    this.setState({projects: newProjects});
    this.profDbRef.child("projects/"+prjName).set(true);
    this.prjDbRef.child(prjName+"/members/"+this.id).set(true);
  }

  addTag(tagName){
    if(this.state.projects.filter(x=>x===tagName).length>0)return;
    if(!tagName)return;//空文字判定

    let newTags=this.state.tags.concat(tagName);
    this.setState({tags: newTags});
    this.profDbRef.child("tags/"+tagName).set(true);
    this.tagDbRef.child(tagName+"/"+this.id).set(true);
  }

  toProjectPage(prjName){
    this.props.history.push(`../users?project=${prjName}`);
  }

  toTagPage(tagName){
    this.props.history.push(`../users?tag=${tagName}`);
  }

  render() {
    const style = {
      imgstyle: {
        height: "256px",
        width: "256px",
        "border-radius": "50%",
        "margin-top": "100px",
        "object-fit": "cover",
      },
      divstyle: {
        height: "456px",
        "background-image": "url('/grad.jpg')",
        "backend-position": "center center",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      },
      namestyle: {
        color: "#D8D8D8",
        "font-family": "Avenir",
        "font-size": "50px",
        margin: "10px"
      },
      categorystyle: {
        "text-align": "left",
        margin: "10px 30px",
        "font-family": "Avenir",
      },
      tagstyle: {
        "text-align": "left",
        "font-family": "Avenir",
        margin: "10px 30px",
        "margin-bottom": "40px",
      },
      btnstyle: {
        "margin-right": "10px",
        "margin-bottom": "10px",
        "background-color": "#04B486",
        "color": "white",
        "text-transform": "none",
      },
      tagbtnstyle: {
        "padding-right":"8px",
        "margin-right": "10px",
        "margin-bottom": "10px",
        "background-color": "#04B486",
        "color": "white",
        "text-transform": "none",
      },
      addstyle: {
        margin: "10px"
      },
      addtagstyle: {
        display:"inline-block",
        "margin-top":"250px",
        height:"150px",
        width:"300px",
        "background-color":"white",
        "text-align":"center",
        "outline":"none",
        "border-radius":"30px",
        "font-family":"Avenir",
      },
      iconstyle: {
        height:"20px",width:"20px",
        "margin-left":"10px",
      },
      deletestyle: {
        cursor:"pointer",
        color:"white",
        outline:"none",
        border:"0",
        "background-color":"rgba(0,0,0,0)",
      },
    };

    return (
      <div className="Profile">
        <div className="Home" style={style.divstyle}>
          <ImageUploader src={this.state.icon} id={this.props.match.params.id}/>
          <p style={style.namestyle}>
            <EditableLabel
              value={this.state.given}
              onEditEnd={(val)=>this.onNameEditEnd("given",val)}
              canEdit={this.state.canEdit}/>
              
            <EditableLabel
              value={this.state.family}
              onEditEnd={(val)=>this.onNameEditEnd("family",val)}
              canEdit={this.state.canEdit}/>
            </p>
        </div>
        <div className="Position">
          <h3 style={style.categorystyle}>positions</h3>
          <hr />

        </div>
        <div className="Project">
          <h3 style={style.categorystyle}>projects</h3>
          <hr />
          <div style={style.tagstyle}>
        {this.state.projects.map((project,i)=>{
            return (
              <Button key={i} variant="contained" color="primary" style={style.tagbtnstyle}>
              <EditableLabel
                value={project}
                onEditEnd={(val)=>this.onParamsEditEnd(project,val,this.modalMODES.project)}
                onClick={()=>this.toProjectPage(project)}
                canEdit={true}
              />
              </Button>
            );
        })}
            <Button mini onClick={() => this.switchModal(true,this.modalMODES.project)}
              variant="fab" style={style.btnstyle}>
              <AddIcon />
            </Button>
          </div>
        </div>

        <div className="Others">
          <h3 style={style.categorystyle}>tags</h3>
          <hr />
          <div style={style.tagstyle}>
        {this.state.tags.map((tag,i)=>{
            return (
              <Button key={i} variant="contained" color="primary" style={style.tagbtnstyle}>
              <EditableLabel
                value={tag}
                onEditEnd={(val)=>this.onParamsEditEnd(tag,val,this.modalMODES.tag)}
                onClick={()=>this.toTagPage(tag)}
                canEdit={true}
              />
              </Button>
            );
        })}
            <Button mini onClick={() => this.switchModal(true,this.modalMODES.tag)}
              variant="fab" style={style.btnstyle}>
              <AddIcon />
            </Button>
          </div>
        </div>

        <Modal open={this.state.modalOpen}
          onClose={()=>this.switchModal(false,this.modalMODES.none)}>
          <div style={style.addtagstyle}>
            <h3>add {this.state.modalModeText}</h3>
            <TextField label={this.state.modalModeText}
              value={this.state.modalInput}
              style={{"margin-right":"10px"}} autoFocus
              onChange={(e)=>this.onModalInputChange(e)}/>
            <Button style={style.btnstyle}
              variant="outlined" value="add" onClick={()=>this.onClickModalButton()}>add</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Users);
