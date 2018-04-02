import { call, put, takeEvery } from "redux-saga/effects"
import * as actions from "./actions"

const Api = {
  fetchCategory: (type = "all") =>
    fetch(`http://localhost:3030/entity/${type !== "all" ? type : ""}`).then(
      res => res.json()
    ),
  postCategoryItem: item =>
    fetch("http://localhost:3030/entity", {
      body: JSON.stringify({ item }),
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(res.json())
    }),
}

function* fetchCategory(action) {
  try {
    const response = yield call(Api.fetchCategory, action.payload.type)
    const { items } = response

    yield put(actions.fetchCategorySuccess(items))
  } catch (e) {
    yield put(actions.fetchCategoryError(e.message))
  }
}

function* postCategoryItem(action) {
  try {
    const { payload: { item } } = action
    const response = yield call(Api.postCategoryItem, item)
    console.log("SUCCESS", response)
    yield put(actions.postCategoryItemEnd())
    yield put(actions.fetchCategory(item.type))
  } catch (e) {
    yield put(actions.postCategoryItemEnd(e))
  }
}

function* category() {
  yield takeEvery("FETCH_CATEGORY", fetchCategory)
  yield takeEvery("POST_CATEGORY_ITEM", postCategoryItem)
}

export default category
