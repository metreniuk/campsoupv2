import { createActions, createAction } from "redux-actions"

const toNamedPayload = name => value => ({ [name]: value })

export const postCategoryItemEnd = createAction("POST_CATEGORY_ITEM_END")

export const {
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryError,
  postCategoryItem,
  openCategoryModal,
  closeCategoryModal,
} = createActions(
  {
    FETCH_CATEGORY: toNamedPayload("type"),
    FETCH_CATEGORY_SUCCESS: toNamedPayload("items"),
    FETCH_CATEGORY_ERROR: toNamedPayload("message"),
    POST_CATEGORY_ITEM: toNamedPayload("item"),
  },
  "OPEN_CATEGORY_MODAL",
  "CLOSE_CATEGORY_MODAL"
)
