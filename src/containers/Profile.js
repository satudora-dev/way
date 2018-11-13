import Profile from '../components/Profile';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { uploadIcon, deleteIconRef } from '../actions/iconAction';

const mapStateToProps = ({ auth, users }, ownProps) => {
  const ownKey = auth.ownKey;
  const thisUser = ownProps.match.params.id;
  if (users[thisUser]) {
    return {
      ownKey: ownKey,
      profileUserKey: thisUser,
      hasOwnProfile: users[ownKey] !== undefined,
      given: users[thisUser].given,
      family: users[thisUser].family,
      icon: users[thisUser].icon,
      position: users[thisUser].position,
      projects: users[thisUser].projects,
      tags: users[thisUser].tags,
    }
  }
  else {
    return {
      ownKey: ownKey,
      hasOwnProfile: users[ownKey] !== undefined,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    editName: actions.editName,
    updatePosition: actions.updatePosition,
    updateProjects: actions.updateProjects,
    addTag: actions.addTag,
    deleteTag: actions.deleteTag,
    uploadIcon: (icon, userKey) => uploadIcon(icon, userKey, dispatch),
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
