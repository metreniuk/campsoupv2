import React from "react"
import styled from "styled-components"
import { bronze, creme } from "../constants/colors"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import starSolid from "@fortawesome/fontawesome-free-solid/faStar"
import starRegular from "@fortawesome/fontawesome-free-regular/faStar"
import plusSolid from "@fortawesome/fontawesome-free-solid/faPlus"
import type { CategoryType } from "../types"
import AddItemModalContainer from "./AddItemModalContainer"

var Title = styled.h1`
  font-family: "Neucha", cursive;
  font-size: 68px;
  color: ${bronze};
  text-transform: capitalize;
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

var AddButton = styled.div`
  padding: 2px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`

var Wrapper = styled.div`
  height: 100vh;
  background-color: ${creme};
  padding: 20px;

  ${Title} {
    margin-bottom: 10px;
  }
`

type CategoryItem = {
  title: string,
  type: CategoryType,
  description: string,
  age: string,
  inventory: Array<string>,
}

type Props = {
  categoryId: CategoryType,
  entities: Array<CategoryItem>,
}

var Category = ({ entities, categoryId }: Props) => (
  <Wrapper>
    <Title>{categoryId}</Title>
    <Table>
      <Row>
        <HeadingCell />
        <HeadingCell>
          <FontAwesomeIcon icon={starSolid} />
        </HeadingCell>
        <HeadingCell>Title</HeadingCell>
        <HeadingCell>Description</HeadingCell>
        <HeadingCell>Age</HeadingCell>
        <HeadingCell>Inventory</HeadingCell>
      </Row>
      {entities.map(({ title, description, age }, index) => (
        <Row key={title}>
          <Cell>{index + 1}</Cell>
          <Cell>
            <FontAwesomeIcon icon={starRegular} />
          </Cell>
          <Cell>{title}</Cell>
          <VerboseCell>{description}</VerboseCell>
          <Cell>{age}</Cell>
          <Cell>{}</Cell>
        </Row>
      ))}
      <Row>
        <Cell>
          <AddButton>
            <FontAwesomeIcon icon={plusSolid} />
          </AddButton>
          <AddItemModalContainer />
        </Cell>
      </Row>
    </Table>
  </Wrapper>
)

export default Category
