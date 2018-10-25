import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import aitl_projects from '../../components/aitl_projects';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 10,
    minWidth: 120,
    maxWidth: 300,
  },
}

const ProjectModal = ({projectModalOpen, currentProjects, updateProjects, onProjectModalClose, profileUserKey}) => {
  return(
    <div>
      <Grid>
        <Modal open={projectModalOpen}
               onClose={() => onProjectModalClose()}
        >
          <div style={style.selectProjectModalStyle}>
            <h3>select project</h3>
            <div style={style.root}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <FormControl style={style.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">Projects</InputLabel>
                  <Select
                    multiple
                    value={currentProjects}
                    onChange={(e) => updateProjects(currentProjects,e.target.value, profileUserKey)}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {aitl_projects.map(project => (
                      <MenuItem key={project} onChange={(e) => console.log(project)} value={project}>
                        <Checkbox
                          checked={currentProjects.indexOf(project) > -1} />
                        <ListItemText primary={project} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <Button style={currentProjects.length === 0 || currentProjects === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="done"
                disabled={currentProjects.length === 0 || currentProjects === undefined}
                onClick={() => onProjectModalClose()}
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
