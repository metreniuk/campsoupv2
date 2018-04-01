import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { createSelector } from "reselect"

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

const getAllIds = state => state.allIds
const getById = state => state.byId
const getCategoryId = (_, props) => props.categoryId

const getCategoryItems = createSelector([getAllIds, getById], (allIds, byId) =>
  allIds.map(id => byId[id])
)

const getCategoryItemsByType = createSelector(
  [getAllIds, getById, getCategoryId],
  (allIds, byId, categoryId) =>
    allIds.map(id => byId[id]).filter(item => item.type === categoryId)
)

const category = combineReducers({ byId, allIds })

export { getCategoryItems, getCategoryItemsByType }

export default category
