import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import ProjectsSelect from '../../components/ProjectSelect';
const style = {
  btnstyle: {
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "#04B486",
    "color": "white",
    "text-transform": "none",
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
  disabledstyle: {
    "margin-right": "10px",
    "margin-bottom": "10px",
    "background-color": "gray",
    "color": "white",
    "text-transform": "none",
  },
}

const ProjectModal = ({projectModalOpen, currentProjects, setProjects, onProjectModalClose, profileID}) => {
  return(
    <div>
      <Grid>
        <Modal open={projectModalOpen}
               onClose={() => {
                 setProjects(currentProjects, profileID)
                 onProjectModalClose()}}
        >
          <div style={style.selectProjectModalStyle}>
            <h3>select project</h3>
            <ProjectsSelect projects={currentProjects} userkey={profileID}/>
            <Button style={currentProjects.length === 0 || currentProjects === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="add"
                disabled={currentProjects.length === 0 || currentProjects === undefined}
                onClick={() => {
                  setProjects(currentProjects, profileID);
                  onProjectModalClose();
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
