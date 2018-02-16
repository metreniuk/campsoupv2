import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import Home from './Home'
import Welcome from './Welcome'
import Signin from '../auth/Singin'
import Signup from '../auth/Signup'
import Category from '../category/Category'
import Projects from '../projects/Projects'

import '../styles/reset.css'
// import '../styles/normalize.css'
import '../styles/main.css'

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route path="/welcome" component={Welcome}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/category" component={Category}/>
      <Route path="/projects" component={Projects}/>
    </div>
  </BrowserRouter>
)

export default App
