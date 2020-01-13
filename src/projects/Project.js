// @flow
import * as React from "react"
import * as R from 'ramda'
import styled from "styled-components"
import { connect } from "react-redux"

import { bronze, creme } from "../constants/colors"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import pencil from "@fortawesome/fontawesome-free-solid/faPencilAlt"
import trash from "@fortawesome/fontawesome-free-solid/faTrashAlt"
import plus from "@fortawesome/fontawesome-free-solid/faPlus"
import save from "@fortawesome/fontawesome-free-solid/faSave"
import print from "@fortawesome/fontawesome-free-solid/faPrint"
import {
  fetchCategory,
  fetchFavorites,
  deleteFavorite,
  postFavorite,
} from "../category/actions"
import { getCategoryItems, getById } from "../category/reducer"
import {categories} from '../types'
import { useDrop } from "react-dnd"

var Title = styled.h1`
  font-family: "Neucha", cursive;
  font-size: 68px;
  color: ${bronze};
`
var Cell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 75px;
  padding: 6px;
  font-size: 18px;
  border-left: 1px solid ${bronze};
  border-top: 1px solid ${bronze};
  overflow: hidden;

  background: ${props => props.isOver ? 'lightblue': null}

  &:last-child {
    border-right: 1px solid ${bronze};
  }
`

var MultilineOverflow = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 14px;
`

var HeadingCell = styled(Cell)`
  font-size: 22px;
  border-radius: 8px 8px 0 0;
  border-top: 1px solid ${bronze};
  background-color: ${({ bgColor = creme }) => bgColor};
  overflow: visible;

  &:first-child {
    border-left: 1px solid ${bronze};
  }

  &:last-child {
    position: relative;
  }
`

var IndexCell = styled(Cell)`
  width: 50px;
  border-radius: 4px 0 0 4px;
  transition: all 0.2s;

  &:hover,
  &:active {
    cursor: pointer;
    color: ${creme};
    background-color: ${bronze};
  }
`

var AddCell = styled(IndexCell)`
  width: 21px;
  height: 30px;
  position: absolute;
  color: ${bronze};
  font-size: 12px;
  border: 1px solid ${bronze};
  border-radius: 4px;
`

var CellAction = styled.button`
  padding: 4px 8px;
  border-radius: 2px;
  color: ${bronze};
  background-color: ${creme};
  border: 1px solid ${bronze};
  transition: all 0.2s;

  &:hover,
  &:active {
    color: ${creme};
    background-color: ${bronze};
  }
`
// TODO Add Color picker
var CellMenuItem = styled.button`
  font-size: 14px;
  color: ${bronze};
  border-left: 1px solid ${bronze};
  border-top: 1px solid ${bronze};
  padding: 2px;
  width: 22px;
  background-color: ${({ bgColor = creme }) => bgColor};
`

var CellMenu = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;

  ${HeadingCell}:hover & {
    display: block;
  }
`

var Row = styled.div`
  display: flex;

  &:first-child {
    ${IndexCell} {
      opacity: 0;
    }
  }

  &:nth-child(2) {
    ${IndexCell} {
      border-top: 1px solid ${bronze};
    }
  }

  &:last-child {
    ${Cell} {
      border-bottom: 1px solid ${bronze};
    }
  }
`

var Control = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 30px;
  font-size: 12px;
  border-radius: 0 4px 4px 0;
  transition: all 0.2s;
  background-color: ${creme};
  color: ${bronze};
  border-right: 1px solid ${bronze};
  border-bottom: 1px solid ${bronze};

  &:hover,
  &:active {
    cursor: pointer;
    color: ${creme};
    background-color: ${bronze};
  }

  &:first-child {
    border-top: 1px solid ${bronze};
  }
`

var ControlsGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 12px;
  right: -21px;
`

var Table = styled.div`
  display: flex;
  flex-direction: column;
  color: ${bronze};
  font-family: "BloggerSansMedium", sans-serif;
`

var Wrapper = styled.div`
  height: 100vh;
  background-color: ${creme};
  padding: 20px;

  ${Title} {
    margin-bottom: 10px;
  }
`

const CellContainer = props => {
  const [{isOver, canDrop}, dropRef] = useDrop({
    accept: categories,
    drop: (item) => props.setCell(props.row, props.col, item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })
  return <Cell innerRef={dropRef} isOver={isOver}>{props.title || null}</Cell>
}

const RowContainer = props => {
  const {index, items } = props
  return (
    <Row>
      <IndexCell>{index}</IndexCell>
      {items.map((item, col) => (
        <CellContainer row={index} col={col} setCell={props.setCell} {...item} />
      ))}
    </Row>
  )
}

const Project = props => {
  const [rows, setRows] = React.useState([
    {items: new Array(4).fill({})},
    {items: new Array(4).fill({})},
    {items: new Array(4).fill({})},
    {items: new Array(4).fill({})},
  ])
  const setCell = React.useCallback((row, col, id) => {
    let item = props.byId[id]
    let newRow = R.evolve({items: R.adjust(col, R.always({title: item.title}))}, rows[row])
    let newRows = R.adjust(row, R.always(newRow), rows)
    setRows(newRows)
  }, [rows, props.byId])

  return (
    <Wrapper>
      <Title>Last</Title>
      <Table>
        <Row>
          <IndexCell />
          <HeadingCell bgColor="#ff8a80">День</HeadingCell>
          <HeadingCell bgColor="#a7ffeb">Урок</HeadingCell>
          <HeadingCell bgColor="#ccff90">Игра</HeadingCell>
          <HeadingCell bgColor="#ffd180">
            Золотой стих
            <CellMenu>
              <CellMenuItem bgColor="#ffd180">
                <FontAwesomeIcon icon={trash} />
              </CellMenuItem>
              <CellMenuItem bgColor="#ffd180">
                <FontAwesomeIcon icon={pencil} />
              </CellMenuItem>
            </CellMenu>
            <ControlsGroup>
              <Control>
                <FontAwesomeIcon icon={plus} />
              </Control>
              <Control>
                <FontAwesomeIcon icon={save} />
              </Control>
              <Control>
                <FontAwesomeIcon icon={print} />
              </Control>
            </ControlsGroup>{" "}
          </HeadingCell>
        </Row>
        {rows.map((row, i) => <RowContainer index={i} items={row.items} setCell={setCell} />)}
      </Table>
      <AddCell>
        <FontAwesomeIcon icon={plus} />
      </AddCell>
    </Wrapper>
  )
}

const ProjectContainer = connect(state => ({
  allItems: getCategoryItems(state.category),
  byId: getById(state.category),
  account: state.account,
}))(Project)

export default ProjectContainer
