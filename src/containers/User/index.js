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
      project: 1,
      tag: 2,
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
        let query=this.props.location.search.split("?");
        let predicate;
        if(query.length<2)predicate=(x=>{return true;});//クエリの取得、なければ一覧
        else{
          query=query[1].split("=");
          if(query.length<2
            ||(query[0]!=="project"&&query[0]!=="tag"))predicate=(x=>{return true;});
          else{
            if(query[0]==="project"){
              predicate=(x=>{
                return x.projects!==undefined && x.projects[query[1]]!==undefined;});
              this.setState({
                refineMode: this.refineMODES.project,
                refineKey: query[1],
              });
            }
            if(query[0]==="tag"){
              predicate=(x=>{
                return x.tags!==undefined && x.tags[query[1]]!==undefined;});
              this.setState({
                refineMode: this.refineMODES.tag,
                refineKey: query[1],
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
        {this.state.users.map((user,i)=>{
          return (
            <span style={{margin: "5px"}}>
            <Button className="User" key={i} style={style.iconbtnstyle}
              onClick={()=>this.toProfile(user.id,user.icon)}>
              <img src={user.icon} style={style.iconstyle} alt="failed loading..."/>
            </Button>
            </span>
          );
        })}
        </div>
      </div>
    );
  }
}

export default withRouter(Users);