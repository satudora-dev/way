import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import {withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import EditableLabel from '../../components/EditableLabel';
import ImageUploader from '../../components/ImageUploader';
import PositionSelect from '../../components/PositionSelect';
import ProjectsSelect from '../../components/ProjectSelect';
import TagLabel from '../../components/TagLabel';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

class Users extends Component {
  constructor(props){
    super(props);

    this.modalMODES={
      none: 0,
      position: 1,
      project: 2,
      tag: 3,
    }

    this.state={
      canEdit: false,
      family: "",
      given: "",
      icon: "",
      modalInput: "",
      modalMode: this.modalMODES.none,
      modalModeText: "",
      modalOpen: false,
      openTutorial: this.props.location.state.tut,//Signupからのルーティング時のみtrue
      position: "",
      projects: [],
      tags: [],
    };
    this.id=this.props.match.params.id;
    this.profDbRef=firebaseDB.ref('users/'+this.props.match.params.id);
    this.posDbRef=firebaseDB.ref('positions');
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
          for(const item of Object.keys(val.projects )){
            projects.push(item);
          }
          let tags=[];
          for(const item of Object.keys(val.tags)){
            tags.push(item);
          }

          this.setState({
            family: val.family,
            given: val.given,
            position: val.position,
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
            this.props.location.state="";
          }*/
        });
        firebaseDB.ref('accounts/'+this.props.match.params.id).once('value',snapshot=>{
          let val=snapshot.val();
          this.setState({canEdit: val.email===user.email});
        })
      }
      if(this.state.openTutorial){
        this.switchModal(true,this.modalMODES.position)
        this.setState({position: ""})
      }
    });
  }



  downloadImage(id){
    let storageRef=firebaseStorage.ref('icons/'+id);
    storageRef.getDownloadURL().then((url)=>{
      this.setState({icon: url});
    });
  }

  onNameEditEnd(val){
    this.setState({
      family: val[1],
      given: val[0],
    });
    this.profDbRef.child("given").set(val[0]);
    this.profDbRef.child("family").set(val[1]);
  }

  switchModal(on,mode) {
    let text = "";
    switch (mode) {
      case this.modalMODES.position:
        text = "position";
        break;
      case this.modalMODES.tag:
        text = "tag";
        break;
      case this.modalMODES.project:
        text = "project";
        break;
    }
    this.setState({
      modalMode: mode,
      modalModeText: text,
      modalOpen: on,
    });
  }

  onModalInputChange(e){
    this.setState({modalInput: e.target.value});
  }

  onClickModalButton(){
    let newName=this.state.modalInput.toUpperCase();
    switch(this.state.modalMode){
      case this.modalMODES.position:
        //this.addPosition(newName);
        if (this.state.openTutorial){
          this.switchModal(true,this.modalMODES.project)
        }
        break;
      case this.modalMODES.project:
        this.addProject(newName);
        if (this.state.openTutorial){
          this.switchModal(true,this.modalMODES.tag)
        }
        break;
      case this.modalMODES.tag:
        this.addTag(newName);
        if (this.state.openTutorial){
          this.switchModal(false,this.modalMODES.none)
          this.props.history.push('/users');
        }
        break;
    }
    this.setState({modalInput: ""});
    if (!this.state.openTutorial){
      this.switchModal(false,this.modalMODES.none);
    }
  }

  onParamsEditEnd(oldVal,newVal,mode){
    newVal=newVal[0].toUpperCase();
    if(oldVal===newVal){
      return;
    }

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

  onTagDelete(tagName)
  {
    let newTags=this.state.tags.filter(n=>n!==tagName);
    this.profDbRef.child("tags/"+tagName).remove();
    this.tagDbRef.child(tagName+"/"+this.id).remove();
    this.setState({tags: newTags});
  }

  updateProjects(projects){
    this.setState({projects: projects});
  }

  updatePosition(position){
    this.setState({position: position});
  }

  // モーダルの中身を動的に返す(プロジェクト・タグ）
  renderModalElement(){
    const style = {
      addtagstyle: {
        "background-color":"white",
        "border-radius":"30px",
        display:"inline-block",
        "font-family":"Avenir",
        height:"150px",
        "margin-top":"250px",
        "outline":"none",
        "text-align":"center",
        width:"300px",
      },
      btnstyle: {
        "background-color": "#04B486",
        "color": "white",
        "margin-bottom": "10px",
        "margin-right": "10px",
        "text-transform": "none",
      },
      disabledstyle: {
        "background-color": "gray",
        "color": "white",
        "margin-bottom": "10px",
        "margin-right": "10px",
        "text-transform": "none",
      },
      selectProjectModalStyle: {
        "background-color":"white",
        "border-radius":"30px",
        display:"inline-block",
        "font-family":"Avenir",
        height:"200px",
        "margin-top":"250px",
        "min-width": "300px",
        //widthはGridでレスポンシブに
        "outline":"none",
        "text-align":"center",
      },
    }


    const {classes} = this.props;

    switch(this.state.modalMode){
      case this.modalMODES.position:
        return(
          <div style={style.selectProjectModalStyle}>
            {(() => {
              if(this.state.openTutorial){
                return(
                  <h3>Hello!! Which is your position?</h3>
                )
              }
              else{
                return(
                  <h3>select position</h3>
                )
              }
            })()}
            <PositionSelect position={this.state.position} updateParentPosition={this.updatePosition} userID={this.id}/>
            <Button style={this.state.position === "" || this.state.position === undefined ? style.disabledstyle : style.btnstyle}
                    variant="outlined"
                    value="add"
                    disabled={this.state.position === "" || this.state.position === undefined}
                    onClick={() => this.onClickModalButton()}
            >
            done
            </Button>
          </div>
        )
      case this.modalMODES.project:
        return(
          <div style={style.selectProjectModalStyle}>
            {(() => {
              if(this.state.openTutorial){
                return(
                  <h3>Choose your current projects!!</h3>
                )
              }
              else{
                return(
                  <h3>select project</h3>
                )
              }
            })()}
            <ProjectsSelect projects={this.state.projects} updateParentProjects={this.updateProjects} userID={this.id}/>
            <Button style={this.state.projects.length === 0 || this.state.projects === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="add"
                disabled={this.state.projects.length === 0 || this.state.projects === undefined}
                onClick={() => this.onClickModalButton()}
            >
            done
            </Button>
          </div>
        )
      case this.modalMODES.tag:
        return(
          <div style={style.selectProjectModalStyle}>
          {(() => {
            if(this.state.openTutorial){
              return(
                <div>
                  <h3>Tag something!!!</h3>
                  <p>ex. 「PYTHON」「JAZZ」「大食漢」</p>
                </div>
              )}
            else{
              return(
                <h3>add {this.state.modalModeText}</h3>
              )
            }
          })()}
            <TextField label={this.state.modalModeText}
                       value={this.state.modalInput}
                       style={{"margin-right": "10px"}} autoFocus
                       onChange={(e) => this.onModalInputChange(e)}/>
            <Button style={this.state.modalInput === "" ? style.disabledstyle : style.btnstyle}
                    variant="outlined"
                    disabled={this.state.modalInput === ""}
                    value="add"
                    onClick={() => this.onClickModalButton()}
            >
            add
            </Button>
          </div>
        )
    }
  }

  addPosition(posName){
    if (posName===""){
      alert("fuck!!!");
    }else{
    this.setState({position: posName});
    this.profDbRef.child("position").set(posName);
    this.posDbRef.child(posName+"/"+this.id).set(true);
  }}

  addProject(prjName){
    //重複判定
    if(this.state.projects.filter(x=>x===prjName).length>0){
      return;
    }
    //空文字判定
    if(!prjName){
      return;
    }

    let newProjects=this.state.projects.concat(prjName);
    this.setState({projects: newProjects});
    this.profDbRef.child("projects/"+prjName).set(true);
    this.prjDbRef.child(prjName+"/members/"+this.id).set(true);
  }

  addTag(tagName){
    if(this.state.projects.filter(x=>x===tagName).length>0){
      return;
    }
    //空文字判定
    if(!tagName){
      return;
    }

    let newTags=this.state.tags.concat(tagName);
    this.setState({tags: newTags});
    this.profDbRef.child("tags/"+tagName).set(true);
    this.tagDbRef.child(tagName+"/"+this.id).set(true);
  }

  toPositionPage(posName){
    this.props.history.push(`../users?position=${posName}`);
  }

  toProjectPage(prjName){
    this.props.history.push(`../users?project=${prjName}`);
  }

  toTagPage(tagName){
    this.props.history.push(`../users?tag=${tagName}`);
  }


  render() {
    const style = {

      addstyle: {
        margin: "10px"
      },
      btnstyle: {
        "background-color": "#04B486",
        "color": "white",
        "margin-bottom": "10px",
        "margin-right": "10px",
        "text-transform": "none",
      },
      categorystyle: {
        "font-family": "Avenir",
        margin: "10px 30px",
        "text-align": "left",
      },
      deletestyle: {
        "background-color":"rgba(0,0,0,0)",
        border:"0",
        color:"white",
        cursor:"pointer",
        outline:"none",
      },
      divstyle: {
        "backend-position": "center center",
        "background-image": "url('/grad.jpg')",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      },
      iconstyle: {
        height:"20px",
        "margin-left":"10px",
        width:"20px",
      },
      namestyle: {
        color: "#D8D8D8",
        "font-family": "Avenir",
        "font-size": "40px",
        margin: "10px"
      },
      tagbtnstyle: {
        "background-color": "#04B486",
        "color": "white",
        "margin-bottom": "10px",
        "margin-right": "10px",
        "padding-right":"8px",
        "text-transform": "none",
      },
      tagstyle: {
        "font-family": "Avenir",
        margin: "10px 30px",
        "margin-bottom": "40px",
        "text-align": "left",
      },
    };

    return (
      <div className="Profile">
        <div className="Home" style={style.divstyle}>
          <ImageUploader src={this.state.icon} id={this.props.match.params.id} canEdit={this.state.canEdit}/>
            <EditableLabel
              style={style.namestyle}
              value={[this.state.given,this.state.family]}
              onEditEnd={(val)=>this.onNameEditEnd(val)}
              canEdit={this.state.canEdit}
            />
        </div>
        <div className="Position">
          <h3 style={style.categorystyle}>positions</h3>
          <hr />
          <div style={style.tagstyle}>
            <Button variant="contained" color="primary" disabled={(!this.state.position)} style={style.tagbtnstyle} onClick={()=>this.toPositionPage(this.state.position)}>{this.state.position}</Button>
          </div>
        </div>
        <div className="Project">
          <h3 style={style.categorystyle}>projects</h3>
          <hr />
          <div style={style.tagstyle}>
            {this.state.projects.map((project,i)=>{
              return (
                <Button key={i} variant="contained" color="primary" style={style.tagbtnstyle} onClick={()=>this.toProjectPage(project)}>
                  <TagLabel
                    value={[project]}
                    onClick={()=>this.toProjectPage(project)}
                  />
                </Button>
              );
            })}
            {(() => {
              if(this.state.canEdit) {
                return (
                  <Button mini onClick={() => this.switchModal(true, this.modalMODES.project)}
                          variant="fab" style={style.btnstyle}>
                    <EditIcon/>
                  </Button>
                )
              }
            })()}
         </div>
       </div>

       <div className="Others">
         <h3 style={style.categorystyle}>tags</h3>
         <hr />
         <div style={style.tagstyle}>
           {this.state.tags.map((tag,i)=>{
             return (
              <Button key={i} variant="contained" style={style.tagbtnstyle}>
                <span onClick={()=>this.toTagPage(tag)}>{[tag]}&nbsp;&nbsp;</span>
                <CloseIcon style={{"font-size" : "90%", }} onClick={()=>this.onTagDelete(tag)}/>
              </Button>
             );
           })}
           <Button mini
                   onClick={() => this.switchModal(true,this.modalMODES.tag)}
                   variant="fab" style={style.btnstyle}
           >
             <AddIcon />
           </Button>
         </div>
       </div>

       <div>
         <Grid>
           <Modal open={this.state.modalOpen}
                  onClose={() => {if (!this.state.openTutorial) { this.switchModal(false,this.modalMODES.none) }}}
           >
           {this.renderModalElement()}
           </Modal>
         </Grid>
       </div>
     </div>

    );
  }
}

export default withRouter(Users);
