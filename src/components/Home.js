import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import BottomPanel from './BottomPanel'

const Body = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1 1 100%;
`

const SidebarWrapper = styled.div`
  flex: 1 1 auto;
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
      <BottomPanel />
    </Body>
  </Wrapper>
)

export default Home
