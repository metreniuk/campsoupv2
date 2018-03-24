import React from "react"
import styled from "styled-components"
import { bronze, creme } from "../constants/colors"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import starSolid from "@fortawesome/fontawesome-free-solid/faStar"
import starRegular from "@fortawesome/fontawesome-free-regular/faStar"

var Title = styled.h1`
  font-family: "Neucha", cursive;
  font-size: 68px;
  color: ${bronze};
`

var Table = styled.div`
  display: flex;
  flex-direction: column;
  color: ${bronze};
  font-family: "BloggerSansMedium", sans-serif;
`

var Row = styled.div`
  flex: 1 100%;
  display: flex;
`

var Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  font-size: 18px;
  width: 180px;
  height: 36px;
  border-right: 1px solid ${bronze};

  &:first-child,
  &:nth-child(2),
  &:last-child {
    border-right: none;
  }

  &:first-child,
  &:nth-child(2) {
    width: 30px;
    padding: 0;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`

var HeadingCell = styled(Cell)`
  padding: 10px 8px;
  font-size: 22px;
  border-bottom: 1px solid ${bronze};

  &:first-child {
    border-bottom: none;
  }
`

var VerboseCell = styled(Cell)`
  display: inline-block;
  line-height: 24px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

var Wrapper = styled.div`
  height: 100vh;
  background-color: ${creme};
  padding: 20px;

  ${Title} {
    margin-bottom: 10px;
  }
`

var Category = () => (
  <Wrapper>
    <Title>Игры</Title>
    <Table>
      <Row>
        <HeadingCell />
        <HeadingCell>
          <FontAwesomeIcon icon={starSolid} />
        </HeadingCell>
        <HeadingCell>Названия</HeadingCell>
        <HeadingCell>Характеристики</HeadingCell>
        <HeadingCell>Возраст</HeadingCell>
        <HeadingCell>Инвентарь</HeadingCell>
      </Row>
      <Row>
        <Cell>1</Cell>
        <Cell>
          <FontAwesomeIcon icon={starRegular} />
        </Cell>
        <Cell>Футбол</Cell>
        <VerboseCell>
          в помещении, дождь, развитие на улице, группа, без инвентаря и многое
          другое
        </VerboseCell>
        <Cell>12 - 14 лет</Cell>
        <Cell>мяч</Cell>
      </Row>
      <Row>
        <Cell>1</Cell>
        <Cell>
          <FontAwesomeIcon icon={starRegular} />
        </Cell>
        <Cell>Футбол</Cell>
        <VerboseCell>
          в помещении, дождь, развитие на улице, группа, без инвентаря и многое
          другое
        </VerboseCell>
        <Cell>12 - 14 лет</Cell>
        <Cell>мяч</Cell>
      </Row>
      <Row>
        <Cell>1</Cell>
        <Cell>
          <FontAwesomeIcon icon={starRegular} />
        </Cell>
        <Cell>Футбол</Cell>
        <VerboseCell>
          в помещении, дождь, развитие на улице, группа, без инвентаря и многое
          другое
        </VerboseCell>
        <Cell>12 - 14 лет</Cell>
        <Cell>мяч</Cell>
      </Row>
      <Row>
        <Cell>1</Cell>
        <Cell>
          <FontAwesomeIcon icon={starRegular} />
        </Cell>
        <Cell>Футбол</Cell>
        <VerboseCell>
          в помещении, дождь, развитие на улице, группа, без инвентаря и многое
          другое
        </VerboseCell>
        <Cell>12 - 14 лет</Cell>
        <Cell>мяч</Cell>
      </Row>
    </Table>
  </Wrapper>
)

export default Category
