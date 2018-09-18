import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import aitl_projects from './aitl_projects';
import {firebaseDB} from '../firebase';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

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


class ProjectsSelect extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      prevProjects: this.props.projects || [],
      projects: this.props.projects || [],
      userID: this.props.userID
    }
    this.updateParentProjects = this.props.updateParentProjects
    this.profDbRef=firebaseDB.ref('users/'+ this.state.userID);
    this.prjDbRef=firebaseDB.ref('projects');
  }

  handleChangeProjects = event => {
    this.setState({ projects: event.target.value })
    const projects = event.target.value
    this.updateProfProjects(projects)
  };

  updateProfProjects(projects){
    for(let prjName of this.state.prevProjects){
      if(!prjName)continue;//空文字判定
      this.profDbRef.child("projects/"+prjName).remove();
      this.prjDbRef.child(prjName+"/members/"+this.state.userID).remove();
    }
    this.setState({ prevProjects: projects})
    for(let prjName of projects){
      if(!prjName)continue;//空文字判定
      this.profDbRef.child("projects/"+prjName).set(true);
      this.prjDbRef.child(prjName+"/members/"+this.state.userID).set(true);
    }
    this.updateParentProjects(projects)
  }

  render() {
    const { classes, theme } = this.props;

    // !TODO: タグ形式でprojectsの表示
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Projects</InputLabel>
            <Select
              multiple
              value={this.state.projects}
              onChange={this.handleChangeProjects}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {aitl_projects.map(project => (
                <MenuItem key={project} value={project}>
                  <Checkbox checked={this.state.projects.indexOf(project) > -1} />
                  <ListItemText primary={project} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  }
}

ProjectsSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProjectsSelect);
