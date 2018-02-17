import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  amber,
  canary,
  brownLight
} from '../constants/colors'

const Header = styled.header`
  background-color: ${amber};
  color: ${canary};
  display: flex;
  align-items: stretch;
  height: 30px;
`

const HeaderButton = styled.div`
  padding: 2px 20px;
`

const ExpandButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${brownLight};
`

const HeaderItem = styled(Link)`
  padding: 8px 10px;
  border-left: 1px solid ${brownLight};
  text-transform: uppercase;
  color: ${canary};

  &:hover {
    background-color: ${brownLight};
  }
`

const FiltersHeading = styled.h5`
  display: flex;
  align-items: center;  
`

const FilterItem = styled.button`
  padding: 6px;
  border: 1px solid ${amber};
  border-radius: 4px;
  color: ${amber};
  background-color: ${canary};
`

const Filters = styled.div`
  display: flex;
  color: ${amber};
  background-color: ${canary};

  ${FiltersHeading} {
    margin-right: 20px;
  }

  ${FilterItem} {
    margin-right: 10px;
  }
`

const Separator = styled.div`
  height: 1px;
  background-color: ${amber};
`
const TileStar = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: ${canary};
`

const Tile = styled(Link)`
  position: relative;
  padding: 12px 4px;
  text-align: center;
  width: 110px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  background-color: ${amber};
  border-radius: 4px;
  color: ${canary};
`

const TilesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 190px;
  overflow: auto;
  padding: 20px;
  background-color: ${canary};
`

const Wrapper = styled.div`
  font-family: 'BloggerSansMedium', sans-serif;
  font-size: 16px;
  width: 100%;

  ${Filters} {
    padding: 10px 20px;
  }
`

const BottomPanel = () => (
  <Wrapper>
    <Header>
      <HeaderButton>
        <ExpandButton />
      </HeaderButton>
      <HeaderItem to="/events">События</HeaderItem>
      <HeaderItem to="/sport">Спорт</HeaderItem>
    </Header>
    <Filters>
      <FiltersHeading>Фильтр:</FiltersHeading>
      <FilterItem>Star</FilterItem>
      <FilterItem>Weather</FilterItem>
      <FilterItem>Характеристики</FilterItem>
      <FilterItem>Возраст</FilterItem>
    </Filters>
    <Separator />
    <TilesSection>
      <Tile to="/">
        Игра Тратата
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра Тратата
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра Тратата
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра Тратата
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра Тратата
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра с длинным названием
        <TileStar />
      </Tile>
      <Tile to="/">
        Игра с длинным названием
        <TileStar />
      </Tile><Tile to="/">
        Игра с длинным названием
        <TileStar />
      </Tile><Tile to="/">
        Игра с длинным названием
        <TileStar />
      </Tile><Tile to="/">
        Игра с длинным названием
        <TileStar />
      </Tile>
    </TilesSection>
  </Wrapper>
)

export default BottomPanel
