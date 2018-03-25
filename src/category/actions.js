import { createActions } from "redux-actions"

const toNamedPayload = name => value => ({ [name]: value })

export const {
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryError,
} = createActions({
  FETCH_CATEGORY: toNamedPayload("type"),
  FETCH_CATEGORY_SUCCESS: toNamedPayload("items"),
  FETCH_CATEGORY_ERROR: toNamedPayload("message"),
})
