// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import styled from "styled-components"

import Sidebar from "./Sidebar"
import BottomPanelContainer from "../category/BottomPanelContainer"
import HomeNav from "./HomeNav"
import Projects from "../projects/Projects"
import CategoryContainer from "../category/CategoryContainer"

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

type Props = {
  match: {
    path: string,
  },
}

const Home = ({ match }: Props) => (
  <Wrapper>
    <SidebarWrapper>
      <Sidebar />
    </SidebarWrapper>
    <Body>
      <Switch>
        <Route path={match.path} exact component={HomeNav} />
        <Route path={`${match.path}projects`} component={Projects} />
        <Route
          path={`${match.path}:categoryId`}
          component={CategoryContainer}
        />
      </Switch>
      <BottomPanelWrapper>
        <BottomPanelContainer />
      </BottomPanelWrapper>
    </Body>
  </Wrapper>
)

export default Home
