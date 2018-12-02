import Project from '../components/Project';
import { connect } from 'react-redux';
import {updateProject, fetchProjectsIfNeeded} from '../actions/projects';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


class ProjectContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { fetchProjectsIfNeeded, updateProjectName } = this.props;
    fetchProjectsIfNeeded();
  }

  render() {
    const {project, projectID, users} = this.props;
    if(project && projectID && users) {
      return (
        <Project project={project} projectID={projectID} users={users} updateProjectName={updateProject}/>
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
  //editProjectDescription: actions.editProjectDescription,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
