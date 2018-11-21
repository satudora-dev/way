import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


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

const TextModal = ({
  children,
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
              <TextField
                label = "tag"
                value = {input}
                onChange = {(e) => {input = e.target.value}}
              />
            </div>
            <div
              style = {{margin:"10px"}}
            >
              <Button
                style = {style.btnstyle}
                variant = "outlined"
                onClick = {() => {
                  if (input === "" || input === undefined) {
                    return
                  } else {
                    addText(input, profileUserKey)
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

export default TextModal
