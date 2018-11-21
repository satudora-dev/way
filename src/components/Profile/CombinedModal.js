import React from 'react';
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


  const onTextChange = (e) => {
    input = e.target.value
  }
  ModalInput = (
    <TextModalInput
      input = {input}
      onTextChange = {onTextChange}
    />
  )

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
      {console.log(input)}
      {children}
    </ModalCase>
  )
}

export default CombinedModal
