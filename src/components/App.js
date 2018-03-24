import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Home"
import Welcome from "./Welcome"
import SigninContainer from "../auth/SigninContainer"
import SignupContainer from "../auth/SignupContainer"

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/signin" component={SigninContainer} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
