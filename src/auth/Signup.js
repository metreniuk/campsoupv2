// @flow

import React from "react"
import styled from "styled-components"
import { creme, darkBlue, skyBlue } from "../constants/colors"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  background-color: ${skyBlue};
  color: ${creme};
  display: flex;
  align-items: center;
  height: 100%;
`

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-family: "Neucha", cursive;
  text-align: center;
  font-size: 68px;
`

const SubContent = styled.div`
  width: 100%;
  max-width: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubTitle = styled.h3`
  font-family: "BloggerSansLight", sans-serif;
  font-size: 22px;
`

const SubLink = styled(Link)`
  font-family: "BloggerSansLight", sans-serif;
  font-size: 22px;
`

const Socials = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
`

const SocialIcon = styled.img`
  color: ${darkBlue};
  border-radius: 4px;
  width: 40px;
  height: 40px;
`

const TextField = styled.input`
  width: 100%;
  text-align: center;
  padding: 10px;
  font-family: "BloggerSansLight", sans-serif;
  font-size: 22px;
  /*add dirty color*/
  background-color: #9ec4ee;
  color: ${creme};
  border: 1px solid ${darkBlue};

  &::placeholder {
    color: ${creme};
  }
`

const Action = styled.button`
  width: 100%;
  max-width: 180px;
  font-size: 22px;
  background-color: ${darkBlue};
  color: ${creme};
  border-radius: 10px;
  padding: 20px;
`

const Layout = styled.div`
  height: 100%;

  ${Title} {
    margin-bottom: 35px;
  }

  ${SubTitle}, ${SubLink} {
    margin-bottom: 30px;
  }

  ${Socials} {
    margin-bottom: 35px;
  }

  ${TextField} {
    margin-bottom: 30px;
  }
`
type Props = {
  email: string,
  password: string,
  handleEmailChange: (e: SyntheticEvent<>) => void,
  handlePasswordChange: (e: SyntheticEvent<>) => void,
  handleSubmit: (e: SyntheticEvent<>) => void,
}

const SignupPage = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}: Props) => (
  <Layout>
    <Wrapper>
      <Content>
        <Title>Fast Registration</Title>
        <SubContent>
          <SubTitle>it will take a minute</SubTitle>
          {/* <Socials>
            <SocialIcon src="/assets/images/vk_social.png" />
            <SocialIcon src="/assets/images/fb_social.png" />
            <SocialIcon src="/assets/images/ok_social.png" />
            <SocialIcon src="/assets/images/google_social.png" />
          </Socials>*/}
          <SubLink to="/signin">or login</SubLink>
          <TextField
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Action onClick={handleSubmit}>Done!</Action>
        </SubContent>
      </Content>
    </Wrapper>
  </Layout>
)

export default SignupPage
