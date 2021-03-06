import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { creme, brownLight, brownMedium, brownDark } from "../constants/colors"
import CategoryNavList from "./CategoryNavList"

const LogoLink = styled(Link)`
  width: 88px;
  height: 83px;
`

const Menu = styled.ul`
  text-align: center;
`

const MenuHeading = styled.li`
  font-family: "BloggerSansMedium", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  padding: 10px 0;
`

const MenuItem = styled.li`
  font-family: "BloggerSansMedium", sans-serif;
  font-size: 18px;
  padding: 10px 0;
  color: ${creme};
  text-transform: capitalize;

  &:hover {
    background-color: ${brownMedium};
  }
`

const Line = styled.div`
  height: 2px;
  width: 150px;
  background-color: ${brownDark};
`

const Wrapper = styled.div`
  width: 190px;
  height: 100vh;
  padding: 30px 0;
  color: ${creme};
  background-color: ${brownLight};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${LogoLink} {
    margin: 0 auto 60px;
  }
  ${Menu} {
    margin-bottom: 15px;
  }
  ${Line} {
    align-self: center;
    margin-bottom: 25px;
  }
`

const Sidebar = () => (
  <Wrapper>
    <LogoLink to="/">
      <img src="/assets/images/soup_logo.png" alt="Logo" />
    </LogoLink>
    <Menu>
      <MenuHeading>Projects</MenuHeading>
      <Link to="/projects/last">
        <MenuItem>Last</MenuItem>
      </Link>
    </Menu>
    <Line />
    <Menu>
      <MenuHeading>Archive</MenuHeading>
      <CategoryNavList>
        {navLinks =>
          navLinks.map(({ name, link }) => (
            <Link key={name} to={link}>
              <MenuItem>{name}</MenuItem>
            </Link>
          ))
        }
      </CategoryNavList>
    </Menu>
  </Wrapper>
)

export default Sidebar
