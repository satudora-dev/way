import Project from '../components/Project';
import { connect } from 'react-redux';
import {updateProject, fetchProjectsIfNeeded, updateDescription} from '../actions/projects';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


class ProjectContainer extends React.Component {
  componentDidMount() {
    const { fetchProjectsIfNeeded } = this.props;
    fetchProjectsIfNeeded();
  }

  render() {
    const {project, projectID, users, updateProjectName, history, updateProjectDescription} = this.props;
    if(project && projectID && users) {
      return (
        <Project
          project={project}
          projectID={projectID}
          users={users}
          updateProjectName={updateProjectName}
          history={history}
          updateProjectDescription={updateProjectDescription}
        />
      )
    }else{
      return (
        <CircularProgress />
      );
    }
  }
}

const mapStateToProps = ({projects, users}, ownProps) => {
  const projectID = ownProps.match.params.id;
  if(!projects.noData) {
    return {
      project: projects[projectID],
      //projectMembers: projects[projectID].members.map((memberID) => users[memberID]),
      projectID: projectID,
      users: users,
    }
  }else{
    return {
      project: '',
    }
  }
}

const mapDispatchToProps = {
  updateProjectName: updateProject,
  fetchProjectsIfNeeded: fetchProjectsIfNeeded,
  updateProjectDescription: updateDescription,
  //editProjectDescription: actions.editProjectDescription,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
