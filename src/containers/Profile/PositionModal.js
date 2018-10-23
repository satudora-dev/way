import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import PositionSelect from '../../components/PositionSelect'
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
}
const PositionModal = ({positionModalOpen, currentPosition, addPosition, onPositionModalOpen, profileID}) => {
  return(
    <div>
      <Grid>
        <Modal open={positionModalOpen}
               onClose={() => {
                 addPosition(currentPosition, profileID)
                 onPositionModalOpen()}}
        >
          <div style={style.selectProjectModalStyle}>
            <h3>select project</h3>
            <PositionSelect position={currentPosition} userID={profileID}/>
            <Button style={currentPosition === "" || currentPosition === undefined ? style.disabledstyle : style.btnstyle}
                variant="outlined"
                value="add"
                disabled={currentPosition === "" || currentPosition === undefined}
                onClick={() => {
                  addPosition(currentPosition, profileID);
                  onPositionModalOpen();
                }}
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
