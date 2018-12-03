import Profile from '../components/Profile';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { uploadIcon } from '../actions/iconAction';
import {  editName, updatePosition, updateProjects, addTag, deleteTag,
  initializeNowGroup, updateNowGroup} from '../actions/profile';

const mapStateToProps = ({ auth, users }, ownProps) => {
  const currentUserID = auth.currentUserID;
  const thisUser = ownProps.match.params.id;
  if (users[thisUser]) {
    return {
      currentUserID: currentUserID,
      profileUserKey: thisUser,
      hasOwnProfile: users[currentUserID] !== undefined,
      given: users[thisUser].given_en,
      family: users[thisUser].family_en,
      icon: users[thisUser].icon,
      position: users[thisUser].position,
      projects: users[thisUser].projects,
      tags: users[thisUser].tags,
      nowGroup: users[thisUser].nowGroup,
    }
  }
  else {
    return {
      currentUserID: currentUserID,
      hasOwnProfile: users[currentUserID] !== undefined,
    }
  }
}

const mapDispatchToProps = {
  editName: editName,
  initializeNowGroup: initializeNowGroup,
  updateNowGroup: updateNowGroup,
  updatePosition: updatePosition,
  updateProjects: updateProjects,
  addTag: addTag,
  deleteTag: deleteTag,
  uploadIcon: uploadIcon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
