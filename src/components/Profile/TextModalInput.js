import React from 'react';
import TextField from '@material-ui/core/TextField';


const TextModalInput = ({ input, onTextChange }) => {

  return (
    <TextField
      label = "tag"
      value = {input}
      onChange = {(e) => onTextChange(e)}
    />
  )
}

export default TextModalInput
