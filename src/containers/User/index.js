import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import {withRouter,Link} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuAppBar from '../../components/MenuAppBar';

class Users extends Component {
  constructor(props){
    super(props);
    this.orderMODES={
      RANDOM: 0,
      PROJECT: 1,
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
      orderMode: this.orderMODES.RANDOM,
      refineMode: this.refineMODES.all,
      refineKey: "",
      orderMenuOpen: false,
    };
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user){
        this.props.history.push('/login');
      }
      else{
        let ref=firebaseDB.ref('users');
        const params= new URLSearchParams(this.props.location.search)
        let predicate;
        if(params.length<2)predicate=(x=>{return true;});//クエリの取得、なければ一覧
        else {
          if (params.length < 2
            || (!params.get("position") && !params.get("project") && !params.get("tag"))) predicate = (x => {
            return true;
          });
          else {
            if (params.get("position")) {
              const positionName = params.get("position")
              predicate = (x => {
                return x.position !== undefined && x.position === positionName;
              });
              this.setState({
                refineMode: this.refineMODES.position,
                refineKey: positionName,
              });
            }
            if (params.get("project")) {
              const prjName = params.get("project")
              predicate = (x => {
                return x.projects !== undefined && x.projects[prjName] !== undefined;
              });
              this.setState({
                refineMode: this.refineMODES.project,
                refineKey: prjName,
              });
            }
            if (params.get("tag")) {
              const tagName = params.get("tag")
              predicate = (x => {
                return x.tags !== undefined && x.tags[tagName] !== undefined;
              });
              this.setState({
                refineMode: this.refineMODES.tag,
                refineKey: tagName,
              });
            }
          }
        }

        ref.on('child_added',(snapshot)=>{
          let val=snapshot.val();
          if(!predicate(val))return;
          let id=snapshot.key;
          if(val.haveIcon){
            this.downloadImage(id,val.given,val.family);
          }
          else{
            let usrs=this.state.users;
            usrs.push({
              'id': id,
              'givenName': val.given,
              'familyName': val.family,
              'icon': "/portrait.png",
            });
            this.setState({users: usrs});
          }
        });
      }
    });
  }

  downloadImage(id,given,family){
    let storageRef=firebaseStorage.ref('icons/'+id);
    storageRef.getDownloadURL().then((url)=>{
      let usrs=this.state.users;
      usrs.push({
        'id': id,
        'givenName': given,
        'familyName': family,
        'icon': url
      });
      this.setState({users: usrs});
    });
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
        <Button  variant="contained" style={style.btnstyle}>
          <img src="./refresh_white_18x18.png" alt="" />
          RANDOM
        </Button>
        <hr />
        <div style={{"text-align":"center"}}>
        {this.state.users.map((user,i)=>{
          return (
            <Button className="User" key={i} style={style.iconbtnstyle}
              onClick={()=>this.toProfile(user.id,user.icon)}>
              <img src={user.icon} style={style.iconstyle} alt="failed loading..."/>
            </Button>
          );
        })}
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Users);
