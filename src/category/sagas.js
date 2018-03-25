import { call, put, takeEvery } from "redux-saga/effects"
import { fetchCategorySuccess, fetchCategoryError } from "./actions"

const Api = {
  fetchCategory: type =>
    fetch(`http://localhost:3030/entity/${type !== "all" ? type : ""}`).then(
      res => res.json()
    ),
}

function* fetchCategory(action) {
  try {
    const response = yield call(Api.fetchCategory, action.payload.type)
    const { items } = response

    yield put(fetchCategorySuccess(items))
  } catch (e) {
    yield put(fetchCategoryError(e.message))
  }
}

function* category() {
  yield takeEvery("FETCH_CATEGORY", fetchCategory)
}

export default category
