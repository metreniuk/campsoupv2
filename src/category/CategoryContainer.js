// @flow
import Category from "./Category"
import { compose, mapProps, lifecycle, withHandlers } from "recompose"
import { connect } from "react-redux"
import {
  fetchCategory,
  openCategoryModal,
  postFavorite,
  deleteFavorite,
} from "./actions"
import { getCategoryItemsByType } from "./reducer"

function componentDidMount() {
  const { categoryId, dispatch } = this.props
  dispatch(fetchCategory(categoryId))
}

function handleAddClick({ dispatch }) {
  return () => {
    dispatch(openCategoryModal())
  }
}

function handleFavoriteClick({ dispatch }) {
  return (id, isFavorite) =>
    isFavorite ? dispatch(deleteFavorite(id)) : dispatch(postFavorite(id))
}

const CategoryContainer = compose(
  mapProps(props => ({ categoryId: props.match.params.categoryId })),
  connect((state, props) => ({
    entities: getCategoryItemsByType(state.category, props),
  })),
  lifecycle({ componentDidMount }),
  withHandlers({ handleAddClick, handleFavoriteClick })
)(Category)

export default CategoryContainer
