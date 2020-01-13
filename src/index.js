import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import App from "./components/App"
import reducer from "./reducers"
import saga from "./sagas"

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </Provider>,
  document.getElementById("root")
)
