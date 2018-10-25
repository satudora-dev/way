import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
const style = {
  btnstyle: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "#04B486",
    "color": "white",
    textTransform: "none",
  },
  selectProjectModalStyle: {
    display:"inline-block",
    marginTop:"250px",
    height:"200px",
    //widthはGridでレスポンシブに
    minWidth: "300px",
    backgroundColor:"white",
    textAlign:"center",
    "outline":"none",
    borderRadius:"30px",
    fontFamily:"Avenir",
  },
  disabledstyle: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "gray",
    "color": "white",
    textTransform: "none",
  },
}
const TagModal = ({tagModalOpen, addTag, onTagModalClose, profileUserKey}) => {
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
                       style={{marginRight: "10px"}} autoFocus
                       onChange={(e) => handleChange(e)}/>
            <Button style={input === "" ? style.disabledstyle : style.btnstyle}
                    variant="outlined"
                    disabled={input === ""}
                    value="add"
                    onClick={() => {
                      if (input === "" || input === undefined) return;
                      addTag(input,profileUserKey);
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
