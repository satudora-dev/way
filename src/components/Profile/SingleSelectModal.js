import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
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

const SingleSelectModal = ({
  children,
  buttonText,
  modalOpen,
  inputArray,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey,
  ...other
}) => {
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
              <Select
                value = {currentChecks}
                onChange = {(e) => updateData(currentChecks, e.target.value, profileUserKey)}
              >
                {inputArray.map(
                  choice => (
                    <MenuItem
                      key = {choice}
                      value = {choice}
                    >
                      {choice}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div
              style = {{margin:"10px"}}
            >
              <Button
                style = {style.btnstyle}
                variant = "outlined"
                onClick = {() => {
                    onModalClose()
                  }
                }
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

export default SingleSelectModal
