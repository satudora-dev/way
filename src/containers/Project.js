import Project from '../components/Project';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = ({projects}, ownProps) => {
  const projectID = ownProps.match.params.id;
  if(!projects.init) {
    return {
      project: projects[projectID],
    }
  }else{
    return {
      project: '',
    }
  }
}

const mapDispatchToProps = {
  editProjectName: (name, project) => {},
  //editProjectDescription: actions.editProjectDescription,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
