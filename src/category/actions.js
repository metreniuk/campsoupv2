import { createActions } from "redux-actions"

const toNamedPayload = name => value => ({ [name]: value })

export const {
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryError,
  postCategoryItem,
} = createActions({
  FETCH_CATEGORY: toNamedPayload("type"),
  FETCH_CATEGORY_SUCCESS: toNamedPayload("items"),
  FETCH_CATEGORY_ERROR: toNamedPayload("message"),
  POST_CATEGORY_ITEM: toNamedPayload("item"),
})
