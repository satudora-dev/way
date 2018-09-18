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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ImageUploader from '../../components/ImageUploader';
import ProjectsSelect from '../../components/ProjectSelect';
import TagLabel from '../../components/TagLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

var modalMODES={
  none: 0,
  project: 1,
  tag: 2,
  position: 3,
}


class Users extends Component {
  constructor(props){
    super(props);

    this.state={
      given: "",
      family: "",
      icon: "",
      modalOpen: false,
      modalMode: modalMODES.none,
      modalInput: "",
      projects: [],
      tags: [],
      modalModeText: "",
      canEdit: false,
      init: this.props.location.state.tut,
      initposition: "アルバイト",
      position: null,
    };
    this.id=this.props.match.params.id;
    this.profDbRef=firebaseDB.ref('users/'+this.props.match.params.id);
    this.prjDbRef=firebaseDB.ref('projects');
    this.tagDbRef=firebaseDB.ref('tags');
    this.posDbRef=firebaseDB.ref('positions');
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
            this.props.location.state=null;
          }*/
        });
        firebaseDB.ref('accounts/'+this.props.match.params.id).once('value',snapshot=>{
          let val=snapshot.val();
          this.setState({canEdit: val.email===user.email});
        })
      }
      if(this.state.init){
        this.switchModal(true,modalMODES.position)
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
      given: val[0],
      family: val[1],
    });
    this.profDbRef.child("given").set(val[0]);
    this.profDbRef.child("family").set(val[1]);
  }

  switchModal(on,mode){
    let text="";
    switch(mode){
      case modalMODES.tag:
        text="tag";
        break;
      case modalMODES.project:
        text="project";
        break;
      case modalMODES.position:
        text="position";
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
      case modalMODES.project:
  //      this.addProject(newName);
        if (this.state.init){
          this.switchModal(true,modalMODES.tag)
        }
        break;
      case modalMODES.tag:
        this.addTag(newName);
        if (this.state.init){
          this.switchModal(false,modalMODES.none)
        }
        break;
      case modalMODES.position:
        this.addPosition(this.state.initposition)
        if (this.state.init){
          this.switchModal(true,modalMODES.project)
        }
        break;
    }
    this.setState({modalInput: ""});
    if (!this.state.init)this.switchModal(false,modalMODES.none);

  }

  onParamsEditEnd(oldVal,newVal,mode){
    newVal=newVal[0].toUpperCase();
    if(oldVal===newVal)return;

    switch(mode){
      case modalMODES.project:
        let newPrj=this.state.projects.filter(n=>n!==oldVal);//古い情報を削除
        this.profDbRef.child("projects/"+oldVal).remove();
        this.prjDbRef.child(oldVal+"/members/"+this.id).remove();
        this.setState({projects: newPrj});
        if(newVal){
          this.addProject(newVal);
        }
        break;
      case modalMODES.tag:
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

  updateProjects(projects){
    this.setState({projects: projects});
  }

  // モーダルの中身を動的に返す(プロジェクト・タグ）
  renderModalElement(){
    const style = {
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
      selectProjectModalStyle: {
        display:"inline-block",
        "margin-top":"250px",
        height:"200px",
        //widthはGridでレスポンシブに
        "min-width": "300px",
        "background-color":"white",
        "text-align":"center",
        "outline":"none",
        "border-radius":"30px",
        "font-family":"Avenir",
      },
      btnstyle: {
        "margin-right": "10px",
        "margin-bottom": "10px",
        "background-color": "#04B486",
        "color": "white",
        "text-transform": "none",
      },
    }
    const {classes} = this.props;

    switch(this.state.modalMode){
      case modalMODES.tag:
        return(
          <div style={style.addtagstyle}>
            <h3>add {this.state.modalModeText}</h3>
            <TextField label={this.state.modalModeText}
                       value={this.state.modalInput}
                       style={{"margin-right": "10px"}} autoFocus
                       onChange={(e) => this.onModalInputChange(e)}/>
            <Button style={style.btnstyle}
                    variant="outlined" value="add" onClick={() => this.onClickModalButton()}>add</Button>
          </div>
        )
      case modalMODES.project:
        return(
          <div style={style.selectProjectModalStyle}>
            <h3>selelct projects</h3>
            <ProjectsSelect projects={this.state.projects} updateParentProjects={this.updateProjects} userID={this.id}/>
            <Button style={style.btnstyle}
                    variant="outlined" value="add" onClick={() => this.onClickModalButton()}>done</Button>
          </div>
        )
      case modalMODES.position:

        return(
          <div style={style.addtagstyle}>
          <h3>selelct position</h3>
          <FormControl className={null}>
          <InputLabel htmlFor="age-simple">Position</InputLabel>
          <Select
            value={this.state.initposition}
            onChange={this.handlePosition}
            input={<Input id="age-simple" />}
          >
  　　　　　 <MenuItem value="アルバイト">アルバイト</MenuItem>
            <MenuItem value="社員">社員</MenuItem>
          </Select>
          <Button style={style.btnstyle}
                  variant="outlined"
                  onClick={() => this.onClickModalButton()}>submit</Button>
        </FormControl>
        </div>
        )
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

  addPosition(posName){
    if (posName===null){
      alert("fuck!!!");
    }else{
    this.profDbRef.child("position").set(posName);
    this.posDbRef.child(posName+"/"+this.id).set(true);
    this.setState({
      position: posName,
    })
  }}

  toProjectPage(prjName){
    this.props.history.push(`../users?project=${prjName}`);
  }

  toTagPage(tagName){
    this.props.history.push(`../users?tag=${tagName}`);
  }


  handlePosition = event => {
    console.log(event.target.value);
    this.setState({
      initposition: event.target.value,
    })
  };
  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };


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
        "background-image": "url('/grad.jpg')",
        "backend-position": "center center",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      },
      namestyle: {
        color: "#D8D8D8",
        "font-family": "Avenir",
        "font-size": "5vw",
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

    var html = [];

      html.push(
          <Grid>
            <Modal open={this.state.modalOpen}
              onClose={() => {if (!this.state.init) this.switchModal(false,modalMODES.none)}}>
              {this.renderModalElement()}
            </Modal>
          </Grid>
      );
    return (
      <div className="Profile">
  <div className="Home" style={style.divstyle}>
    <ImageUploader src={this.state.icon} id={this.props.match.params.id}/>
    <EditableLabel
      style={style.namestyle}
      value={[this.state.given,this.state.family]}
      onEditEnd={(val)=>this.onNameEditEnd(val)}
      canEdit={this.state.canEdit}/>
  </div>
  <div className="Position" style={style.tagstyle}>
    <h3 style={style.categorystyle}>positions</h3>
    <hr />
    <Button variant="contained" style={style.tagbtnstyle}>{this.state.position}</Button>

  </div>
  <div className="Project">
    <h3 style={style.categorystyle}>projects</h3>
    <hr />
    <div style={style.tagstyle}>
  {this.state.projects.map((project,i)=>{
      return (
        <Button key={i} variant="contained" color="primary" style={style.tagbtnstyle}>
        <TagLabel
          value={[project]}
          onClick={()=>this.toProjectPage(project)}
        />
        </Button>
      );
  })}
      <Button mini onClick={() => this.switchModal(true,modalMODES.project)}
              variant="fab" style={style.btnstyle}>
        <EditIcon/>
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
          value={[tag]}
          onEditEnd={(val)=>this.onParamsEditEnd(tag,val,modalMODES.tag)}
          onClick={()=>this.toTagPage(tag)}
          canEdit={true}
        />
        </Button>
      );
  })}
      <Button mini onClick={() => this.switchModal(true,modalMODES.tag)}
        variant="fab" style={style.btnstyle}>
        <AddIcon />
      </Button>
    </div>
  </div>

//        <div>{html}</div>
      </div>

    );
  }
}

export default withRouter(Users);
