import React from "react"
import styled from "styled-components"

import Modal from "../components/Modal"
import { bronze, creme } from "../constants/colors"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import timesSolid from "@fortawesome/fontawesome-free-solid/faTimes"

var Heading = styled.h2`
  font-size: 22px;
`

var Label = styled.label`
  font-size: 22px;
  align-self: flex-start;
`

var TextField = styled.input`
  width: 100%;
  text-align: center;
  padding: 5px;
  font-family: "BloggerSansLight", sans-serif;
  font-size: 18px;
  /*add dirty color*/
  background-color: ${creme};
  color: ${bronze};
  border: 1px solid ${bronze};

  &::placeholder {
    color: ${creme};
  }
`

const Action = styled.button`
  font-family: "BloggerSansMedium", sans-serif;
  width: 100%;
  max-width: 180px;
  font-size: 22px;
  background-color: ${bronze};
  color: ${creme};
  border-radius: 10px;
  padding: 10px;
`

var CloseButton = styled.button`
  position: absolute;
  top: -20px;
  right: -30px;
  color: ${bronze};
  background-color: transparent;
  font-size: 22px;
`

var Content = styled.div`
  width: 100%;
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

var Wrapper = styled.div`
  position: relative;
  font-family: "BloggerSansMedium", sans-serif;
  color: ${bronze};
  background-color: ${creme};
  border: 1px solid ${bronze};

  ${TextField} {
    margin-bottom: 10px;
  }
`

const AddItemModal = ({
  title,
  description,
  age,
  tags,
  setTitle,
  setDescription,
  setAge,
  setTags,
  handleClose,
  handleSubmit,
}) => (
  <Modal>
    <Wrapper>
      <CloseButton onClick={handleClose}>
        <FontAwesomeIcon icon={timesSolid} />
      </CloseButton>
      <Content>
        <Heading>Add an item</Heading>
        <Label>Title:</Label>
        <TextField type="text" value={title} onChange={setTitle} />
        <Label>Description:</Label>
        <TextField type="text" value={description} onChange={setDescription} />
        <Label>Age:</Label>
        <TextField type="text" value={age} onChange={setAge} />
        <Label>Tags:</Label>
        <TextField type="text" value={tags} onChange={setTags} />
        <Action onClick={handleSubmit}>Add</Action>
      </Content>
    </Wrapper>
  </Modal>
)

export default AddItemModal
