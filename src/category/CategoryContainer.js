// @flow
import Category from "./Category"
import { compose, mapProps, lifecycle, withHandlers } from "recompose"
import { connect } from "react-redux"
import { fetchCategory, openCategoryModal } from "./actions"
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

const CategoryContainer = compose(
  mapProps(props => ({ categoryId: props.match.params.categoryId })),
  connect((state, props) => ({
    entities: getCategoryItemsByType(state.category, props),
  })),
  lifecycle({ componentDidMount }),
  withHandlers({ handleAddClick })
)(Category)

export default CategoryContainer
