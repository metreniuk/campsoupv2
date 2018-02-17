import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import chevronDown from '@fortawesome/fontawesome-free-solid/faChevronCircleDown'
import starSolid from '@fortawesome/fontawesome-free-solid/faStar'
import cloudSolid from '@fortawesome/fontawesome-free-solid/faCloud'
import starRegular from '@fortawesome/fontawesome-free-regular/faStar'
import {
  amber,
  canary
} from '../constants/colors'

const Header = styled.header`
  background-color: ${amber};
  color: ${canary};
  display: flex;
  align-items: stretch;
  height: 30px;
`

const ExpandButton = styled.div`
  padding: 2px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`

const HeaderItem = styled(Link)`
  padding: 8px 10px;
  border-left: 1px solid ${canary};
  text-transform: uppercase;
  color: ${canary};

  &:hover {
    background-color: ${canary};
    color: ${amber};
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
  font-size: 8px;
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
      <ExpandButton>
        <FontAwesomeIcon icon={chevronDown} />
      </ExpandButton>
      <HeaderItem to="/events">События</HeaderItem>
      <HeaderItem to="/sport">Спорт</HeaderItem>
    </Header>
    <Filters>
      <FiltersHeading>Фильтр:</FiltersHeading>
      <FilterItem>
        <FontAwesomeIcon icon={starSolid} />
      </FilterItem>
      <FilterItem>
        <FontAwesomeIcon icon={cloudSolid} />
      </FilterItem>
      <FilterItem>Характеристики</FilterItem>
      <FilterItem>Возраст</FilterItem>
    </Filters>
    <Separator />
    <TilesSection>
      <Tile to="/">
        Игра Тратата
        <TileStar>
          <FontAwesomeIcon icon={starSolid} />
        </TileStar>
      </Tile>
      <Tile to="/">
        Игра Тратата
        <TileStar>
          <FontAwesomeIcon icon={starRegular} />
        </TileStar>
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
