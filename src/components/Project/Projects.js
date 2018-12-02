import React, { Component } from 'react';


class Projects extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  toProject(id){
    this.props.history.push(`/projects/${id}`);
  }

  render() {
    const style = {
    }
    const projects = this.props.projects;

    return (
      <div className="Projects">
        {(()=>{
          if(projects) {
            return (Object.keys(projects).map((key, i) => {
              return (
                <div>
                  <a key={i}
                     onClick={() => this.toProject(key)}>
                    { projects[key].name }
                  </a>
                </div>
              );
            }));
          }
        })()}
      </div>
    );
  }
}


export default Projects;
