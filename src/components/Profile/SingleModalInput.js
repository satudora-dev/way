import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import aitl_positions from '../../components/aitl_positions';
import aitl_projects from '../../components/aitl_projects';


const SingleModalInput = ({
  currentChecks,
  inputArray,
  updateData,
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
