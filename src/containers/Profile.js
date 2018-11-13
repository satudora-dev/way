import Profile from '../components/Profile';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { uploadIcon } from '../actions/iconAction';
import {editName, updatePosition, updateProjects, addTag, deleteTag} from '../actions/profile';

const mapStateToProps = ({ auth, users }, ownProps) => {
  const ownKey = auth.ownKey;
  const thisUser = ownProps.match.params.id;
  if (users[thisUser]) {
    return {
      ownKey: ownKey,
      profileUserKey: thisUser,
      hasOwnProfile: users[ownKey] !== undefined,
      given: users[thisUser].given_en,
      family: users[thisUser].family_en,
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

const mapDispatchToProps = {
  editName: editName,
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
