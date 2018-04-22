// @flow
import { call, put, takeEvery } from "redux-saga/effects"
import * as actions from "./actions"

const accountId = "5ad7a447856c0a679da9f4f8"

const Api = {
  fetchCategory: (type = "all") =>
    fetch(`http://localhost:3030/entities/${type !== "all" ? type : ""}`).then(
      res => res.json()
    ),
  fetchFavorites: (accountId = "5ad7a447856c0a679da9f4f8") =>
    fetch(`http://localhost:3030/favorites/${accountId}`).then(res =>
      res.json()
    ),
  postCategoryItem: item =>
    fetch("http://localhost:3030/entities", {
      body: JSON.stringify({ item }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => (res.ok ? res.json() : Promise.reject(res.json()))),
  postFavorite: entityId =>
    fetch(`http://localhost:3030/favorites/${accountId}`, {
      body: JSON.stringify({ entityId }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => (res.ok ? res.json() : Promise.reject(res.json()))),
  deleteFavorite: entityId =>
    fetch(`http://localhost:3030/favorites/${accountId}`, {
      body: JSON.stringify({ entityId }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => (res.ok ? res.json() : Promise.reject(res.json()))),
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

function* fetchFavorites(action) {
  try {
    const response = yield call(Api.fetchFavorites, action.payload.accountId)
    const { items } = response

    yield put(actions.fetchFavoritesEnd(items))
  } catch (e) {
    yield put(actions.fetchFavoritesEnd([]))
  }
}

function* postFavorite(action) {
  const { payload: { id } } = action

  yield put(actions.addFavorite(id))
  try {
    yield put(actions.postFavoriteStart(id))
    const response = yield call(Api.postFavorite, id)
    console.log("SUCCESS_FAVORITE_POST", response)
  } catch (e) {
    console.log("ERROR_FAVORITE_POST", e)
    yield put(actions.postFavoriteEnd(id))
  }
}

function* deleteFavorite(action) {
  const { payload: { id } } = action

  yield put(actions.removeFavorite(id))
  try {
    yield put(actions.deleteFavoriteStart(id))
    const response = yield call(Api.deleteFavorite, id)
    console.log("SUCCESS_FAVORITE_DELETE", response)
  } catch (e) {
    console.log("ERROR_FAVORITE_DELETE", e)
    yield put(actions.deleteFavoriteEnd(id))
  }
}

function* category() {
  yield takeEvery("FETCH_CATEGORY", fetchCategory)
  yield takeEvery("FETCH_FAVORITES", fetchFavorites)
  yield takeEvery("POST_CATEGORY_ITEM", postCategoryItem)
  yield takeEvery("POST_FAVORITE", postFavorite)
  yield takeEvery("DELETE_FAVORITE", deleteFavorite)
}

export default category
