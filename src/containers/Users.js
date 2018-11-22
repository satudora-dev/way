import Users from '../components/Users';
import { connect } from 'react-redux';



const mapStateToProps = ({auth, users}) => {
  const currentUserID = auth.currentUserID;
  if(currentUserID){
    return {
      currentUserID: currentUserID,
      hasOwnProfile: users[currentUserID] !== undefined,
      users: users
    }
  }
  else{
    return{
      currentUserID: null,
      hasOwnProfile: users[currentUserID] !== undefined,
      users: {}
    }
  }
}

export default connect(mapStateToProps,null)(Users)
