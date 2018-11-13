import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';


MultipleModalInput = ({
  currentChecks,
  inputArray,
  profileUserKey
}) => {
  return (
    <Select
      multiple
      value = {currentChecks}
      renderValue={value => value.join(', ')}
      onChange = {(e) => updateData(currentChecks, e.target.value, profileUserKey)}
    >
      {inputArray.map(
        choice => (
          <MenuItem
            key = {choice}
            value = {choice}
          >
            <Checkbox
              checked = {currentChecks.indexOf(choice) !== -1}
            />
            <ListItemText
              primary = {choice}
            />
          </MenuItem>
        ))}
    </Select>
  )
}

export default MultipleModalInput
