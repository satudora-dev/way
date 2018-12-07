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
        color: "#D8D8D8",
        fontFamily: "Avenir",
        fontSize: "40px",
        margin: "10px"
      },
      description: {
        color: "#D8D8D8",
        fontFamily: "Avenir",
        fontSize: "40px",
        margin: "10px auto",
        width: "80%",
        height: "200px",
      },
      members: {
        color: "#D8D8D8",
        fontFamily: "Avenir",
        fontSize: "40px",
        margin: "10px"
      },
    }
    const project = this.props.project;
    const projectID = this.props.projectID;
    const users = this.props.users;

    return (
      <div className="Project">
        <section id="project-name">
          <EditableProjectLabel
            style={style.name}
            value={project.name}
            onEditEnd={(name)=>this.props.updateProjectName(projectID, {'name': name})}
            canEdit={true}
          />
        </section>
        <section id="project-description"
                 style={style.description}
        >
          <EditableMultiLineLabel
            multiline={true}
            rows={"8"}
            style={style.description}
            value={project.description}
            onEditEnd={(newDescription)=>this.props.updateProjectDescription(projectID, newDescription)}
            canEdit={true}
          />
        </section>
        <section id="project-members"
                 style={style.members}>
          {(()=>{
            if(project.members) {
              return (Array.from(project.members).map((projectMember, i) => {
                return (
                  <Button className="User" key={i} style={style.iconbtnstyle}
                          onClick={() => this.toProfile(projectMember)}>
                    <img src={users[projectMember].icon} style={style.iconstyle} alt="failed loading..."/>
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
