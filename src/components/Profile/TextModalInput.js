import React from 'react';
import TextField from '@material-ui/core/TextField';


const TextModalInput = ({ input }) => {
  return (
    <TextField
      label = "text"
      value = {input}
      onChange = {(e) => {input = e.target.value}}
    />
  )
}

export default TextModalInput
