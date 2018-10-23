import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Badge from '@material-ui/core/Badge'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'


import PositionModal from './PositionModal'
import TagModal from './TagModal'
import ProjectModal from './ProjectModal'
import EditableLabel from '../../components/EditableLabel'
import ImageUploader from '../../components/ImageUploader'
import TagLabel from '../../components/TagLabel'

import { connect } from 'react-redux';
import * as actions from '../../actions'


class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      positionModalOpen: false,
      projectModalOpen: false,
      tagModalOpen: false,
    };
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

      divstyle: {
        "background-image": "url('/grad.jpg')",
        "backend-position": "center center",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      },
      namestyle: {
        color: "#D8D8D8",
        "font-family": "Avenir",
        "font-size": "40px",
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
        "text-transform": "none",
        "color": "white",
      },
      positionstyle: {
        "margin-right": "10px",
        "margin-bottom": "10px",
        "background-color": "#04B486",
        "text-transform": "none",
        "color": "white",
      }
    }
    const profileID = this.props.match.params.id;
    const given = this.props.given || "";
    const family = this.props.family || "";
    const icon = this.props.icon || "/portrait.png";
    const position = this.props.position || "";
    const projects = this.props.projects || [];
    const tags = this.props.tags || [];
    const canEdit = profileID === this.props.userkey;
    // const openTutorial = this.props.location.state.tut || false;


    return (
      <div className="Profile">
        <div className="Home" style={style.divstyle}>
          <ImageUploader src={icon} id={profileID} canEdit={canEdit}/>
            <EditableLabel
              style={style.namestyle}
              value={[given,family]}
              onEditEnd={(names)=>this.props.editName(names,profileID)}
              canEdit={canEdit}
            />
        </div>

        <div className="Position">
          <h3 style={style.categorystyle}>position</h3>
          <hr />
          <div style={style.tagstyle}>
            <Button variant="contained" color="primary" disabled={(!position)} style={style.positionstyle} onClick={()=>this.toPositionPage(position)}>{position}</Button>
            {(() => {
              if(canEdit)
                return(
                  <div>
                    <Button mini onClick={() => this.setState({positionModalOpen: true})}
                            variant="fab" style={style.btnstyle}>
                      <EditIcon/>
                    </Button>
                    <PositionModal
                      positionModalOpen={this.state.positionModalOpen}
                      currentPosition={position}
                      addPosition={this.props.addPosition}
                      onPositionModalOpen={() => this.setState({positionModalOpen: false})}
                      profileID={profileID}
                    />
                  </div>
                )
            })()}
          </div>
        </div>
        <div className="Project">
          <h3 style={style.categorystyle}>projects</h3>
          <hr />
          <div style={style.tagstyle}>
            {projects.map((project,i)=>{
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
              if(canEdit)
                return(
                  <div>
                    <Button mini onClick={() => this.setState({projectModalOpen: true})}
                            variant="fab" style={style.btnstyle}>
                      <EditIcon/>
                    </Button>
                    <ProjectModal
                      projectModalOpen={this.state.projectModalOpen}
                      currentProjects={projects}
                      setProjects={this.props.setProjects}
                      onProjectModalclose={() => this.setState({projectModalOpen: false})}
                      profileID={profileID}
                    />
                  </div>
                )
            })()}
          </div>
        </div>

        <div className="Others">
          <h3 style={style.categorystyle}>tags</h3>
          <hr />
          <div style={style.tagstyle}>
            {tags.map((tag,i)=>{
             return (
              <Button key={i} variant="contained" style={style.tagbtnstyle}>
                <span onClick={()=>this.toTagPage(tag)}>{[tag]}&nbsp;&nbsp;</span>
                <CloseIcon style={{"font-size" : "90%", }} onClick={()=>this.props.deleteTag(tag, profileID)}/>
              </Button>
             );
           })}
            <Button mini onClick={() => this.setState({tagModalOpen: true})}
                    variant="fab" style={style.btnstyle}>
            <AddIcon />
            </Button>
          <TagModal
            tagModalOpen={this.state.tagModalOpen}
            addTag={this.props.addTag}
            onTagModalclose={() => this.setState({tagModalOpen: false})}
            profileID={profileID} />
            </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {

  let users = state.users;
  let accounts = state.accounts;
  let thisUser = window.location.pathname.split('/')[2];
  if(users[thisUser]){
    return {
      given: users[thisUser].given,
      family: users[thisUser].family,
      icon: users[thisUser].icon,
      position: users[thisUser].position,
      projects: users[thisUser].projects,
      tags: users[thisUser].tags,
      userkey: state.auth.CurrentUserKey
    }
  }
}


export default connect(mapStateToProps,actions)(Profile);
