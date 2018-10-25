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
const PositionModal = ({positionModalOpen, currentPosition, updatePosition, onPositionModalClose, profileUserKey}) => {

  return(
    <div>
      <Grid>
        <Modal open={positionModalOpen}
               onClose={() => onPositionModalClose()}>
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
                  <InputLabel htmlFor="select-multiple-checkbox">Position</InputLabel>
                  <Select
                    value={currentPosition}
                    onChange={(e) => updatePosition(currentPosition,e.target.value, profileUserKey)}
                    input={<Input id="position" />}
                    MenuProps={MenuProps}
                  >
                    {aitl_positions.map(project => (
                      <MenuItem key={project} value={project}>{project}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <Button style={currentPosition === "" || currentPosition === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="add"
                disabled={currentPosition === "" || currentPosition === undefined}
                onClick={() => onPositionModalClose()}
            >
            done
            </Button>
          </div>
        </Modal>
      </Grid>
    </div>
  )
}

export default PositionModal;
