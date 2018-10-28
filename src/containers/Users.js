import Users from '../components/Users';
import { connect } from 'react-redux';



const mapStateToProps = ({auth, users}) => {
  const ownKey = auth.ownKey;
  if(ownKey){
    return {
      ownKey: ownKey,
      hasOwnProfile: users[ownKey] !== undefined,
      users: users
    }
  }
  else{
    return{
      ownKey: null,
      hasOwnProfile: users[ownKey] !== undefined,
      users: {}
    }
  }
}

export default connect(mapStateToProps,null)(Users)
