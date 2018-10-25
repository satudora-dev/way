import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuAppBar from '../../components/MenuAppBar';

import {connect} from 'react-redux'
import * as actions from '../../actions'

class User extends Component {
  constructor(props){
    super(props);
    this.orderMODES={
      SORTED: 0,
      RANDOM: 1,
    };
    this.orderOptions=["RANDOM","PROJECT"];
    this.refineMODES={
      all: 0,
      position: 1,
      project: 2,
      tag: 3,
    };
    this.state={
      authenticated: false,
      currentUser: null,
      users: [],
      orderMode: this.orderMODES.SORTED,
      refineMode: this.refineMODES.all,
      refineKey: "",
      orderMenuOpen: false,
    };
  }

  componentWillMount(){
    let Userref=firebaseDB.ref('users');
    const params= new URLSearchParams(this.props.location.search)

    //クエリの取得、なければ一覧
    if(params.length<2 || (
        !params.get("position") &&
        !params.get("project") &&
        !params.get("tag"))) {
      this.predicate = user => true;
    }
    else if (params.get("position")) {
      const positionName = params.get("position")
      this.predicate = user => {
        return user.position !== undefined && user.position === positionName;
      };
      this.setState({
        refineMode: this.refineMODES.position,
        refineKey: positionName,
      });
    }
    else if (params.get("project")) {
      const projectName = params.get("project")
      this.predicate = user => {
        return user.projects !== undefined && user.projects[projectName] !== undefined;
      };
      this.setState({
        refineMode: this.refineMODES.project,
        refineKey: projectName,
      });
    }
    else if (params.get("tag")) {
      const tagName = params.get("tag")
      this.predicate = user => {
        return user.tags !== undefined && user.tags[tagName] !== undefined;
      };
      this.setState({
        refineMode: this.refineMODES.tag,
        refineKey: tagName,
      });
    }
  }

  toProfile(id,iconSrc){
    this.props.history.push({
      pathname: `/users/${id}`,
      state: {
        id: id,
        icon: iconSrc,
      },
    });
  }

  switchOrderMenu(on){
    this.setState({orderMenuOpen: on});
  }

  shuffleUserOrder(){
    this.setState({orderMODES: this.orderMODES.RANDOM});
    let usrs=this.state.users;
    //Fisher–Yatesアルゴリズム
    for(let i=usrs.length-1;i>0;i--){
      let r=Math.floor(Math.random()*(i+1));
      let temp=usrs[i];
      usrs[i]=usrs[r];
      usrs[r]=temp;
    }
    this.setState({users: usrs});
  }

  render() {
    const style = {
      iconstyle: {
        width: "128px",
        height: "128px",
        "object-fit": "cover",
        "border-radius": "50%",
        padding: "0px", //paddingだとその要素自体に余白つける
        //margin: "8px", //marginだとその要素の外側に余白つける
        "box-shadow": "0 4px 10px gray",
        cursor: "finger",
      },
      divstyle: {
        "text-align": "left",
        "padding": "10px 10px 10px",
      },
      btnstyle: {
        color: "white",
        "background-color": "#04B486",
      },
      iconbtnstyle: {
        "border-radius": "50%",
        padding: 0,
        margin: "5px"
      },
    };

    if(this.props.ownkey ===null) this.props.history.push('./login')
    else if (this.props.ownkey && this.props.hasOwnProfile ===false ) this.props.history.push('./signup')

    const visibleUsers = this.props.users || {};
    return (
      <div className="Users">
        <MenuAppBar/>

        {(()=>{
          if(this.state.refineKey!==""){
            return(
              <span>
                <br/>
                <Button variant="contained" style={style.btnstyle}>{this.state.refineKey}</Button>
              </span>
            );
          }
        })()}
        <div style={style.divstyle}>
        <Menu open={this.state.orderMenuOpen}>
          {this.orderOptions.map((mode,i)=>{
            return (
              <MenuItem key={i}
                onClick={()=>this.switchOrderMenu(false)}>
                {mode}
              </MenuItem>
            );
          })}
        </Menu>
        <Button  variant="contained" style={style.btnstyle}
          onClick={()=>this.shuffleUserOrder()}>
          <img src="./refresh_white_18x18.png" alt="" />
          RANDOM
        </Button>
        <hr />
        <div style={{"text-align":"center"}}>
          {Object.keys(visibleUsers).map( (key,i) =>{
            if(this.predicate(visibleUsers[key]))
            return (
              <Button className="User" key={i} style={style.iconbtnstyle}
                onClick={()=>this.toProfile(key,visibleUsers[key].icon)}>
                <img src={visibleUsers[key].icon} style={style.iconstyle} alt="failed loading..."/>
              </Button>
            );
          })}
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const ownkey = state.auth.ownkey;
  const users = state.users;
  return {
    ownkey: ownkey,
    hasOwnProfile: state.users[ownkey] !== undefined,
    users: users
  }
}



export default connect(mapStateToProps,null)(User);
