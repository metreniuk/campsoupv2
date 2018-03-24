import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Home"
import Welcome from "./Welcome"
import Signin from "../auth/Singin"
import Signup from "../auth/Signup"
import Root from "./Root"

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/" component={Root} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
