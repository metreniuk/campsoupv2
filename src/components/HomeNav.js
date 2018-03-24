import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import calendar from "@fortawesome/fontawesome-free-solid/faCalendarAlt"
import ball from "@fortawesome/fontawesome-free-solid/faVolleyballBall"
import theatre from "@fortawesome/fontawesome-free-brands/faPiedPiperAlt"
import pencil from "@fortawesome/fontawesome-free-solid/faPencilAlt"
import music from "@fortawesome/fontawesome-free-solid/faMusic"
import comment from "@fortawesome/fontawesome-free-regular/faComment"
import archive from "@fortawesome/fontawesome-free-solid/faArchive"
import lightbulb from "@fortawesome/fontawesome-free-solid/faLightbulb"
import { canary, amber, creme } from "../constants/colors"
import * as Navigation from "../constants/navigation"
import CategoryNavList from "./CategoryNavList"

var Wrapper = styled.div`
  background-color: ${creme};
  height: 100vh;
  width: 100%;
  overflow: auto;
`

var Content = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 720px;
  margin: 50px 10%;
`

var Tile = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 160px;
  height: 160px;
  border-radius: 10px;
  background-color: ${amber};
  padding-bottom: 20px;
  margin: 0 20px 20px 0;
`

var TileIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${canary};
  font-size: 70px;
`

var TileText = styled.h3`
  font-family: "BloggerSansMedium", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  color: ${canary};
`

var icons = new Map([
  [Navigation.events.en, calendar],
  [Navigation.sport.en, ball],
  [Navigation.scenes.en, theatre],
  [Navigation.lessons.en, pencil],
  [Navigation.songs.en, music],
  [Navigation.fellowship.en, comment],
  [Navigation.inventory.en, archive],
  [Navigation.other.en, lightbulb],
])

var HomeNav = () => (
  <Wrapper>
    <Content>
      <CategoryNavList>
        {navLinks =>
          navLinks
            .map(item => ({
              ...item,
              icon: icons.get(item.id),
            }))
            .map(({ name, link, icon }) => (
              <Tile key={name} to={link}>
                <TileIconWrapper>
                  <FontAwesomeIcon icon={icon} />
                </TileIconWrapper>
                <TileText>{name}</TileText>
              </Tile>
            ))
        }
      </CategoryNavList>
    </Content>
  </Wrapper>
)

export default HomeNav
