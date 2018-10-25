import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
const TagModal = ({tagModalOpen, addTag, onTagModalClose, profileID}) => {
  let input
  const handleChange = (e) => {input = e.target.value}
  return(
    <div>
      <Grid>
        <Modal open={tagModalOpen}
               onClose={() => onTagModalClose()}>
          <div style={style.selectProjectModalStyle}>
            <h3>add tag!!</h3>
            <TextField label={"tag"}
                       value={input}
                       style={{"margin-right": "10px"}} autoFocus
                       onChange={(e) => handleChange(e)}/>
            <Button style={input === "" ? style.disabledstyle : style.btnstyle}
                    variant="outlined"
                    disabled={input === ""}
                    value="add"
                    onClick={() => {
                      if (input === "" || input === undefined) return;
                      addTag(input,profileID);
                      onTagModalClose();
                    }}>
            add
            </Button>
          </div>
        </Modal>
      </Grid>
    </div>
  )
}

export default TagModal;
