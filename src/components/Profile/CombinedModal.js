import React from 'react';
import SingleModalInput from './SingleModalInput';
import MultipleModalInput from './MultipleModalInput';
import TextModalInput from './TextModalInput';
import ModalCase from './ModalCase';


const CombinedModal = ({
  children,
  mode,
  buttonText,
  modalOpen,
  inputArray,
  currentChecks,
  updateData,
  onModalClose,
  profileUserKey,
  addText,
  ...other
}) => {

  let ModalInput
  let input

  if (mode === "single") {
    ModalInput = (
      <SingleModalInput
        currentChecks = {currentChecks}
        inputArray = {inputArray}
        updateData = {updateData}
        profileUserKey = {profileUserKey}
      />
    )

  } else if (mode === "multiple") {
    ModalInput = (
      <MultipleModalInput
        currentChecks = {currentChecks}
        inputArray = {inputArray}
        updateData = {updateData}
        profileUserKey = {profileUserKey}
      />
    )
  } else if (mode === "text") {

    const onTextChange = (e) => {
      return (
        e.target.value
      )
    }
    ModalInput = (
      <TextModalInput
        input = {input}
        onTextChange = {onTextChange}
      />
    )
  }

  return (
    <ModalCase
      mode = {mode}
      input = {input}
      modalInput = {ModalInput}
      buttonText = {buttonText}
      modalOpen = {modalOpen}
      inputArray = {inputArray}
      currentChecks = {currentChecks}
      updateData = {updateData}
      onModalClose = {onModalClose}
      profileUserKey = {profileUserKey}
      addText = {addText}
      {...other}
    >
      {children}
    </ModalCase>
  )
}

export default CombinedModal
