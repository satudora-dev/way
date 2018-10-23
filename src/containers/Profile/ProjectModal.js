import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import ProjectsSelect from '../../components/ProjectSelect';
const style = {
  divstyle: {
    "background-image": "url('/grad.jpg')",
    "backend-position": "center center",
    "background-repeat": "no-repeat",
    "background-size": "cover",
  },
  namestyle: {
    color: "#D8D8D8",
    "font-family": "Avenir",
    "font-size": "40px",
    margin: "10px"
  },
  categorystyle: {
    "text-align": "left",
    margin: "10px 30px",
    "font-family": "Avenir",
  },
  tagstyle: {
    "text-align": "left",
    "font-family": "Avenir",
    margin: "10px 30px",
    "margin-bottom": "40px",
  },
  btnstyle: {
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "#04B486",
    "color": "white",
    "text-transform": "none",
  },
  tagbtnstyle: {
    "padding-right":"8px",
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "#04B486",
    "text-transform": "none",
    "color": "white",
  },
  addstyle: {
    margin: "10px"
  },
  iconstyle: {
    height:"20px",width:"20px",
    "margin-left":"10px",
  },
  deletestyle: {
    cursor:"pointer",
    color:"white",
    outline:"none",
    border:"0",
    "background-color":"rgba(0,0,0,0)",
  },
  addtagstyle: {
    display:"inline-block",
    "margin-top":"250px",
    height:"150px",
    width:"300px",
    "background-color":"white",
    "text-align":"center",
    "outline":"none",
    "border-radius":"30px",
    "font-family":"Avenir",
  },
  selectProjectModalStyle: {
    display:"inline-block",
    "margin-top":"250px",
    height:"200px",
    //widthはGridでレスポンシブに
    "min-width": "300px",
    "background-color":"white",
    "text-align":"center",
    "outline":"none",
    "border-radius":"30px",
    "font-family":"Avenir",
      },
  btnstyle: {
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "#04B486",
    "color": "white",
    "text-transform": "none",
  },
  disabledstyle: {
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "gray",
    "color": "white",
    "text-transform": "none",
  },
}

const ProjectModal = ({projectModalOpen, currentProjects, setProjects, onProjectModalclose, profileid}) => {
  return(
    <div>
      <Grid>
        <Modal open={projectModalOpen}
               onClose={() => {
                 setProjects(currentProjects, profileid)
                 onProjectModalclose()}}
        >
          <div style={style.selectProjectModalStyle}>
            <h3>select project</h3>
            <ProjectsSelect projects={currentProjects} userID={profileid}/>
            <Button style={currentProjects.length == 0 || currentProjects === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="add"
                disabled={currentProjects.length == 0 || currentProjects === undefined}
                onClick={() => {
                  setProjects(currentProjects, profileid);
                  onProjectModalclose();
                }}
            >
            done
            </Button>
          </div>
        </Modal>
      </Grid>
    </div>
  )
}

export default ProjectModal;
