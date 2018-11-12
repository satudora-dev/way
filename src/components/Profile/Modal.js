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
  mode,
  buttonText,
  modalOpen,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey
}) => {
  return (
    <div>
      <Grid>
        <Modal
          open = {modalOpen}
          onClose = {() => onModalClose()}
        >
          <div>
            {children}
          </div>

          <Button onClick = {() => onModalClose()}>
            {buttonText}
          </Button>
        </Modal>
      </Grid>
    </div>
  )
}

export default OriginalModal
