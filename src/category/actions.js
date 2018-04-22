import { createActions, createAction } from "redux-actions"

const toNamedPayload = name => value => ({ [name]: value })

export const postCategoryItemEnd = createAction("POST_CATEGORY_ITEM_END")
export const postFavoriteEnd = createAction("POST_FAVORITE_END")
export const deleteFavoriteEnd = createAction("DELETE_FAVORITE_END")
export const fetchFavoritesEnd = createAction("FETCH_FAVORITES_END")

export const {
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryError,
  postCategoryItem,
  fetchFavorites,
  postFavorite,
  deleteFavorite,
  addFavorite,
  removeFavorite,
  openCategoryModal,
  closeCategoryModal,
  postFavoriteStart,
  deleteFavoriteStart,
} = createActions(
  {
    FETCH_CATEGORY: toNamedPayload("type"),
    FETCH_CATEGORY_SUCCESS: toNamedPayload("items"),
    FETCH_CATEGORY_ERROR: toNamedPayload("message"),
    POST_CATEGORY_ITEM: toNamedPayload("item"),
    FETCH_FAVORITES: toNamedPayload("accountId"),
    POST_FAVORITE: toNamedPayload("id"),
    DELETE_FAVORITE: toNamedPayload("id"),
    ADD_FAVORITE: toNamedPayload("id"),
    REMOVE_FAVORITE: toNamedPayload("id"),
  },
  "OPEN_CATEGORY_MODAL",
  "CLOSE_CATEGORY_MODAL",
  "POST_FAVORITE_START",
  "DELETE_FAVORITE_START"
)
