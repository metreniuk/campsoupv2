import React from 'react'
import { Route } from 'react-router-dom'

import Project from './Project'

const Projects = ({match}) => (
  <div>
    <Route path={`${match.path}/:projectId`} component={Project} />
  </div>
)

export default Projects
