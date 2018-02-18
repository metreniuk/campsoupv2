import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import BottomPanel from './BottomPanel'
import HomeNav from './HomeNav'

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

const Home = () => (
  <Wrapper>
    <SidebarWrapper>
      <Sidebar />
    </SidebarWrapper>
    <Body>
      <HomeNav />
      <BottomPanelWrapper>
        <BottomPanel />
      </BottomPanelWrapper>
    </Body>
  </Wrapper>
)

export default Home
