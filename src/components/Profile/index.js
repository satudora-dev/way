import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'


import PositionModal from './PositionModal'
import TagModal from './TagModal'
import ProjectModal from './ProjectModal'
import EditableLabel from '../../components/EditableLabel'
import ImageUploader from '../../components/ImageUploader'
import OriginalModal from './Modal'
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';



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
        backgroundImage: "url('/grad.jpg')",
        backendPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      namestyle: {
        color: "#D8D8D8",
        fontFamily: "Avenir",
        fontSize: "40px",
        margin: "10px"
      },
      categorystyle: {
        textAlign: "left",
        margin: "10px 30px",
        fontFamily: "Avenir",
      },
      tagstyle: {
        textAlign: "left",
        fontFamily: "Avenir",
        margin: "10px 30px",
        marginBottom: "40px",
      },
      btnstyle: {
        marginRight: "10px",
        marginBottom: "10px",
        backgroundColor: "#04B486",
        "color": "white",
        textTransform: "none",
      },
      tagbtnstyle: {
        paddingRight:"8px",
        marginRight: "10px",
        marginBottom: "10px",
        backgroundColor: "#04B486",
        textTransform: "none",
        "color": "white",
      },
      positionstyle: {
        marginRight: "10px",
        marginBottom: "10px",
        backgroundColor: "#04B486",
        textTransform: "none",
        "color": "white",
      },
      modalStyle: {
        display:"inline-block",
        marginTop:"250px",
        height:"200px",
        //widthはGridでレスポンシブに
        minWidth: "300px",
        backgroundColor:"white",
        textAlign:"center",
        "outline":"none",
        borderRadius:"30px",
        fontFamily:"Avenir",
      }
    }
    const profileUserKey = this.props.profileUserKey;
    const given = this.props.given || "";
    const family = this.props.family || "";
    const icon = this.props.icon || "/portrait.png";
    const position = this.props.position || "";
    const projects = this.props.projects || [];
    const tags = this.props.tags || [];
    const canEdit = profileUserKey === this.props.ownKey;


    return (
      <div className="Profile">
        <div className="Home" style={style.divstyle}>
          <ImageUploader
            iconSrc={icon}
            profileUserKey={profileUserKey}
            canEdit={canEdit}
            updateIcon={this.props.updateIcon}/>
            <EditableLabel
              style={style.namestyle}
              value={[given,family]}
              onEditEnd={(names)=>this.props.editName(names,profileUserKey)}
              canEdit={canEdit}
            />
        </div>

        <div className="Position">
          <h3 style={style.categorystyle}>position</h3>
          <hr />
          <div style={style.tagstyle}>
            <Button
              variant="contained"
              color="primary"
              disabled={(!position)}
              style={style.positionstyle}
              onClick={()=>this.toPositionPage(position)}
            >
              {position}
            </Button>
            {(() => {
              if(canEdit)
                return(
                    <Button mini onClick={() => this.setState({positionModalOpen: true})}
                            variant="fab" style={style.btnstyle}>
                      <EditIcon/>
                    </Button>
                )
            })()}
          </div>
          {/* <PositionModal
            positionModalOpen={this.state.positionModalOpen}
            currentPosition={position}
            updatePosition={this.props.updatePosition}
            onPositionModalClose={() => this.setState({positionModalOpen: false})}
            profileUserKey={profileUserKey}
          /> */}
          <OriginalModal
            style = {style.modalStyle}
            mode = "single"
            buttonText = "DONE"
            modalOpen = {this.state.positionModalOpen}
            choicesArray = {aitl_positions}
            currentChecks = {position}
            updateData = {this.props.updatePosition}
            onModalClose = {() => this.setState({positionModalOpen: false})}
            profileUserKey={profileUserKey}
          >
            Position
          </OriginalModal>

        </div>
        <div className="Project">
          <h3 style={style.categorystyle}>projects</h3>
          <hr />
          <div style={style.tagstyle}>
            {projects.map((project,i)=>{
              return (
                <Button
                  key={i}
                  variant="contained"
                  color="primary"
                  style={style.positionstyle}
                  onClick={()=>this.toProjectPage(project)}
                  >
                {project}
                </Button>
              );
            })}
            {(() => {
              if(canEdit)
                return(
                    <Button mini onClick={() => this.setState({projectModalOpen: true})}
                            variant="fab" style={style.btnstyle}>
                      <EditIcon/>
                    </Button>
                )
            })()}
            {/* <ProjectModal
              projectModalOpen={this.state.projectModalOpen}
              currentProjects={projects}
              updateProjects={this.props.updateProjects}
              onProjectModalClose={() => this.setState({projectModalOpen: false})}
              profileUserKey={profileUserKey}
            /> */}
            <OriginalModal
              style = {style.modalStyle}
              mode = "multiple"
              buttonText = "DONE"
              modalOpen = {this.state.projectModalOpen}
              choicesArray = {aitl_projects}
              currentChecks = {projects}
              updateData = {this.props.updateProjects}
              onModalClose = {() => this.setState({projectModalOpen: false})}
              profileUserKey={profileUserKey}
            >
              Projects
            </OriginalModal>
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
                <CloseIcon style={{fontSize : "90%", }} onClick={()=>this.props.deleteTag(tag, profileUserKey)}/>
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
            onTagModalClose={() => this.setState({tagModalOpen: false})}
            profileUserKey={profileUserKey} />
            </div>
        </div>
      </div>
    );
  }
}



export default Profile;
