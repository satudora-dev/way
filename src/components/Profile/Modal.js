import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';

const OriginalModal = ({
  children,
  mode = "single",
  buttonText,
  modalOpen,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey
}) => {

  let Choices

  if (mode === "single") {
    Choices = (
      <Select>
        {aitl_positions.map(
          position => (
            <MenuItem
              key = {position}
              value = {position}
            >
              {position}
            </MenuItem>
          ))}
      </Select>
    )
  }

  return (
    <div>
      <Modal
        open = {modalOpen}
        onClose = {() => onModalClose()}
      >

        <div>
          <div>
            {children}
          </div>
          <div>
            {Choices}
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default OriginalModal
