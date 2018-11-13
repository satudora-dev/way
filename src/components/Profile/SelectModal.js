import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';

const style = {
  btnstyle: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "#04B486",
    "color": "white",
    textTransform: "none",
  },
  disabledstyle: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "gray",
    "color": "white",
    textTransform: "none",
  },
}

const SelectModal = ({
  children,
  mode,
  buttonText,
  modalOpen,
  choicesArray,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey,
  ...other
}) => {

  let Choices

  let choicesArrayMap = (
    choicesArray.map(
      choice => (
        <MenuItem
          key = {choice}
          value = {choice}
        >
          <Checkbox
            checked = {currentChecks.indexOf(choice) !== -1}
          />
          <ListItemText
            primary = {choice}
          />
        </MenuItem>
      ))
  )

  if (mode === "single") {
    Choices = (
      <Select
        value = {currentChecks}
        onChange = {(e) => updateData(currentChecks, e.target.value, profileUserKey)}
      >
        {choicesArray.map(
          choice => (
            <MenuItem
              key = {choice}
              value = {choice}
            >
              {choice}
            </MenuItem>
          ))}
      </Select>
    )
  } else if (mode === "multiple") {
    Choices = (
      <Select
        multiple
        value = {currentChecks}
        renderValue={value => value.join(', ')}
        onChange = {(e) => updateData(currentChecks, e.target.value, profileUserKey)}
      >
        {choicesArray.map(
          choice => (
            <MenuItem
              key = {choice}
              value = {choice}
            >
              <Checkbox
                checked = {currentChecks.indexOf(choice) !== -1}
              />
              <ListItemText
                primary = {choice}
              />
            </MenuItem>
          ))}
      </Select>
    )
  }

  return (
    <div>
      <Grid>
        <Modal
          open = {modalOpen}
          onClose = {() => onModalClose()}
        >

          <div {...other}>
            <div>
              <h3>{children}</h3>
            </div>
            <div>
              {Choices}
            </div>
            <div
              style = {{margin:"10px"}}
            >
              <Button
                style = {
                  currentChecks === 0 || currentChecks === undefined ?
                  style.disabledstyle : style.btnstyle
                }
                variant = "outlined"
                onClick = {() => onModalClose()}
              >
                {buttonText}
              </Button>
            </div>
          </div>

        </Modal>
      </Grid>
    </div>
  )
}

export default SelectModal
