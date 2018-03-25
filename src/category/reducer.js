import { handleActions } from "redux-actions"
import { combineReducers } from "redux"

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

const toAllIds = item => item.id
const allIds = handleActions(
  {
    FETCH_CATEGORY_SUCCESS: (state, { payload }) => [
      ...state,
      ...payload.items.map(toAllIds),
    ],
  },
  []
)

const category = combineReducers({ byId, allIds })

export default category
