import React, { Component } from 'react';
import EditableProjectLabel from '../../components/EditableProjectLabel'


class Project extends Component {
  constructor(props){
    super(props);
    this.state={
    };
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

    return (
      <div className="Project">
        <EditableProjectLabel
          style={style.namestyle}
          value={project.name}
          onEditEnd={(name)=>this.props.editProjectName(name, project)}
          canEdit={true}
        />
        <p>{project.description}</p>
      </div>
    );
  }
}


export default Project;
