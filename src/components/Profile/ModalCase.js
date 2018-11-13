import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';
import SingleModalInput from './SingleModalInput';
import MultipleModalInput from './MultipleModalInput';
import TextModalInput from './TextModalInput';

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

const ModalCase = ({
  children,
  modalInput,
  buttonText,
  modalOpen,
  inputArray,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey,
  addText,
  ...other
}) => {

  let ModalInput
  let input

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
              {ModalInput}
            </div>
            <div
              style = {{margin:"10px"}}
            >
              <Button
                style = {style.btnstyle}
                variant = "outlined"
                onClick = {() => {
                  if (mode === "text") {
                    if (input === "" || input === undefined) {
                      return
                    } else {
                      addText(input, profileUserKey)
                      onModalClose()
                    }
                  } else {
                    onModalClose()
                  }
                }}
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

export default ModalCase
