import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import BottomPanel from './BottomPanel'
import HomeNav from './HomeNav'
import Projects from '../projects/Projects'
import Category from '../category/Category'

const Body = styled.div`
  position: relative;
  flex: 1 1 100%;
`

const SidebarWrapper = styled.div`
  flex: 1 1 auto;
  align-self: flex-end;
`

const BottomPanelWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
`

const Home = ({match}) => (
  <Wrapper>
    <SidebarWrapper>
      <Sidebar />
    </SidebarWrapper>
    <Body>
      <Switch>
        <Route path={match.path} exact component={HomeNav} />
        <Route path={`${match.path}projects`} component={Projects}/>
        <Route path={`${match.path}:categoryId`} component={Category} />
      </Switch>
      <BottomPanelWrapper>
        <BottomPanel />
      </BottomPanelWrapper>
    </Body>
  </Wrapper>
)

export default Home
