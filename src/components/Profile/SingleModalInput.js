import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


SingleModalInput = ({
  currentChecks,
  inputArray,
  profileUserKey
}) => {
  return (
    <Select
      value = {currentChecks}
      onChange = {(e) => updateData(currentChecks, e.target.value, profileUserKey)}
    >
      {inputArray.map(
        choice => (
          <MenuItem
            key = {choice}
            value = {choice}
          >
            {choice}
          </MenuItem>
        ))}
    </Select>
  )
}

export default SingleModalInput
