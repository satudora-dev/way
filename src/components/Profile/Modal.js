import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';



const OriginalModal = ({
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
          {choice}
        </MenuItem>
      ))
  )

  if (mode === "single") {
    Choices = (
      <Select>
        {choicesArrayMap}
      </Select>
    )
  } else if (mode === "multiple") {
    Choices = (
      <Select
        multiple
        value = {currentChecks}
      >
        {choicesArrayMap}
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
            <div>
              <Button>
                {buttonText}
              </Button>
            </div>
          </div>

        </Modal>
      </Grid>
    </div>
  )
}

export default OriginalModal
