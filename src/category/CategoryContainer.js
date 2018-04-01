// @flow
import Category from "./Category"
import { compose, mapProps, lifecycle } from "recompose"
import { connect } from "react-redux"
import { fetchCategory } from "./actions"
import { getCategoryItemsByType } from "./reducer"

function componentDidMount() {
  const { categoryId, dispatch } = this.props
  dispatch(fetchCategory(categoryId))
}

const CategoryContainer = compose(
  mapProps(props => ({ categoryId: props.match.params.categoryId })),
  connect((state, props) => ({
    entities: getCategoryItemsByType(state.category, props),
  })),
  lifecycle({ componentDidMount })
)(Category)

export default CategoryContainer
