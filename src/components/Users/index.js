import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import MenuAppBar from '../../components/MenuAppBar'


const Users = ({ users, location, history }) => {


  const params = new URLSearchParams(location.search)
  const position = params.get("position")
  const project = params.get("project")
  const tag = params.get("tag")


  let refineKey = ""
  if (position) {refineKey = position}
  else if (project) {refineKey = project}
  else if (tag) {refineKey = tag}


  const visibleUserKeys = Object.keys(users).filter(
    key => {
      let user = users[key]
      if (position) {return (user.position === position)}
      else if (project) {return (user.projects && user.projects.includes(project))}
      else if (tag) {return (user.tags && user.tags.includes(tag))}
      else {return (true)}
    }
  ).sort(
    (key1, key2) => {
      key1 = key1.toString()
      key2 = key2.toString()
      if (key1 > key2) {return -1}
      else if (key1 < key2) {return 1}
      else {return 0}
    }
  )


  const toProfile = key => {
    history.push(`/users/${key}`)
  }


  const style = {
    iconstyle: {
      width: "128px",
      height: "128px",
      objectFit: "cover",
      borderRadius: "50%",
      padding: "0px",
      boxShadow: "0 4px 10px gray",
      cursor: "finger",
    },
    divstyle: {
      textAlign: "left",
      padding: "10px 10px 10px",
    },
    btnstyle: {
      color: "white",
      backgroundColor: "#04B486",
    },
    iconbtnstyle: {
      borderRadius: "50%",
      padding: 0,
      margin: "5px"
    },
  }

  
  return (
    <div className="User">
      <MenuAppBar />
      {(() => {
        if (refineKey !== "") {
          return (
            <span>
              <br />
              <Button
                variant="contained"
                style={style.btnstyle}
              >
                {refineKey}
              </Button>
            </span>
          )
        }
      })()}

      <div style={style.divstyle}>

        <div style={{textAlign: "center"}}>
          {visibleUserKeys.map((key,index) => {
            return (
              <Button
                className="User"
                key={index}
                style={style.iconbtnstyle}
                onClick={() => toProfile(key)}
              >
                <img
                  src={users[key].icon}
                  style={style.iconstyle}
                  alt="failed loading..."
                />
              </Button>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Users
