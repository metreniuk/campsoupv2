// @flow
import { compose, withHandlers, withStateHandlers } from "recompose"
import { connect } from "react-redux"

import AddItemModal from "./AddItemModal"
import { postCategoryItem } from "./actions"

// TODO Form the item object from the state
function handleSubmit({ dispatch }) {
  return item => {
    dispatch(postCategoryItem({ item }))
  }
}

const makeSetter = key => () => event => ({ [key]: event.target.value })

const AddItemModalContainer = compose(
  connect(),
  withStateHandlers(
    {
      title: "",
      description: "",
      age: "",
      tags: "",
    },
    {
      setTitle: makeSetter("title"),
      setDescription: makeSetter("description"),
      setAge: makeSetter("age"),
      setTags: makeSetter("tags"),
    }
  ),
  withHandlers({ handleSubmit })
)(AddItemModal)

export default AddItemModalContainer
