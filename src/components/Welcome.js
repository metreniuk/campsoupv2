import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { creme, bloody, gold, goldLight } from "../constants/colors"

const Wrapper = styled.div`
  background-color: ${creme};
  color: ${bloody};
  height: 100%;
  display: flex;
  align-items: center;
`

const Content = styled.main`
  width: 60%;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MealImage = styled.img``
const ActionsWrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${bloody};
`
const Action = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  width: 125px;
  height: 125px;
  font-size: 27px;
  line-height: 1.43;
  font-family: "BloggerSansLight", sans-serif;
  background-color: ${gold};
  color: ${bloody};
  text-transform: uppercase;
  border-radius: 4px;
  transition: 0.3s ease;

  &:hover {
    background-color: ${goldLight};
  }
`
const Title = styled.h1`
  font-family: "Neucha", cursive;
  text-align: center;
  font-size: 68px;
  flex-shrink: 2;
`
const Description = styled.p`
  font-size: 22px;
  font-family: "MyriadPro", sans-serif;
  text-align: center;
`

const Welcome = () => (
  <Wrapper>
    <Content>
      <MealImage src="/assets/images/landing_meal.png" />
      <ActionsWrapper>
        <Action to="/home">База Данных</Action>
        <Title>Лагернй С.У.П.</Title>
        <Action to="/projects">Начать Работу</Action>
      </ActionsWrapper>
      <Description>
        С.У.П. - Система Управления Программой лагеря, созданная, чтобы помочь координаторам на
        этапе планирования заезда. С.У.П. содержит постоянно пополняемую базу данных с играми,
        сценками, песнями и ещё многим другим.
      </Description>
    </Content>
  </Wrapper>
)

export default Welcome
