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

class PositionSelect extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      prevPosition: this.props.position || "",
      position: this.props.position || "",
      userID: this.props.userID
    }
    this.updateParentPosition = this.props.updateParentPosition
    this.profDbRef=firebaseDB.ref('users/'+ this.state.userID);
    this.posDbRef=firebaseDB.ref('positions');
  }

  handleChangePosition = event => {
    this.setState({ position: event.target.value })
    const Position = event.target.value
    this.updateProfPosition(Position)
  };

  updateProfPosition(posName){
    let pastPos = this.state.prevProjects
      if (pastPos){
        this.profDbRef.child("position").remove();
        this.prjDbRef.child(pastPos+"/"+this.id).remove();
      }
    if (posName !== ""){
      this.setState({ position: posName});
      this.profDbRef.child("position").set(posName);
      this.posDbRef.child(posName+"/"+this.id).set(true);
      this.setState({ prevPosition: posName});
      this.updateParentPosition(posName);
    }
  };
  render() {
    const { classes, theme } = this.props;

    // !TODO: タグ形式でPositionの表示
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Position</InputLabel>
            {console.log(this.props.position)}
            <Select
              value={this.props.position}
              onChange={this.handleChangePosition}
              input={<Input id="position" />}
              MenuProps={MenuProps}
            >
              <MenuItem value={"アルバイト"}>アルバイト</MenuItem>
              <MenuItem value={"社員"}>社員</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  }
}

PositionSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PositionSelect);
