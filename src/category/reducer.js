import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { createSelector } from "reselect"

const isModalOpen = handleActions(
  {
    OPEN_CATEGORY_MODAL: () => true,
    CLOSE_CATEGORY_MODAL: () => false,
  },
  false
)

const isLoading = handleActions(
  { POST_CATEGORY_ITEM: () => true, POST_CATEGORY_ITEM_END: () => false },
  false
)

const hasError = handleActions(
  {
    POST_CATEGORY_ITEM: () => false,
    POST_CATEGORY_ITEM_END: (_, action) => !!action.error,
  },
  false
)

const toById = (collection, initialValue = {}) =>
  collection.reduce(
    (byId, item) => ({ ...byId, [item.id]: item }),
    initialValue
  )

const byId = handleActions(
  {
    FETCH_CATEGORY_SUCCESS: (state, action) =>
      toById(action.payload.items, state),
  },
  {}
)

const allIds = handleActions(
  {
    FETCH_CATEGORY_SUCCESS: (state, { payload }) => {
      const ids = payload.items.map(item => item.id)
      const unique = ids.filter(id => !state.includes(id))
      return [...state, ...unique]
    },
  },
  []
)

const favoriteIds = handleActions(
  {
    FETCH_FAVORITES_END: (state, { payload: ids }) => {
      const unique = ids.filter(id => !state.includes(id))
      return [...state, ...unique]
    },
    ADD_FAVORITE: (state, { payload: { id } }) => state.concat(id),
    REMOVE_FAVORITE: (state, { payload: { id } }) =>
      state.filter(x => x !== id),
  },
  []
)

const getAllIds = state => state.allIds
const getById = state => state.byId
const getFavoriteIds = state => state.favoriteIds
const getCategoryId = (_, props) => props.categoryId

const getCategoryItems = createSelector(
  getAllIds,
  getById,
  getFavoriteIds,
  (allIds, byId, favoriteIds) =>
    allIds
      .map(id => byId[id])
      .map(x => ({ ...x, isFavorite: favoriteIds.includes(x.id) }))
)

const getCategoryItemsByType = createSelector(
  getAllIds,
  getById,
  getCategoryId,
  getFavoriteIds,
  (allIds, byId, categoryId, favoriteIds) =>
    allIds
      .map(id => byId[id])
      .filter(item => item.type === categoryId)
      .map(x => ({ ...x, isFavorite: favoriteIds.includes(x.id) }))
)

const category = combineReducers({
  byId,
  allIds,
  favoriteIds,
  isModalOpen,
  isLoading,
  hasError,
})

export { getCategoryItems, getCategoryItemsByType }

export default category
