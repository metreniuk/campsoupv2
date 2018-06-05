import { combineReducers } from "redux"
import category from "./category/reducer"

const account = (state = "", { type, payload }) => {
  if (type === "ADD_ACCOUNT_ID") {
    return payload
  }
  return state
}

export default combineReducers({
  category,
  account,
})
