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
    ModalInput = SingleModalInput(
      currentChecks,
      inputArray,
      updateData,
      profileUserKey
    )
  } else if (mode === "multiple") {
    ModalInput = MultipleModalInput(
      currentChecks,
      inputArray,
      updateData,
      profileUserKey
    )
  } else if (mode === "text") {
    ModalInput = TextModalInput(
      input = ""
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
