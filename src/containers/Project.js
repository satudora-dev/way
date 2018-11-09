import Project from '../components/Project';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = ({projects, users}, ownProps) => {
  const projectID = ownProps.match.params.id;
  if(!projects.init && !users.init) {
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
  updateProjectName: actions.updateProject,
  //editProjectDescription: actions.editProjectDescription,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
