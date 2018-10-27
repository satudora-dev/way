import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuAppBar from '../../components/MenuAppBar';

import {connect} from 'react-redux';

class Users extends Component {
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
      visibleUserKeys: [],
      orderMode: this.orderMODES.SORTED,
      refineMode: this.refineMODES.all,
      refineKey: "",
      orderMenuOpen: false,
    };
  }

  componentWillMount(){
    const params= new URLSearchParams(this.props.location.search)
    //クエリの取得、なければ一覧
    if (params.get("position")) {
      const positionName = params.get("position")
      this.visibilityFilter = user => {
        return user.position === positionName;
      };
      this.setState({
        refineMode: this.refineMODES.position,
        refineKey: positionName,
      });
    }
    else if (params.get("project")) {
      const projectName = params.get("project")
      this.visibilityFilter = user => {
        return user.projects && user.projects.includes(projectName);
      };
      this.setState({
        refineMode: this.refineMODES.project,
        refineKey: projectName,
      });
    }
    else if (params.get("tag")) {
      const tagName = params.get("tag")
      this.visibilityFilter = user => {
        return user.tags && user.tags.includes(tagName);
      };
      this.setState({
        refineMode: this.refineMODES.tag,
        refineKey: tagName,
      });
    }
    else {
      this.visibilityFilter = user => {
        return true
      }
    }
    this.setState({visibleUserKeys: Object.keys(this.props.users)
      .filter(key => this.visibilityFilter(this.props.users[key]))})
  }


  toProfile(id){
    this.props.history.push(`/users/${id}`);
  }

  switchOrderMenu(on){
    this.setState({orderMenuOpen: on});
  }

  shuffleUserOrder(){
    let visibleUserKeys = this.state.visibleUserKeys
    this.setState({orderMODES: this.orderMODES.RANDOM});
    //Fisher–Yatesアルゴリズム
    for(let i=visibleUserKeys.length-1;i>0;i--){
      let r=Math.floor(Math.random()*(i+1));
      let temp=visibleUserKeys[i];
      visibleUserKeys[i]=visibleUserKeys[r];
      visibleUserKeys[r]=temp;
    }
    this.setState({visibleUserKeys: visibleUserKeys})
    console.log(visibleUserKeys)
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
    const users = this.props.users || {};
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
        {this.state.visibleUserKeys.map( (key,i) =>{
          if(users[key])
          return (
            <Button className="User" key={i} style={style.iconbtnstyle}
              onClick={()=>this.toProfile(key)}>
              <img src={users[key].icon} style={style.iconstyle} alt="failed loading..."/>
            </Button>
          );
        })}
        </div>
        </div>
      </div>
    );
  }
}

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



export default connect(mapStateToProps,null)(Users);
