import React, { Component } from 'react';
import EditableProjectLabel from '../../components/EditableProjectLabel'
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
      namestyle: {
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
        <EditableProjectLabel
          style={style.namestyle}
          value={project.name}
          onEditEnd={(name)=>this.props.updateProjectName(projectID, {'name': name})}
          canEdit={true}
        />
        <EditableProjectLabel
          multiline={true}
          rows={"8"}
          style={style.description}
          value={project.description}
          onEditEnd={(newDescription)=>this.props.updateProjectDescription(projectID, newDescription)}
          canEdit={true}
        />

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
      </div>
    );
  }
}


export default Project;
