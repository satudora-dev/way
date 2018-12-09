import React, { Component } from 'react';
import EditableProjectLabel from '../../components/EditableProjectLabel'
import EditableMultiLineLabel from '../../components/EditableMultiLineLabel'
import Button from '@material-ui/core/Button';


class Project extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  toProfile(id){
    this.props.history.push(`/users/${id}`);
  }

  render() {
    const style = {
      name: {
        color: "black",
        fontFamily: "Avenir",
        fontSize: "40px",
        margin: "10px"
      },
      description: {
        color: "black",
        fontFamily: "Avenir",
        fontSize: "20px",
        margin: "10px auto 200px auto",
        width: "70%",
      },
      icon: {
        width: "128px",
        height: "128px",
        objectFit: "cover",
        borderRadius: "50%",
        padding: "0px",
        boxShadow: "0 4px 10px gray",
        cursor: "finger",
      },
      iconbtn: {
        borderRadius: "50%",
        padding: 0,
        margin: "5px"
      },
      projectPageWrapper: {
        "margin-top": "60px"
      }
    }
    const project = this.props.project;
    const projectID = this.props.projectID;
    const users = this.props.users;
    const currentUserID = this.props.currentUserID;
    const canEdit = project.members && Object.values(project.members).includes(currentUserID)

    return (
      <div className="Project" style={style.projectPageWrapper}>
        <section id="project-name">
          <EditableProjectLabel
            style={style.name}
            value={project.name}
            onEditEnd={(name)=>this.props.updateProjectName(projectID, {'name': name})}
            canEdit={canEdit}
          />
        </section>
        <section id="project-description"
        >
          <EditableMultiLineLabel
            style={style.description}
            multiline={true}
            rows={"8"}
            value={project.description}
            onEditEnd={(newDescription)=>this.props.updateProjectDescription(projectID, newDescription)}
            canEdit={canEdit}
          />
        </section>
        <section id="project-members">
          <h2>プロジェクトメンバー</h2>
          <hr/>
          {(()=>{
            if(project.members) {
              return (Array.from(project.members).map((projectMember, i) => {
                return (
                  <Button className="User" key={i} style={style.iconbtn}
                          onClick={() => this.toProfile(projectMember)}>
                    <img src={users[projectMember].icon} style={style.icon} alt="failed loading..."/>
                  </Button>
                );
              }));
            }
          })()}
        </section>
      </div>
    );
  }
}


export default Project;
