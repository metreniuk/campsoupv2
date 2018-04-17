// @flow
import {
  compose,
  withHandlers,
  withStateHandlers,
  branch,
  renderNothing,
  lifecycle,
} from "recompose"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import AddItemModal from "./AddItemModal"
import { postCategoryItem, closeCategoryModal } from "./actions"

function componentDidUpdate(prevProps) {
  if (prevProps.isLoading && !this.props.isLoading && !this.props.hasError) {
    this.props.clearFields()
  }
}

// TODO Form the item object from the state
function handleSubmit({ dispatch, title, type, age, tags, description }) {
  return () => {
    dispatch(
      postCategoryItem({ title, type, age, description, tags: tags.split(" ") })
    )
  }
}

function handleClose({ dispatch }) {
  return () => {
    dispatch(closeCategoryModal())
  }
}

const makeSetter = key => () => event => ({ [key]: event.target.value })

const AddItemModalContainer = compose(
  withRouter,
  connect(state => ({
    isOpen: state.category.isModalOpen,
    isLoading: state.category.isLoading,
    hasError: state.category.hasError,
  })),
  branch(props => !props.isOpen, renderNothing),
  withStateHandlers(
    ({ match: { params: { categoryId } } }) => ({
      title: "",
      type: categoryId,
      description: "",
      age: "",
      tags: "",
    }),
    {
      setTitle: makeSetter("title"),
      setType: makeSetter("type"),
      setDescription: makeSetter("description"),
      setAge: makeSetter("age"),
      setTags: makeSetter("tags"),
      clearFields: () => () => ({
        title: "",
        type: "",
        description: "",
        age: "",
        tags: "",
      }),
    }
  ),
  withHandlers({ handleSubmit, handleClose }),
  lifecycle({ componentDidUpdate })
)(AddItemModal)

export default AddItemModalContainer
